/////////////////////////////////////////////////////////////////////////////////////////
//finding the root element
const app = document.getElementById("root");

//creating an element for the logo
const logo = document.createElement("img");
//creating a container element
const container = document.createElement("div");
container.setAttribute("class", "container");

//attaching the logo and the container to the root element
app.appendChild(logo);
app.appendChild(container);

//the url is our endpoint and contains the data that we want to work with
let url = "movies.json";

//TODO: copy/paste the link into a browser, so that you can see the data you are going to work with
//The endpoint is passed into the call of the fetch function. The call of the fetch returns a promise
fetch(url)
  //when the promise is resolved we extract the JSON part of the response object
  .then((response) => {
    return response.json();
  })
  //then we can work with the JSON data
  .then((data) => {

    // We iterate through all the objects
    data.forEach((movieCollection) => {

      let api = movieCollection.Url;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((movie) => {
          document.querySelector(".container").innerHTML += /* html*/ `
          <div class="card">
          <img src="${movie.Poster}">
          <div class="card__content">
          <h2>${movie.Title}</h2>
          <p><i class="fas fa-calendar-week"></i> ${movie.Year}</p>
          <p><i class="fab fa-imdb"></i> ${movie.imdbRating}</p>
          <p><i class="fas fa-clock"></i> ${movie.Runtime}</p>
          <hr>
          <p>${movie.Plot}</p>
          <div class="trailer-popup"> <iframe class="trailer-content" src="${movieCollection.Trailer}"></iframe></div>
          </div>
          `
        })
        .catch((err) => {
          console.log("Something went wrong");
        });
    });
  })
