import Movie from './classes/Movie.js';
import MovieListItem from './components/MovieListItem.js';
import MovieDetail from './components/MovieDetail.js';
import { initialiseList } from './initialiser.js';

//Depreciated. See initialiseList for new, dynamic genres population
// let genres = ["Action", "Adventure", "Biography", "Comedy", "Crime", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Science Fiction", "Thriller" ];

initialiseList(Movie, MovieListItem, MovieDetail);