//Amends the content in the page itself (refactored code so that it works for both movies and shows)
async function initialiseList(itemClass,  itemListClass, itemDetailClass) {
    let itemList = await itemClass.findAll();
    let itemListFiltered = [];
    let genres = [];
    //Refactored code from Matthew (the top G). Will loop through all the genres in the genres array per item
    itemList.forEach(item => {
        item.genres.forEach(genre => {
            if (!genres.includes(genre)) {
                genres.push(genre);
            }
        });
    });
    genres.sort() //sorts the genres out alphabetically

    let main = document.querySelector('#main');
    let detail = document.querySelector('#detail');
    let searchBar = document.querySelector('#search-bar');

    function generateGenreCheckboxes(genres) {
        let genresContainer = document.getElementById('genres-container');
    
        genres.forEach((genre, index) => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `check-box-${index + 1}`;
            checkbox.name = `genre-${index + 1}`;
            checkbox.value = genre;
    
            const label = document.createElement('label');
            label.htmlFor = `check-box-${index + 1}`;
            label.textContent = genre;
    
            genresContainer.appendChild(checkbox);
            genresContainer.appendChild(label);
            genresContainer.appendChild(document.createElement('br'));
        });

            //17/04/24: Selects ALL the checkboxes in genresContainer/genres-container + add an event listener = run the filterItemsByGenre function.
            // document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            genresContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                filterItemsByGenres();
            });
    });
    }

    function printItems(list) {
        main.innerHTML = '';
        list.forEach((item, index) => {
            let itemComponent = new itemListClass(item, index);
            main.appendChild(itemComponent.render());
        });
    }
        
    function filterItemsByGenres() {
        let checkedGenres = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value); 
        //Array. converts all the objects found by the querySelector into an array. Map extracts its value and puts it into the checkedGenres array.
        if (checkedGenres.length === 0) {
            printItems(itemList);
        } else {
            itemListFiltered = itemList.filter(item => {
                return checkedGenres.every(genre => item.genres.includes(genre)); //Checks if every single genre in the checkedGenres array matches the movie/show object's genres array.
            });
            printItems(itemListFiltered);
        }
    }

    generateGenreCheckboxes(genres);
    printItems(itemList);  //This will print moviesList or showsList by default until it's changed by an event, either the searchbar, clicking or checkboxes.

    //Event Listeners
    main.addEventListener('click', function(event) {
        let selectedItemDiv = event.target.closest('.main-item'); //main-item used to be .movie or .show, but because the CSS did the same thing I changed it to one class.

        if(selectedItemDiv !== null){ 
            let selectedId = selectedItemDiv.dataset.id;
            let selectedItem;
            
            
            if (itemListFiltered.length > 0) {
                selectedItem = itemListFiltered[selectedId];
            } else {
                selectedItem = itemList[selectedId];
            }

            // console.log(selectedItem); 
            let itemDetail = new itemDetailClass(selectedItem);
            detail.innerHTML="";
            detail.appendChild(itemDetail.render());

            //Depreciated test code that will force the window to scroll up when a movie is selected. Superceded by modal.
            // window.scrollTo({
            //     top: 0,
            //     behavior: 'smooth'
            // });
        }
    });

    searchBar.addEventListener('keyup', function (event) {
        let searchBarValue = searchBar.value.toLowerCase();
        itemListFiltered = itemList.filter(item => 
            item.title.toLowerCase().includes(searchBarValue) || 
            item.cast.some(actor => actor.name.toLowerCase().includes(searchBarValue))); //Searches the 'cast' property of the item

        printItems(itemListFiltered);
    });
}

// function generateGenreCheckboxes(genres) {
//     let genresContainer = document.getElementById('genres-container');

//     genres.forEach((genre, index) => {
//         const checkbox = document.createElement('input');
//         checkbox.type = 'checkbox';
//         checkbox.id = `check-box-${index + 1}`;
//         checkbox.name = `genre-${index + 1}`;
//         checkbox.value = genre;

//         const label = document.createElement('label');
//         label.htmlFor = `check-box-${index + 1}`;
//         label.textContent = genre;

        

//         genresContainer.appendChild(checkbox);
//         genresContainer.appendChild(label);
//         genresContainer.appendChild(document.createElement('br'));
//     });
// }

export { initialiseList };
// export { generateGenreCheckboxes };

//localStorage.setItem(parameter, parameter);
//in local storage everything is a string