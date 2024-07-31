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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzMyN2E4Mjg1YzgwMzBjYTc2NWM2NTE5N2IzMDBjZSIsIm5iZiI6MTcyMjAwNzQwNS43MTg5MDQsInN1YiI6IjViZjY0Y2EzOTI1MTQxNWNjMTBiZjY4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R3lPzGcUhU7a_nGLeftFJ0UsNAyYrRavzZDwShQ2Vjk`,
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
