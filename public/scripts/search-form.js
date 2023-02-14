import { renderBlock } from "./lib.js";
import { renderSearchResultsBlock } from "./search-results.js";
function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (month < 10) {
        return `${year}-0${month}-${day}`;
    }
    else {
        return `${year}-${month}-${day}`;
    }
}
export function renderSearchFormBlock(dateIn, dateOut) {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    formatDate(today);
    formatDate(lastDayOfMonth);
    function search(searchFormData) {
        console.log(searchFormData);
    }
    function onSearchClick() {
        renderSearchResultsBlock();
        const cityForm = document.getElementById("city")
            .value;
        const dateInForm = document.getElementById("check-in-date").value;
        const dateOutForm = document.getElementById("check-out-date").value;
        const priceForm = Number(document.getElementById("max-price").value);
        search({ cityForm, dateInForm, dateOutForm, priceForm });
    }
    renderBlock("search-form-block", `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value=${formatDate(dateIn)} min=${formatDate(today)} max=${formatDate(lastDayOfMonth)} name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${formatDate(dateOut)} min=${formatDate(today)} max=${formatDate(lastDayOfMonth)} name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button id="searchBtn" onclick=${onSearchClick}>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `);
    document.getElementById("searchBtn").addEventListener("click", onSearchClick);
}
