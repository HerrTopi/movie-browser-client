import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useHistory } from "react-router-dom";
import { Container, Paper, InputBase, Divider, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { GET } from '../../utils/HTTP_REQUEST'
import useURLQuery from '../../utils/useURLQuery'

import MovieListView from '../../components/MovieListView';

export type MovieInfo = {
  id: number,
  title: string,
  poster_path: string,
  vote_average: number,
  genres: Array<string>,
  overview: string
}

const SearchView = () => {
  const URLQuery = useURLQuery();
  const movieInUrl = URLQuery.get("movie") as string
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState(movieInUrl || "")
  const [currentlyLoaded, setCurrentlyLoaded] = useState("")
  const { data, refetch } = useQuery(`movies`, () => GET({
    path: `movies?query=${movieInUrl}`
  }), {
    onSuccess: () => {
      setSearchTerm(movieInUrl)
      setCurrentlyLoaded(movieInUrl)
    },
    enabled: currentlyLoaded === "" && movieInUrl !== null,
    placeholderData: [],
  }) as { data: Array<MovieInfo>, refetch: any }

  useEffect(() => {
    console.log({ currentlyLoaded, movieInUrl, searchTerm, wtf: currentlyLoaded !== movieInUrl && searchTerm !== "" && movieInUrl !== null })
    if (currentlyLoaded !== movieInUrl && searchTerm !== "" && movieInUrl !== null) {
      refetch()
    }
  }, [movieInUrl, currentlyLoaded, refetch, searchTerm])

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSeach()
    }
  }

  const handleSeach = () => {
    //trim query
    const trimmedQuery = searchTerm.trim()

    //make sure that the user typed in at least a character and 
    //they don't want to repeat the currently loaded search
    if (trimmedQuery.length && currentlyLoaded !== trimmedQuery) {
      //this is needed to enable react query
      setCurrentlyLoaded("")
      setSearchTerm(trimmedQuery)
      history.push(`/?movie=${trimmedQuery}`);
    }

  }
  const onType = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchTerm(e?.target?.value)
  }

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }} >
        <InputBase
          fullWidth
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={onType}
          onKeyDown={onKeyDown}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton onClick={handleSeach} sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {data && <MovieListView movies={data} />}
    </Container>
  )
}

export default SearchView