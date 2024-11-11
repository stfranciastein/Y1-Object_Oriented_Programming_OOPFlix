class MovieListItem {
    constructor(_movie, _index){
        this.movie = _movie;
        this.index = _index;
    }

    render(){
        let movieDiv = document.createElement('div');
        movieDiv.dataset.id = this.index;
        movieDiv.setAttribute('class', 'main-item'); //Removed class movie from this and unified it to one class because of redundant CSS (see original style page)
        movieDiv.style.backgroundImage = `url('${this.movie.poster}')`;
        movieDiv.style.backgroundPosition = 'center';
        movieDiv.innerHTML = `
        <div class="main-item-info">
            <h3>${this.movie.title}</h3>
            <span>${this.movie.genres.join(", ")}</span>
        </div>
        `;

        return movieDiv;
    }
}

export default MovieListItem;