var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderBlock } from "./lib.js";
import { getFavoritesAmount, getFavoritesItems, renderUserBlock } from "./user.js";
export function renderSearchStubBlock() {
    renderBlock("search-results-block", `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `);
}
export function isFavoritePlaceExist(favoritePlace) {
    return getFavoritesItems().find((place) => {
        return place.id === favoritePlace.id;
    });
}
function toggleFavoriteItem(place) {
    const favoritePlace = {
        id: place.id,
        name: place.name,
        image: place.image,
    };
    let favoriteItems = getFavoritesItems();
    if (isFavoritePlaceExist(favoritePlace)) {
        favoriteItems = favoriteItems.filter((place) => place.id !== favoritePlace.id);
    }
    else {
        favoriteItems.push(favoritePlace);
    }
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
}
const places = [];
function getData(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(`http://localhost:3030/places/${id}`)
            .then((response) => {
            // response.text();
            // .then((response) => {
            //   // console.log(response);
            //   // response.text();
            //   if (response.status === 400) {
            //     renderToast(
            //       {
            //         text: `${response.statusText}. Error ${response.status}`,
            //         type: "error",
            //       },
            //       {
            //         name: "Понял",
            //         handler: () => {
            //           console.log("Уведомление закрыто");
            //         },
            //       }
            //     );
            //   }
            return response.json(); // Error!
        })
            .then((data) => {
            places.push(data);
            return `<div class="result-container">
      <div class="result-img-container">
      ${!isFavoritePlaceExist(data)
                ? `<div id="${data.id}" class="favorites"></div>`
                : `<div id="${data.id}" class="favorites active"></div>`}
        <img class="result-img" src=${data.image} alt="">
      </div>	
      <div class="result-info">
        <div class="result-info--header">
          <p>${data.name}</p>
          <p class="price">${data.price}</p>
        </div>
        <div class="result-info--map"><i class="map-icon"></i> ${data.remoteness} км от вас</div>
        <div class="result-info--descr">${data.description}</div>
        <div class="result-info--footer">
          <div>
            <button>Забронировать</button>
          </div>
        </div>
      </div>
    </div>`;
        });
        // return resultAPI;
    });
}
export function renderSearchResultsBlock() {
    return __awaiter(this, void 0, void 0, function* () {
        const place1 = yield getData("1");
        const place2 = yield getData("2");
        renderBlock("search-results-block", `
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
      <li class="result">
      ${place1}
      </li>
      <li class="result"> 
      ${place2}
      </li>
    </ul>
    `);
        places.forEach((item) => {
            document.getElementById(`${item.id}`).addEventListener("click", (event) => {
                toggleFavoriteItem(item);
                renderUserBlock("Anton Pryakhin", "/img/avatar.png", getFavoritesAmount());
                event.currentTarget.classList.toggle("active");
            });
        });
    });
}
