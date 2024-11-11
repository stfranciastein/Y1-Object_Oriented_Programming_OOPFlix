class MovieDetail {

    constructor(_movie) {
        this.movie = _movie;
    }

    render() {
        let movieDetail = document.createElement('div');

        movieDetail.setAttribute('class', 'item-detail');
        movieDetail.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1)), url('${this.movie.backdrop}')`;
        movieDetail.style.backgroundRepeat = 'no-repeat';
        movieDetail.innerHTML = `
           <div class="row">
                <div class ="nestedHalf">
                    <img class = "poster" src="${this.movie.poster}" alt" ${this.movie.title}'s posters>
                    <div class ="item-info">
                        <h2>${this.movie.title}</h2>
                        <p><a href="${this.movie.website}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> Website | <a href = "https://www.imdb.com/title/${this.movie.imdb_id}" target="_blank"><i class="fa-solid fa-film"></i> IMDB</a></p>
                        <p><strong>Director:</strong> ${this.movie.director.name}</p>
                        <p><strong>Rating:</strong> ${this.movie.rating}/10</p>
                        <p><strong>Overview:</strong> ${this.movie.overview}</p>
                        <p><strong>Released:</strong> ${this.movie.release_date}</h4>
                        <p><strong>Genres:</strong> ${this.movie.genres.join(", ")}</p>
                        <p><strong>Revenue:</strong> $${Number(this.movie.revenue).toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div class ="row">              
                <div class="card-container">
                </div>
                <div class="youtube-container">
                </div>
                <div class="card-container-2">
                </div>
            </div>
            `;

            let cardContainer = movieDetail.querySelector('.card-container'); //Cast

            this.movie.cast.forEach((castMember) => {
                let card = document.createElement('div');
                card.setAttribute('class', 'card');

                card.innerHTML = `
                    <img src="${castMember.image}" alt="" />
                    <div class="card-details">
                        <h4>${castMember.name}</h4>
                        <p>${castMember.character}</p>
                    </div>
                `;

                cardContainer.appendChild(card);

            });

            let youtubeContainer = movieDetail.querySelector('.youtube-container'); // Video

            if (this.movie.youtube_id !== 0) {
                let youtubeFrame = document.createElement('div');
                youtubeFrame.innerHTML = `
                    <iframe width="100%" height="400px" src="https://www.youtube-nocookie.com/embed/${this.movie.youtube_id}?autoplay=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                `;
                youtubeContainer.appendChild(youtubeFrame);
            };
            
            let cardContainer2 = movieDetail.querySelector('.card-container-2'); //Reviews Section

            if (this.movie.reviews !== 0) {this.movie.reviews.forEach((reviewer) => {
                let commentCard = document.createElement('div');
                commentCard.setAttribute('class', 'comment-card');

                commentCard.innerHTML = `
                    <div class="comment-card-details">
                        <ul>
                            <h4>${reviewer.author}</h4>
                            <h5>${reviewer.created_at}</h5>
                        </ul>
                        <p>${reviewer.content}</p>
                    </div>
                `;

                cardContainer2.appendChild(commentCard);
            });
            };

        return movieDetail;
    }
}

export default MovieDetail;