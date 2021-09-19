import React, { useState } from 'react'
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
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState(URLQuery.get("movie") || "")
  const [currentlyLoaded, setCurrentlyLoaded] = useState("")
  const { data } = useQuery(`movies`, () => GET({
    path: `movies?query=${searchTerm}`
  }), {
    onSuccess: () => {
      setCurrentlyLoaded(searchTerm)
    },
    enabled: currentlyLoaded === "" && URLQuery.get("movie") !== null,
    placeholderData: [],
  }) as { data: Array<MovieInfo> }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSeach()
    }
  }

  const handleSeach = () => {
    //make sure that the user typed in at least a character and 
    //they don't want to repeat the currently loaded search
    if (searchTerm.length && currentlyLoaded !== searchTerm) {
      //this is needed to enable react query
      setCurrentlyLoaded("")
      history.push(`/?movie=${searchTerm}`);
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