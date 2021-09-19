import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import DetailsView from '../views/DetailsView'
import SearchView from '../views/SearchView'

const App = () => {
  const queryClient = new QueryClient()
  return (

    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/details/:id">
            <DetailsView />
          </Route>
          <Route path="/">
            <SearchView />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  )
}

export default App
