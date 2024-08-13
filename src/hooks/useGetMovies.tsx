import {useEffect, useState} from "react";
import Config from "react-native-config";
import {TMDB_BASE_URL} from "../utils/Constants";
import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase(
  {name: "movies.db", location: "default"},
  () => {},
  error => {
    console.log(`Error opening database, ${error}`);
  },
);

export const useGetMovies = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[] | null>(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer YOUR AUTH HERE`,
    },
  };

  const createTable = async () => {
    await db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS " +
          "Movies " +
          "(id	INTEGER PRIMARY KEY NOT NULL, title	TEXT, release_date TEXT, vote_average INTEGER, backdrop_path TEXT);",
      );
    });
  };

  const insertMovieData = (movie: Movie) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO Movies (id, title, release_date, vote_average, backdrop_path) VALUES (?,?,?,?,?)",
        [
          movie.id,
          movie.title,
          movie.release_date,
          movie.vote_average,
          movie.backdrop_path,
        ],
        () => {
          console.log("Movie values successfully saved to the database");
        },
        error => {
          console.log(`Could not save values to db ${error}`);
        },
      );
    });
  };

  const getMoviesFromDb = () => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM Movies",
        [],
        (tx, result) => {
          const len = result.rows.length;
          if (len > 0) {
            const movies: Movie[] = [];
            for (let i = 0; i < len; i++) {
              const row = result.rows.item(i);
              movies.push(row);
            }
            setMovies(movies);
          } else {
            setError(
              "There is no data in the cache. Please refresh with an internet connection and try again!",
            );
          }
        },
        error => {
          setError("Could not get the data from cache. Please try again!");
        },
      );
    });
  };

  const getAndSaveMovies = () => {
    fetch(`${TMDB_BASE_URL}/discover/movie`, options)
      .then(response => response.json())
      .then(data => {
        const response = data as ApiResponse;
        for (const movie of response.results) {
          insertMovieData(movie);
        }
      })
      .finally(() => {
        setLoading(false);
        getMoviesFromDb();
      });
  };

  useEffect(() => {
    createTable();
    getAndSaveMovies();
  }, []);

  return [loading, error, movies];
};
