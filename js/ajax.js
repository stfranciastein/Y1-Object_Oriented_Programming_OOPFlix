// fetch("./data/movies.json")
// .then((response) => {
//     return response.json();
// })
// .then((data) => {
//     console.log(data);
// });


let response = await fetch("./data/movies.json");
let data = await response.json();

console.log(data);