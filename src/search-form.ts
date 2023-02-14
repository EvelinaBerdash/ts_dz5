import { renderBlock } from "./lib.js"
import { renderSearchResultsBlock } from "./search-results.js";

interface SearchFormData {
  cityForm: string;
  dateInForm: string;
  dateOutForm: string;
  priceForm: number;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (month < 10) {
    return `${year}-0${month}-${day}`;
  } else {
    return `${year}-${month}-${day}`;
  }
}

function search(searchFormData: SearchFormData) {
  // console.log(searchFormData);
}

function onSearchClick() {
  console.log("sadfsd");

  renderSearchResultsBlock();
  const cityForm = (document.getElementById("city") as HTMLInputElement).value;
  const dateInForm = (
    document.getElementById("check-in-date") as HTMLInputElement
  ).value;
  const dateOutForm = (
    document.getElementById("check-out-date") as HTMLInputElement
  ).value;
  const priceForm = Number(
    (document.getElementById("max-price") as HTMLInputElement).value
  );

  search({ cityForm, dateInForm, dateOutForm, priceForm });
}

export function renderSearchFormBlock(dateIn: Date, dateOut: Date) {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);

  formatDate(today);
  formatDate(lastDayOfMonth);



  renderBlock(
    "search-form-block",
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <div class="providers">
            <label><input type="checkbox" id="homy" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" id="flat" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value=${formatDate(
      dateIn
    )} min=${formatDate(today)} max=${formatDate(
      lastDayOfMonth
    )} name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${formatDate(
      dateOut
    )} min=${formatDate(today)} max=${formatDate(
      lastDayOfMonth
    )} name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
          <div><button type="button" id="searchBtn">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
  document.getElementById("searchBtn").addEventListener("click", onSearchClick);
}