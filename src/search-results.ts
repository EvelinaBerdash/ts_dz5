import { Flat, FlatRentSdk } from "./flat-rent-sdk.js";
import { renderBlock } from "./lib.js"
import { FavoritePlace, FavoritePlaceFlat, Place } from "./Place.js"
import { getFavoritesAmount, getFavoritesItems, renderUserBlock } from "./user.js"

export function renderSearchStubBlock() {
  renderBlock(
    "search-results-block",
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock(reasonMessage) {
  renderBlock(
    "search-results-block",
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

export function isFavoritePlaceExist(favoritePlace: FavoritePlace) {
  return getFavoritesItems().find((place) => {
    return place.id === favoritePlace.id;
  });
}

function toggleFavoriteItem(place: Place) {
  const favoritePlace: FavoritePlace = {
    id: place.id,
    name: place.name,
    image: place.image,
  };

  let favoriteItems = getFavoritesItems();
  if (isFavoritePlaceExist(favoritePlace)) {
    favoriteItems = favoriteItems.filter(
      (place) => place.id !== favoritePlace.id
    );
  } else {
    favoriteItems.push(favoritePlace);
  }

  localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
}
function createFavoritePlaceFromFlat(flat: Flat): FavoritePlace {
  return {
    id: flat.id,
    name: flat.title,
    image: flat.photos[0],
  };
}

const places = [];

async function getDataFrom3030(id: string) {
  return fetch(`http://localhost:3030/places/${id}`)
    .then<Place>((response) => {

      return response.json(); // Error!
    })
    .then((data) => {
      places.push(data);
      return `<div class="result-container">
      <div class="result-img-container">
      ${!isFavoritePlaceExist(data)
          ? `<div id="${data.id}" class="favorites"></div>`
          : `<div id="${data.id}" class="favorites active"></div>`
        }
        <img class="result-img" src=${data.image} alt="">
      </div>	
      <div class="result-info">
        <div class="result-info--header">
          <p>${data.name}</p>
          <p class="price">${data.price}</p>
        </div>
        <div class="result-info--map"><i class="map-icon"></i> ${data.remoteness
        } км от вас</div>
        <div class="result-info--descr">${data.description}</div>
        <div class="result-info--footer">
          <div>
            <button>Забронировать</button>
          </div>
        </div>
      </div>
    </div>`;
    });
}

const sdk = new FlatRentSdk();
const today = new Date();

function getDataFromSdk() {
  return sdk.get("vnd331").then((flat) => {
    console.log(flat);
    places.push(flat);
    return `<div class="result-container">
        <div class="result-img-container">
        ${!isFavoritePlaceExist(createFavoritePlaceFromFlat(flat))
        ? `<div id="${flat.id}" class="favorites"></div>`
        : `<div id="${flat.id}" class="favorites active"></div>`
      }
          <img class="result-img" src=${flat.photos[0]} alt="">
        </div>
        <div class="result-info">
          <div class="result-info--header">
            <p>${flat.title}</p>
            <p class="price">${flat.price}</p>
          </div>
          <div class="result-info--map"><i class="map-icon"></i> ${flat.coordinates
      } км от вас</div>
          <div class="result-info--descr">${flat.details}</div>
          <div class="result-info--footer">
            <div>
              <button>Забронировать</button>
            </div>
          </div>
        </div>
      </div>`;
  });
}

console.log(places);

export async function renderSearchResultsBlock() {
  let place1;
  let place2;
  let place3;
  if (
    (document.getElementById("flat") as HTMLInputElement).checked &&
    (document.getElementById("homy") as HTMLInputElement).checked
  ) {
    place1 = await getDataFrom3030("1");
    place2 = await getDataFrom3030("2");
    place3 = await getDataFromSdk();
  } else if ((document.getElementById("homy") as HTMLInputElement).checked) {
    place1 = await getDataFrom3030("1");
    place2 = await getDataFrom3030("2");
  } else if ((document.getElementById("flat") as HTMLInputElement).checked) {
    place3 = await getDataFromSdk();
  }
  renderBlock(
    "search-results-block",
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
    ${place1 !== undefined ? `<li class="result">${place1}</li>` : ""}
    ${place2 !== undefined ? `<li class="result">${place2}</li>` : ""}
    ${place3 !== undefined ? `<li class="result">${place3}</li>` : ""}
    </ul>
    `
  );
  places.forEach((item) => {
    document.getElementById(`${item.id}`).addEventListener("click", (event) => {
      toggleFavoriteItem(item);
      renderUserBlock(
        "Anton Pryakhin",
        "/img/avatar.png",
        getFavoritesAmount()
      );
      (event.currentTarget as HTMLElement).classList.toggle("active");
    });
  });
}
