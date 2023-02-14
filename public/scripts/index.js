import { renderSearchFormBlock } from "./search-form.js";
import { renderSearchResultsBlock, renderSearchStubBlock } from "./search-results.js";
import { getFavoritesAmount, renderUserBlock } from "./user.js";
// import { renderToast } from "./lib.js"
if (typeof window !== undefined && window && window.addEventListener) {
    window.addEventListener("DOMContentLoaded", () => {
        const today = new Date();
        const dateIn = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const dateOut = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);
        renderUserBlock("Eva Berdash", "/img/avatar.png", getFavoritesAmount());
        renderSearchFormBlock(dateIn, dateOut);
        renderSearchStubBlock();
        // renderToast(
        //   {
        //     text: "Это пример уведомления. Используйте его при необходимости",
        //     type: "success",
        //   },
        //   {
        //     name: "Понял",
        //     handler: () => {
        //       console.log("Уведомление закрыто");
        //     },
        //   }
        // );
        renderSearchResultsBlock();
    });
}
else {
    console.log("This is not browser!");
}
