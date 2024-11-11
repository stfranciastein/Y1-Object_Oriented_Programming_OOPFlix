class DB {
    constructor() {
        this.data = [];
    }

    async getMovieData() { //Asynchronous operation, has to start code but must wait for results to come back.
       let response = await fetch("./data/movies.json");
       let data  = await response.json();
       return data;
    }

    async getShowData() {
        let response = await fetch("./data/shows.json");
        let data = await response.json();
        return data;
    }
}

export default DB;
