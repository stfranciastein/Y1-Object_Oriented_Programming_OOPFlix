import Movie from './classes/Movie.js';

let moviesList = Movie.findAll();

console.log(moviesList);

let main = document.querySelector('#main');
let detail = document.querySelector('#detail');
console.log(main);
console.log(detail);


let moviesHTML = moviesList.map((movie, index)=> {
    let movieDiv = document.createElement('div');
    movieDiv.dataset.id = index;
    movieDiv.setAttribute('class', 'movie');

    movieDiv.innerHTML = `
    <div class="movie-info">
        <h3>${movie.title}</h3>
        <span>${movie.genres.join(", ")}</span>
    </div>`

    // movieDiv.addEventListener('click', () => {
    //     console.log(movieDiv.dataset.id + movie.title + movie.genres.join(", "));
    // });

     return movieDiv;
});

console.log(moviesHTML);

moviesHTML.forEach((movieDiv) => {
    main.appendChild(movieDiv);
});

main.addEventListener('click', function(event) {
    let selectedMovieDiv = event.target.closest('.movie');
    
    if(selectedMovieDiv !== null){
        let selectedId = selectedMovieDiv.dataset.id;
        console.log(selectedId);
        let selectedMovie = moviesList[selectedId];
        console.log(selectedMovie);

        let movieDetail = document.createElement('div');
        movieDetail.setAttribute('class', 'movieDetail');
        movieDetail.innerHTML = `
            <h3>${selectedMovie.title}</h3>
            <img src=${selectedMovie.poster}/>
            <h3>Overview</h3>
            <p>${selectedMovie.overview}</p>
            `;
        console.log(movieDetail);

        detail.innerHTML="";
        detail.appendChild(movieDetail);
    }
});

