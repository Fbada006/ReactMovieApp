/* eslint-env jest */

// Native modules that don't exist in the Jest environment.
jest.mock("react-native-config", () => ({TMDB_AUTH: "test-token"}));

// A tiny in-memory stand-in for the Movies table, enough for the
// INSERT and SELECT statements useGetMovies runs.
jest.mock("react-native-sqlite-storage", () => {
  const rows = [];
  const tx = {
    executeSql: jest.fn((sql, params = [], onSuccess) => {
      if (sql.startsWith("INSERT")) {
        const [id, title, release_date, vote_average, backdrop_path] = params;
        rows.push({id, title, release_date, vote_average, backdrop_path});
        onSuccess && onSuccess(tx, {rows: {length: 0, item: () => undefined}});
      } else if (sql.startsWith("SELECT")) {
        onSuccess &&
          onSuccess(tx, {rows: {length: rows.length, item: i => rows[i]}});
      }
    }),
  };
  const db = {transaction: jest.fn(callback => callback(tx))};
  return {
    openDatabase: jest.fn(() => db),
    __resetRows: () => rows.splice(0, rows.length),
  };
});
