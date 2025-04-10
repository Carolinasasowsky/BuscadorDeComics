/*******IMPRESIÓN COMICS*****/
//Imagen no disponible
const pathNonFoundNowanted =
	"https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
const pathNonFoundWanted =
	"https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny";

//Función pintar los comics
const printData = (arr) => {
	containerInfoCharacter.classList.add("hidden");
	comicInfoContainer.classList.add("hidden");
	characterContainer.classList.remove("hidden");
	let box = "";

	arr.forEach((comic) => {
		const {
			title,
			thumbnail: { extension, path },
			id,
		} = comic;
		box += `
          <div class="flex justify-center" onclick="getDetail(${id})">
              <figure class="card-image">
                  <a class="flex flex-col items-center go-to-image">
                      <img class="img-height" src="${
												path === pathNonFoundNowanted
													? pathNonFoundWanted
													: path
											}.${extension}" alt="${title}">
                      <p class="text-center">${title}</p>
                  </a>
              </figure>
          </div>`;
	});
	characterContainer.innerHTML = box;

	//PAGINADOR EN FUNCIÓN DE LA BUSQUEDA PRINCIPAL DE COMICS
	paginationContainer.innerHTML = `
              <button id="first-page-btn" class="button mr-3 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50" ${
								offset === 0 && "disabled"
							} onclick="firstPage(${() => fetchData(input, order)})">
              <i class="fas fa-angle-double-left"></i>
              </button>
              <button id="previews-page-btn" class="button mr-2 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded disabled:opacity-50"  ${
								offset === 0 && "disabled"
							} onclick="previewsPage(${() => fetchData(input, order)})">
              <i class="fas fa-angle-left"></i>
              </button>
              <div class="button mr-2 bg-gray-200 text-black font-bold py-2 px-4 rounded">
                  <span id="page-number">${pageNumber}</span>
              </div>
              <button id="next-page-btn" class="button bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded disabled:opacity-50" ${
								offset === total - (total % 20) && "disabled"
							} onclick="nextPage(${() => fetchData(input, order)})">
              <i class="fas fa-angle-right"></i>
              </button>
              <button id="last-page-btn" class="button ml-3 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50" ${
								offset === total - (total % 20) && "disabled"
							} onclick="lastPage(${() => fetchData(input, order)})">
              <i class="fas fa-angle-double-right"></i>
              </button>
      `;
};

//Función pintar detalle de comic seleccionado
const printComicInfo = (arr) => {
	containerComics.classList.add("hidden");
	containerInfoCharacter.classList.add("hidden");
	comicInfoContainer.classList.remove("hidden");

	let box = "";
	arr.forEach((comic) => {
		const {
			title,
			thumbnail: { extension, path },
			creators,
			description,
			dates,
			characters: { items },
		} = comic;

		const releaseDate = new Intl.DateTimeFormat("es-AR").format(
			new Date(dates?.find((el) => el.type === "onsaleDate").date)
		);
		const writer = creators?.items
			?.filter((el) => el.role === "writer")
			.map((creator) => creator.name)
			.join(", ");
		box += `
          <div class="flex flex-wrap md:flex-nowrap">
              <div class="w-full md:w-1/4 p-4">
                  <figure class="img-detalle">
                  <img src="${
										path === pathNonFoundNowanted ? pathNonFoundWanted : path
									}.${extension}" alt="${title}" class="img-comic-info text-comic">
                  </figure>
              </div>
              <div class="w-full md:w-3/4 px-6 py-4 text-lg text-title title-color">
                  <h3 class="text-2xl font-bold mb-2 title-color">${title}</h3>
                  <h4 class="font-bold mb-2">Publicado:</h4>
                  <p>${releaseDate}</p>
                  <h4 class="font-bold mt-3 mb-2">Guionistas:</h4>
                  <p>${writer ? writer : "Sin información"}</p>
                  <h4 class="font-bold mt-3 mb-2">Descripción:</h4>
                  <p class="text-justify pr-6">${
										description ? description : "Sin información"
									}</p>
              </div>
          </div>`;
	});
	comicInfo.innerHTML = box;
};

const printCharactersComic = (arr, containerText, container) => {
	container.classList.remove("hidden");
	if (arr.length === 0) {
		containerText.innerHTML = `
              <h3 class="title text-2xl font-bold mb-2 title-color">Personajes</h3>
              <p class="text-sm font-bold mt-0">${arr.length} Resultado(s)</p>
              <p class="subtitle text-lg font-bold mt-6 title-color">No se han encontrado resultados</p>`;
	}
	let box = "";
	arr.forEach((character) => {
		const {
			name,
			thumbnail: { extension, path },
			id,
		} = character;
		const pathNonFoundNowanted =
			"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
		const pathNonFoundWanted =
			"https://i.pinimg.com/564x/6d/af/a0/6dafa08555ee450d9d61061c7bc23cb5";

		containerText.innerHTML = `
                  <h3 class="title text-2xl font-bold mb-2 text-center title-color">Personajes</h3>
                  <p class="text-sm font-bold mt-0 text-center">${arr.length} Resultado(s)</p>`;
		box += `<div class="grid place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" onclick="getCharacterDetail(${id})">
                      <div class="character-card" data-title="Character" >
                          <img src="${
														path === pathNonFoundNowanted
															? pathNonFoundWanted
															: path
													}.${extension}" alt="${name}" class="character-img">
                          <span class="character-span"></span>
                          <p class="name text-base sm:text-lg font-bold text-center mt-1 p-3">${name}</p>
                      </div>
                  </div> `;
	});

	container.innerHTML = box;

  };