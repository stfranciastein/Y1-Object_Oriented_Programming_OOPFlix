import DB from './DB.js';

class Movie {

    constructor(_data){
        this.title = _data.title;
        this.poster = _data.poster;
        this.backdrop = _data.backdrop;
        this.genres = _data.genres;
        this.director = _data.director;
        this.homepage = _data.homepage;
        this.imdb_id = _data.imdb_id;
        this.youtube_id = _data.youtube_id;
        this.overview = _data.overview;
        this.rating = _data.rating;
        this.revenue = _data.revenue;
        this.release_date = _data.release_date;
        this.cast = _data.cast;
        this.reviews = _data.reviews;
    }

    static async findAll(){
        let db = new DB();
        let data = await db.getMovieData();

        let movies = data.map(dataObj => new Movie(dataObj));

        return movies;
    }

    getDetails(){
        return `
        Title: ${this.title}
        Poster: ${this.poster}
        Backdrop: ${this.backdrop}
        Genres: ${this.genres.join(", ")}
        Director: ${this.director.map(director => director.name).join(", ")}
        Homepage: ${this.homepage}
        IMDB ID: ${this.imdb_id}
        YouTube ID: ${this.youtube_id}
        Overview: ${this.overview}
        Rating: ${this.rating}
        Revenue: ${this.revenue}
        Release Date: ${this.release_date}
        Cast: ${this.cast.map(actor => actor.name).join(", ")}
        Reviews: ${this.reviews.map(author => author.name).join(", ")}
        `
    }
}

export default Movie;