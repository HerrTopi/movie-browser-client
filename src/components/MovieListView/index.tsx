import React from 'react'
import { useHistory } from "react-router-dom";
import Paper from '@mui/material/Paper';

import useStyles from './style'
import { MovieInfo } from '../../views/SearchView'

type MovieListViewProps = {
  movies: Array<MovieInfo>
}

const MovieListView = ({ movies = [] }: MovieListViewProps) => {
  const style = useStyles()
  const history = useHistory();

  const handleNavigation = (movie: MovieInfo) => () => {
    history.push(`/details/${movie.id}`);
    history.go(0)
  }

  return <>
    {movies.map((movie: MovieInfo, index: number) => (<Paper key={`movie-list-${index}`} className={style.card} elevation={3}>
      <div className={style.poster}>
        <img src={movie.poster_path ?
          `https://image.tmdb.org/t/p/w185${movie.poster_path}` :
          '../images/noImgFound.jpg'}
          alt={`${movie.title} poster`} />
      </div>
      <div className={style.details}>
        <div className={style.title} onClick={handleNavigation(movie)}>
          {movie.title} ({movie.vote_average})
          </div>
        <div className={style.overview}>{movie.overview}</div>
        {movie.genres.length > 0 && <div>
          Genres: {movie.genres.join(", ")}
        </div>}
      </div>
    </Paper>))}
  </>
}

export default MovieListView