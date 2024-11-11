class ShowDetail {

    constructor(_show) {
        this.show = _show;
    }

    render() {
        let showDetail = document.createElement('div');

        showDetail.setAttribute('class', 'item-detail');
        showDetail.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1)), url('${this.show.backdrop}')`;
        showDetail.style.backgroundRepeat = 'no-repeat';
        showDetail.innerHTML = `
           <div class="row">
                <div class ="nestedHalf">
                    <img class = "poster" src="${this.show.poster}" alt" ${this.show.title}'s posters>
                    <div class ="item-info">
                        <h2>${this.show.title}</h2>
                        <p><a href="${this.show.homepage}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> Website | <a href = "https://www.imdb.com/title/${this.show.id}" target="_blank"><i class="fa-solid fa-film"></i> IMDB</a></p>
                        <p><strong>Director:</strong> ${this.show.director.name}</p>
                        <p><strong>Overview:</strong> ${this.show.overview}</p>
                        <p><strong>Initial Release:</strong> ${this.show.first_air_date} <strong>Last Air Date:</strong> ${this.show.last_air_date}</p>
                        <p><strong>Genres:</strong> ${this.show.genres.join(", ")}</p>
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

            let cardContainer = showDetail.querySelector('.card-container');

            this.show.cast.forEach((castMember) => {
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

            let youtubeContainer = showDetail.querySelector('.youtube-container'); // Video

            if (this.show.youtube_id !== 0) {
                let youtubeFrame = document.createElement('div');
                youtubeFrame.innerHTML = `
                    <iframe width="100%" height="400px" src="https://www.youtube-nocookie.com/embed/${this.show.youtube_id}?autoplay=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                `;
                youtubeContainer.appendChild(youtubeFrame);
            };

            let cardContainer2 = showDetail.querySelector('.card-container-2'); //Reviews Section

            if (this.show.reviews !== 0) {this.show.reviews.forEach((reviewer) => {
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

        return showDetail;
    }
}

export default ShowDetail;