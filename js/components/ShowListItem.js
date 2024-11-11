class ShowListItem {
    constructor(_show, _index){
        this.show = _show;
        this.index = _index;
    }

    render(){
        let showDiv = document.createElement('div');
        showDiv.dataset.id = this.index;
        showDiv.setAttribute('class', 'main-item');
        showDiv.style.backgroundImage = `url('${this.show.poster}')`;
        showDiv.style.backgroundPosition = 'center';
        showDiv.innerHTML = `
        <div class="main-item-info">
            <h3>${this.show.title}</h3>
            <span>${this.show.genres.join(", ")}</span>
        </div>
        `;

        return showDiv;
    }
}

export default ShowListItem;