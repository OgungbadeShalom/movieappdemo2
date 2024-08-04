import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

// API URL for the movie app
const API_URL = 'http://www.omdbapi.com?apikey=b9c593b';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalResults, setTotalResults] = useState(0);

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${encodeURIComponent(title)}`);
      const data = await response.json();
      
      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults, 10));
      } else {
        setMovies([]);
        setTotalResults(0);
      }
      
      // Logging data for debugging
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    searchMovies('movie');
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className='app'>
      <h1>MOVIEPUB</h1>

      <div className='search'>
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress} // Add onKeyPress handler
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)} // Keep the click functionality
        />
      </div>
      <div className="results">
        {totalResults > 0 && <p>Total Results found: {totalResults}</p>}
      </div>

      {movies.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>NO MOVIES FOUND</h2>
        </div>
      )}
    </div>
  );
};

export default App;
