const tmdbKey = "yourtmdbKey"; //api key here
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
const genreRequestEndpoint = '/genre/movie/list';
const requestParams = `?api_key=${tmdbKey}`
const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
try{
 const response = await fetch(urlToFetch,{cache: 'no-cache'})
  if(response.ok){
  const jsonResponse = await response.json();
 // console.log(jsonResponse);
  const genres = jsonResponse.genres;
  //console.log((genres.forEach(element=>genres.element)));
  return genres;
 }

}
catch(error){
  console.log(error)
}
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
    try{
      const response = await fetch(urlToFetch,{cache: 'no-cache'})
      if(response.ok)
      {
        const jsonResponse = await response.json();
        const movies = jsonResponse.results;
        //console.log(jsonResponse);
        //console.log(movies);
        return movies
      }

  }
  catch(error){
    console.log(error);
  }
};

//getMovies();

const getMovieInfo = async (movie) => {

  console.log(`The output of the movie object is ${movie}`);
  const movieId = movie.id;
  let movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try{
    const response = await fetch(urlToFetch,{cache: 'no-cache'})
    if(response.ok)
    {
      const jsonResponse = await response.json();
      const movieInfo = jsonResponse;
      console.log(movieInfo.release_date); ///movie info
      return movieInfo;
    }

  }
  catch(error)
  {
    console.log(error);
  }


};
//getMovieInfo();
// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async() => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies(); 
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
  
};


const getMovieReleaseDate = async (movie) => {

  console.log(`The output of the movie object is ${movie}`);
  const movieDate = movie.release_date;
  return movieDate;

};





getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;