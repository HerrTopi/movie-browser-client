import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import { Rating, Button, Container, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';

import useStyles from './style'
import { GET } from '../../utils/HTTP_REQUEST'

import MovieListView from '../../components/MovieListView'
import { MovieInfo } from '../../views/SearchView'

type MovieInfoDetails = {
  id: number,
  imdb_id: number,
  title: string,
  release_date: string,
  vote_average: number,
}

type MovieInfoWiki = {
  thumbnail?: {
    source: string
  },
  extract?: string,
  content_urls?: {
    desktop: {
      page: string
    }
  },
}

const DetailsView = () => {
  const style = useStyles()
  const history = useHistory();
  const [showSimilarMovies, setShowSimilarMovies] = useState(false)
  let { id } = useParams() as { id: string }

  //If there is no id present, navigate to the search view
  if (!id) {
    history.push('/search')
  }
  const { data: TMDBData } = useQuery(`movie`, () => GET({
    path: `movie?id=${id}`
  }), {
    placeholderData: {
      id: 0,
      imdb_id: 0,
      title: "",
      release_date: "",
      vote_average: 0
    }
  }) as { data: MovieInfoDetails, isLoading: boolean }

  const { data: wikiData } = useQuery(`movie-from-wiki-${TMDBData.title}`, () => GET({
    path: `api/rest_v1/page/summary/${TMDBData.title}`,
    url: 'https://en.wikipedia.org',
    withOutAccessControlAllowOrigin: true
  }), {
    placeholderData: {},
    enabled: TMDBData.id !== 0
  }) as { data: MovieInfoWiki }

  const { data: similarData } = useQuery(`similarMovies`, () => GET({
    path: `similar?id=${id}`
  }), {
    placeholderData: [],
    enabled: showSimilarMovies
  }) as { data: Array<MovieInfo> }

  const IMDBId = TMDBData?.imdb_id
  const thumbnailSource = wikiData?.thumbnail?.source || "../images/noImgFound.jpg"
  const overView = wikiData?.extract
  const wikiUrl = wikiData?.content_urls?.desktop?.page

  return (
    <Container maxWidth="md">
      <div className={style.backToSearch}>
        <IconButton onClick={() => history.push('/')}>
          <SearchIcon fontSize="large" />
        </IconButton>
      </div>
      <Typography variant="h1" align="center" component="div" gutterBottom>
        {TMDBData.title}
      </Typography>
      <Tooltip title={TMDBData.release_date}>
        <Typography variant="h4" align="center" component="div" gutterBottom>
          {TMDBData.release_date.split("-")[0]}
        </Typography>
      </Tooltip>
      <Typography align="center" component="div" gutterBottom>
        <Tooltip title={`Rating: ${TMDBData.vote_average}`}>
          <span>
            <Rating
              name="text-feedback"
              value={TMDBData.vote_average / 2}
              readOnly
              precision={0.1}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
          </span>
        </Tooltip>
      </Typography>
      <Paper className={style.card} elevation={3}>
        <div className={style.poster}>
          <img src={thumbnailSource} alt={`${TMDBData.title} poster`} />
        </div>
        <div className={style.details}>
          <div className={style.overview}>{overView}</div>
          <div>
            {wikiUrl &&
              <> <a target="_blank" rel="noreferrer" href={wikiUrl}>
                <img width="30" src="../images/wikipedia.ico" alt="Wikipedia" />
              </a>
                {" "}
              </>
            }
            {wikiUrl &&
              <a target="_blank" rel="noreferrer" href={`https://www.imdb.com/title/${IMDBId}`}>
                <img width="30" src="../images/IMDb.ico" alt="IMDb" />
              </a>
            }<Button className={style.detailsButton} onClick={() => setShowSimilarMovies(!showSimilarMovies)}>{showSimilarMovies ? "Hide Similar Movies" : "Show Similar Movies"}</Button>
          </div>
        </div>
      </Paper>
      {showSimilarMovies && <><Typography variant="h2" align="center" component="div" gutterBottom>
        Similar Movies
      </Typography>
        {similarData && <MovieListView movies={similarData} />}</>}
    </Container>
  )
}

export default DetailsView