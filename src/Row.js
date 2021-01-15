import React, { useState, useEffect } from 'react'
import axios from './axios';
import "./Row.css"
import Banner from "./Banner";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  // A snippet of code which runs based on a specific condition/varaible
  useEffect(() => {
    async function fetchData() {
      // fetchUrl from App.js
      // ex) https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213
      const request = await axios.get(fetchUrl);

      // console.log(request)
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    // if [], run once when the row loads, and dont run again
  }, [fetchUrl]);

  // console.table(movies);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {/* several row__poster(s) */}
        {movies.map(movie => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  )
}

export default Row
