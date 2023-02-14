import { renderBlock } from "./lib.js";
export function getFavoritesItems() {
    let favoriteItems = JSON.parse(localStorage.getItem("favoriteItems"));
    if (!favoriteItems) {
        favoriteItems = [];
    }
    return favoriteItems;
}
export function getFavoritesAmount() {
    return getFavoritesItems().length;
}
export function renderUserBlock(userName, avatar, favoriteItemsAmount) {
    const user = {
        username: userName,
        avatarUrl: avatar,
    };
    const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : "ничего нет";
    const hasFavoriteItems = favoriteItemsAmount ? true : false;
    localStorage.setItem("user", JSON.stringify(user));
    function getUserData() {
        const store = JSON.parse(localStorage.getItem("user"));
        if (typeof store === "object" &&
            "username" in store &&
            "avatarUrl" in store) {
            return store;
        }
        console.log(store);
    }
    getUserData();
    getFavoritesAmount();
    renderBlock("user-block", `
    <div class="header-container">
      <img class="avatar" src=${avatar} alt=${userName} />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? " active" : ""}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `);
}
