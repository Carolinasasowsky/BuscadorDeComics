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

