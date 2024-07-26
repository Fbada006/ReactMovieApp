import {useEffect, useState} from "react";
import Config from "react-native-config";
import {TMDB_BASE_URL} from "../utils/Constants";

export const useGetMovies = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<ApiResponse | null>(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${Config.TMDB_AUTH}`,
    },
  };

  useEffect(() => {
    fetch(`${TMDB_BASE_URL}/discover/movie`, options)
      .then(response => response.json())
      .then(data => {
        setMovies(data);
      })
      .catch(error => {
        setError(`Could not fetch your movies. Please try again! ${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return [loading, error, movies];
};
