import DB from './DB.js';

class Show {

    constructor(_data){
        this.title = _data.title;
        this.poster = _data.poster;
        this.backdrop = _data.backdrop;
        this.genres = _data.genres;
        this.homepage = _data.homepage;
        this.id = _data.id;
        this.overview = _data.overview;
        this.first_air_date = _data.first_air_date;
        this.last_air_date = _data.last_air_date;
        this.youtube_id = _data.youtube_id;
        this.cast = _data.cast;
        this.reviews = _data.reviews;
        this.rating = _data.rating;
        this.number_of_episodes = _data.number_of_episodes;
        this.number_of_seasons = _data.number_of_seasons;
        this.director = _data.director;
    }

    static async findAll(){
        let db = new DB();
        let data = await db.getShowData();

        let shows = data.map(dataObj => new Show(dataObj));

        return shows;
    }

    getDetails(){
        return `
        Title: ${this.title}
        Poster: ${this.poster}
        Backdrop: ${this.backdrop}
        Genres: ${this.genres.join(", ")}
        Homepage: ${this.homepage}
        ID: ${this.id}
        Overview: ${this.overview}
        First Air Date: ${this.first_air_date}
        Last air Date: ${this.last_air_date}
        Youtube ID: ${this.youtube_id}
        Cast: ${this.cast.map(actor => actor.name).join(", ")}
        Director: ${this.cast.map(director => director.name).join(", ")}
        `
    }
}

export default Show;