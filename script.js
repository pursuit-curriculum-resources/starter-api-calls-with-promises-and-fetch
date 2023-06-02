const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

const form = document.querySelector("form");
form.addEventListener("submit", getPokemonByID);

function getPokemonByID(e) {
  e.preventDefault();
  const input = document.querySelector("#pokemon-id");
  const id = input.value;
  fetch(`${BASE_URL}/${id || 1}`)
    .then((response) => response.json())
    .then((response) => {
      displayCard(response);
    })
    .catch(displayError);
  form.reset();
}

function displayCard(pokemon) {
  const { name, sprites, order } = pokemon;
  const section = document.createElement("section");
  section.classList.add("card");
  //
  const img = document.createElement("img");
  img.setAttribute("src", sprites.front_default);
  img.setAttribute("alt", name);

  const h2 = document.createElement("h2");
  h2.textContent = name;

  const paragraph = document.createElement("p");
  paragraph.textContent = order;

  section.append(img, h2, paragraph);
  document.querySelector(".pokemon").append(section);
}

function displayError(error) {
  const section = document.querySelector("section.error");
  section.style.display = "block";
  section.innerHTML = "";

  const paragraph = document.createElement("p");
  paragraph.textContent = "Something went wrong!";

  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error-message");
  errorMessage.textContent = error;

  section.append(paragraph, errorMessage);
}
