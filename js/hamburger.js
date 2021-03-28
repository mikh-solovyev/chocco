const hamburger = {
    btn: document.querySelector(".hamburger"),
    close: document.querySelector(".menu__close"),
    menu: document.querySelector(".menu_type_hamburger")
};

/**
 * Обработчик открытия меню
 */
hamburger.btn.addEventListener("click", () => {
    hamburger.menu.classList.add("menu_active");
    changeScroll();
});

/**
 * Обработчик закрытия меню
 */
hamburger.close.addEventListener("click", () => {
    hamburger.menu.classList.remove("menu_active");
    changeScroll();
});
