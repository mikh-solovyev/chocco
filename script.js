window.onload = function () {

    // Навешиваем на боди класс для скрытие или показа скролла
    const changeScroll = function () {
        document.body.classList.toggle("hideScroll");
    };

    const hamburger = {
        btn: document.querySelector(".humburger"),
        close: document.querySelector(".menu__close"),
        menu: document.querySelector(".menu_type_hamburger")
    };

    // Открытие меню
    hamburger.btn.addEventListener("click", () => {
        hamburger.menu.classList.add("menu_active");
        changeScroll();
    });

    // Закрытие меню
    hamburger.close.addEventListener("click", () => {
        hamburger.menu.classList.remove("menu_active");
        changeScroll();
    });
};