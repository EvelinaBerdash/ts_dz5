import { HomeProvider } from "./HomeProvider.js";
import { renderBlock } from "./lib.js"
import { FavoritePlace, Place } from "./Place.js"
import { SdkProvider } from "./SdkProvider.js";
import { getFavoritesAmount, getFavoritesItems, renderUserBlock } from "./user.js"

export function renderPlace(place: Place) {
  return `<div class="result-container">
  <div class="result-img-container">
  ${!isFavoritePlaceExist(place)
      ? `<div id="${place.id}" class="favorites"></div>`
      : `<div id="${place.id}" class="favorites active"></div>`
    }
    <img class="result-img" src=${place.image} alt="">
  </div>	
  <div class="result-info">
    <div class="result-info--header">
      <p>${place.name}</p>
      <p class="price">${place.price}</p>
    </div>
    <div class="result-info--map"><i class="map-icon"></i> ${place.remoteness
    } км от вас</div>
    <div class="result-info--descr">${place.description}</div>
    <div class="result-info--footer">
      <div>
        <button>Забронировать</button>
      </div>
    </div>
  </div>
</div>`;
}

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
// function createFavoritePlaceFromFlat(flat: Flat): FavoritePlace {
//   return {
//     id: flat.id,
//     name: flat.title,
//     image: flat.photos[0],
//   };
// }

const places = [];

let selectValue = "cheap";

const homeProvider = new HomeProvider();

async function getDataFrom3030(id: string) {
  return homeProvider.getById(id).then((place) => {
    places.push(place);
    // return renderPlace(place);
  });
}

// const sdk = new FlatRentSdk();
// const today = new Date();
const sdkProvider = new SdkProvider();

function getDataFromSdk() {
  return sdkProvider.getById("vnd331").then((place) => {
    places.push(place);
    // return renderPlace(place);
  });
}

export async function fetchPlaces() {
  let place3;
  if (
    (document.getElementById("flat") as HTMLInputElement).checked &&
    (document.getElementById("homy") as HTMLInputElement).checked
  ) {
    await getDataFrom3030("1");
    await getDataFrom3030("2");
    await getDataFromSdk();
  } else if ((document.getElementById("homy") as HTMLInputElement).checked) {
    await getDataFrom3030("1");
    await getDataFrom3030("2");
  } else if ((document.getElementById("flat") as HTMLInputElement).checked) {
    await getDataFromSdk();
  }
}

  export async function renderSearchResultsBlock() {
    renderBlock(
      "search-results-block",
      `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select id="select">
            <option ${selectValue === "cheap" ? "selected" : ""
      }  value="cheap">Сначала дешёвые</option>
                    <option ${selectValue === "expensive" ? "selected" : ""
      }  value="expensive">Сначала дорогие</option>
                    <option ${selectValue === "closest" ? "selected" : ""
      }  value="closest">Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
      ${places
        .map((item) => {
          return `<li class="result">${renderPlace(item)}</li>`;
        })
        .join("")}
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

    document.getElementById("select").addEventListener("change", (event) => {
      selectValue = (event.currentTarget as HTMLSelectElement).value;
  
      if (selectValue === "cheap") {
        places.sort((place1, place2) => {
          return place1.price - place2.price;
        });
      } else if (selectValue === "expensive") {
        places.sort((place1, place2) => {
          return place2.price - place1.price;
        });
      } else if (selectValue === "closest") {
        places.sort((place1, place2) => {
          return place1.remoteness - place2.remoteness;
        });
      }
      renderSearchResultsBlock();
    });
  }
