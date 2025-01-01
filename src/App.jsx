import Result from "./Components/Result";
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

const APIURL =
  "";
const SEARCHAPI =
  "";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const changeTheSearch = (event) => {
    setSearch(event.target.value);
  };

  const getAllMovies = () => {
    axios
      .get(APIURL)
      .then((response) => {
        console.log(response.data.results);
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSearchedMovies = () => {
    axios
      .get(SEARCHAPI + search)
      .then((response) => {
        console.log(response.data.results);
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setMovies([]);
    if (search === "") {
      getAllMovies();
    } else {
      getSearchedMovies();
    }
  }, [search]);

  return (
    <div className="app-container">
      <h1 className="title">Movieluxe</h1>
      <div className="search-container">
        <input
          type="search"
          value={search}
          onChange={changeTheSearch}
          className="search-input"
          placeholder="Search movies..."
        />
      </div>
      {movies.length === 0 ? (
        <div className="loading-text">Loading...</div>
      ) : (
        <Result movies={movies} />
      )}
    </div>
  );
}

export default App;
