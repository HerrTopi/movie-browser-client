## Movie browser

A small and lightweight app for searching in TMDB (The Movie Database)

## Access

Browse movies [here](https://movie-browser-client.herokuapp.com/)

## Usage

The following pages are available on the site:

### Main, SearchView

On the main page, you will be presented with a search bar. Type in any movie name or name fragment and press
the search icon or hit `enter`. 

From the results, click on any title and you'll be navigated to the `details` page

### DetailsView

The selected movie will be displayed with additonal informations on the screen.
You can navigate to the movie's wikipedia or IMDB page by clicking their logos at the bottom of the info panel.
By clicking the `Show similar movies` button, a list of similar movies will load below the info panel. You can hide it
with the `Hide similar movies` button.

Clicking the floating `search` icon in the bottom-right corner will bring you back to the `main` view
 
### Possible future improvements

- As of right now, there is no pagination on the results. The page shows the top results only
- Request per user should be limited somewhat to prevent attacks
- Better error handling is needed for production
- Tests are needed