async function initialiseList(itemClass,  itemListClass, itemDetailClass) { //Refactored code so that it works for both movies and shows)
    let itemList = await itemClass.findAll();
    let itemListFiltered = [];
    let itemListSorted = [];
    let genres = [];

    itemList.forEach(item => { //Refactored code from Matthew (the top G). Will loop through all the genres in the genres array per item
        item.genres.forEach(genre => {
            if (!genres.includes(genre)) {
                genres.push(genre);
            }
        });
    });
    genres.sort() //sorts the genres out alphabetically for display on dropdown

    let main = document.querySelector('#main');
    let detail = document.querySelector('#detail');
    let searchBar = document.querySelector('#search-bar');
    let sort1 = document.querySelector('#sort-1');
    let sort2 = document.querySelector('#sort-2');
    let sort3 = document.querySelector('#sort-3');
    let sort4 = document.querySelector('#sort-4');

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
        let checkedGenres = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value); //Array.etc converts all the CHECKED objects found by the querySelector into an array. Map extracts its value and puts it into the checkedGenres array.
        if (checkedGenres.length === 0) {
            toggleHeroVideoVisibility(true);
            printItems(itemList);
        } else {
            itemListFiltered = itemList.filter(item => {
                return checkedGenres.every(genre => item.genres.includes(genre)); //Checks if every single genre in the checkedGenres array matches the movie/show object's genres array.
            });
            toggleHeroVideoVisibility(false);
            printItems(itemListFiltered);
        }
    }

    function toggleHeroVideoVisibility(visible) {
        const heroVideoSection = document.querySelector('.hero-video');
        heroVideoSection.style.display = visible ? 'block' : 'none';
    }

    generateGenreCheckboxes(genres);
    printItems(itemList);  //This will print moviesList or showsList by default until it's changed by an event, either the searchbar, clicking or checkboxes.  

    main.addEventListener('click', function(event) {
        let selectedItemDiv = event.target.closest('.main-item'); //main-item used to be .movie or .show, but because the CSS did the same thing I changed it to one class.

        if(selectedItemDiv !== null){ 
            let selectedId = selectedItemDiv.dataset.id;
            let selectedItem;
            
            
            if (itemListFiltered.length > 0 ) {
                selectedItem = itemListFiltered[selectedId];
            } else if (itemListSorted.length > 0 ) {
                selectedItem = itemListSorted[selectedId];
            } else {
                selectedItem = itemList[selectedId];
            }

            // console.log(selectedItem); 
            let itemDetail = new itemDetailClass(selectedItem);
            detail.innerHTML="";
            detail.appendChild(itemDetail.render());
            detail.style.display = "flex";

            //Depreciated test code that will force the window to scroll up when a movie is selected. Superceded by modal.
            // window.scrollTo({
            //     top: 0,
            //     behavior: 'smooth'
            // });
        }
    });

    searchBar.addEventListener('keyup', function (event) {
        let searchBarValue = searchBar.value.toLowerCase();
        if (searchBarValue.trim() === '') {
            printItems(itemList);
            toggleHeroVideoVisibility(true);
        } else {
            itemListFiltered = itemList.filter(item => 
            item.title.toLowerCase().includes(searchBarValue) || 
            item.cast.some(actor => actor.name.toLowerCase().includes(searchBarValue))); //Searches the 'cast' property of the item
            toggleHeroVideoVisibility(false);
            printItems(itemListFiltered);
        }
    });

    // Because the sort events only sort itemList, you can still use the genre filters on them 
    
    sort1.addEventListener('click', function(event) {
        console.log('clicked');
        itemListSorted = itemList.sort((a, b) => {
            return a.title.localeCompare(b.title);
        });

        toggleHeroVideoVisibility(false);
        printItems(itemListSorted);
    });

    sort2.addEventListener('click', function(event) {
        itemListSorted = itemList.sort((a, b) => {
            return b.title.localeCompare(a.title);
        });

        toggleHeroVideoVisibility(false);
        printItems(itemListSorted);
    });

    sort3.addEventListener('click', function(event) { //I know how to fix this code now
        itemListSorted = itemList.sort((a, b) => {
            if (!a.release_date) {
                // If release_date is empty for item a, sort by first_air_date
                return new Date(b.first_air_date) - new Date(a.first_air_date);
            } else if (!b.release_date) {
                // If release_date is empty for item b, sort by first_air_date
                return new Date(b.first_air_date) - new Date(a.first_air_date);
            } else {
                // Otherwise, sort by release_date
                return new Date(b.release_date) - new Date(a.release_date);
            }
        });
    
        toggleHeroVideoVisibility(false);
        printItems(itemListSorted);
    });
    

    sort4.addEventListener('click', function(event) {
        itemListSorted = itemList.sort((a, b) => {
            return b.rating - a.rating;
        });
    
        toggleHeroVideoVisibility(false);
        printItems(itemListSorted);
    });

    window.onclick = function(event) { //Closes the modal window
        if (event.target == detail) {
        detail.style.display = "none";
        }
    };
    
    window.addEventListener('scroll', function() {
        let navbar = document.getElementById('navbar');
        let scrollPosition = window.scrollY;
        var navbarHeight = navbar.offsetHeight;

        if (scrollPosition > navbarHeight) {
          navbar.classList.add('navbar-scrolled');
        } else {
          navbar.classList.remove('navbar-scrolled');
        }
      });
}

export { initialiseList };