//API Key
//Hashear nuestras keys
const timestamp = "1742342577218";
const public = "a7cc81ef01428e57e2cddebc7e9a2c22";
const hash = "1f663ffc0a65b4024d95396d0801b662";

const totalData = document.getElementById("total-result");

//DOM
//Vista general
//Contenedores principales
const loaderContanier = document.getElementById("container-loader");
const containerComics = document.getElementById("container-comics");
const characterContainer = document.getElementById("main-container");
const comicInfoContainer = document.getElementById("container-comic-info");
const comicInfo = document.getElementById("comic-info");
//Contenedores especificos
const comicCharactersInfo = document.getElementById("comic-characters-info");
const comicDataCharacters = document.getElementById("comic-data-characters");
const containerInfoCharacter = document.getElementById(
	"container-character-info"
);
const characterInfo = document.getElementById("character-info");
const comicsCharacterInfo = document.getElementById("comics-character-info");
const characterDataComics = document.getElementById("character-data-comics");

//Búsqueda
const searchInput = document.getElementById("search-input");
const searchType = document.getElementById("search-type");
const searchOrder = document.getElementById("search-order");
const btnSearch = document.getElementById("btn-search");

// Paginado
const paginationContainer = document.getElementById("pagination-container");

//configuraciones generales
let offset = 0;
let total;
let input = searchInput.value;
let order = searchOrder.value;
let type = searchType.value;
let pageNumber = 1;

// <<<<<<<<<<<<<<<<<<<<<<< DARK MODE <<<<<<<<<<<<<<<<<<<<<<<

function toggleDarkMode() {
	const html = document.documentElement;
	const iconTheme = document.getElementById("icon-theme");

	const isDark = html.classList.toggle("theme--dark");

	localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");

	// Cambiar icono
	if (isDark) {
		iconTheme?.classList.remove("fa-moon");
		iconTheme?.classList.add("fa-sun");
	} else {
		iconTheme?.classList.remove("fa-sun");
		iconTheme?.classList.add("fa-moon");
	}
}

window.addEventListener("DOMContentLoaded", () => {
	const savedMode = localStorage.getItem("darkMode");
	const html = document.documentElement;
	const iconTheme = document.getElementById("icon-theme");

	if (savedMode === "enabled") {
		html.classList.add("theme--dark");
		iconTheme?.classList.remove("fa-moon");
		iconTheme?.classList.add("fa-sun");
	} else {
		iconTheme?.classList.remove("fa-sun");
		iconTheme?.classList.add("fa-moon");
	}

	const btnTheme = document.getElementById("toggle-theme");
	btnTheme?.addEventListener("click", toggleDarkMode);
});

/** <<<<<<<<<<<<<<<<<<<<<<< PETICIONES COMICS/PERSONAJES <<<<<<<<<<<<<<<<<<<<<<<  ***/ 

const fetchData = (input, order) => {
  containerInfoCharacter.classList.add("hidden");
  comicInfoContainer.classList.add("hidden");
  containerComics.classList.remove("hidden");
  loaderContanier.classList.remove("hidden");
  characterContainer.classList.add("hidden");
  total = undefined;
  let url;
  if (input !== "") {
    url = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  } else {
    url = `https://gateway.marvel.com/v1/public/comics?&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  }
  loader('show');
  fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      loader('hide'),
      printData(obj.data.results);
      total = obj.data.total;
      totalData.innerHTML = total;
    })
    .catch((error) => console.error(error));
};

const fetchCharacters = (input, order) => {
  characterContainer.classList.add("hidden");
  total = undefined;
  loader('show');
  let url;
  if (input !== "") {
    url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  } else {
    url = `https://gateway.marvel.com/v1/public/characters?&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  }
  fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      printCharactersComic(obj.data.results, "", characterContainer);
      
      total = obj.data.total;
      totalData.innerHTML = total;
      loader('hide');
    })
    .catch((error) => console.error(error));
};

/** <<<<<<<<<<<<<<<<<<<<<<< COMICS <<<<<<<<<<<<<<<<<<<<<<<  ***/
let comicDetail = "";
const getDetail = (id) => {
  total = undefined;

  const url = `https://gateway.marvel.com/v1/public/comics/${id}?&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      printComicInfo(obj.data.results);
      total = obj.data.total;
    })
    .catch((error) => console.error(error));
  comicDetail = id;
  pageNumber = 1;
  getCharacterComicDetail(comicDetail);
  return comicDetail;
};

const getCharacterComicDetail = (id) => {
  loader('show');
  offset = 0;
  const url = `https://gateway.marvel.com/v1/public/comics/${id}/characters?&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      printCharactersComic(        
        obj.data.results,
        comicDataCharacters,
        comicCharactersInfo        
      );
      loader('hide');
    })
    .catch((error) => console.error(error));
};

