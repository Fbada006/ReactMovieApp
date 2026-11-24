/**
 * @format
 */

import {Text} from "react-native";
import React from "react";
import App from "../App";

// Note: import explicitly to use the types shipped with jest.
import {afterEach, beforeEach, expect, it, jest} from "@jest/globals";

// Note: test renderer must be required after react-native.
import renderer, {act, ReactTestRenderer} from "react-test-renderer";

const sqlite = jest.requireMock("react-native-sqlite-storage") as {
  __resetRows: () => void;
};

const movie = {
  id: 1,
  title: "The Long Ride",
  release_date: "2024-07-01",
  vote_average: 8,
  backdrop_path: "/ride.jpg",
};

let tree: ReactTestRenderer | undefined;

const renderApp = async () => {
  await act(async () => {
    tree = renderer.create(<App />);
  });
  // Let the fetch promise chain and the cache read settle.
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
  });
  return tree!;
};

const texts = (root: ReactTestRenderer) =>
  root.root
    .findAllByType(Text)
    .map(node => node.props.children)
    .flat();

beforeEach(() => {
  sqlite.__resetRows();
});

afterEach(() => {
  act(() => tree?.unmount());
  tree = undefined;
});

it("fetches movies with the token from .env, caches them and lists them", async () => {
  const fetchMock = jest.fn(async () => ({
    json: async () => ({
      page: 1,
      results: [movie],
      total_pages: 1,
      total_results: 1,
    }),
  }));
  global.fetch = fetchMock as unknown as typeof fetch;

  const root = await renderApp();

  expect(fetchMock).toHaveBeenCalledTimes(1);
  const [url, options] = fetchMock.mock.calls[0] as unknown as [
    string,
    RequestInit,
  ];
  expect(url).toBe("https://api.themoviedb.org/3/discover/movie");
  expect((options.headers as Record<string, string>).Authorization).toBe(
    "Bearer test-token",
  );
  expect(texts(root)).toContain("The Long Ride");
});

it("shows the error screen when offline with nothing cached", async () => {
  global.fetch = jest.fn(async () => {
    throw new Error("offline");
  }) as unknown as typeof fetch;

  const root = await renderApp();

  expect(texts(root).join(" ")).toContain("Sorry, something went wrong");
  expect(texts(root)).not.toContain("The Long Ride");
});
