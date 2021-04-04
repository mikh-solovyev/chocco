const tabsSwitcher = document.querySelectorAll(".reviews__switcher-item");
const tabsContent = document.querySelectorAll(".reviews__item");
const authorName = document.querySelector(".app-reviews-author");

/**
 * Функция смены имени на мобильной версии
 * @param element
 */
const setAuthor = (element) => {
    const name = element.querySelector(".reviews__author").innerText;
    authorName.innerText = name;
};

/**
 * Функция показа конкретного таба по индексу
 * @param index
 */
const showTabs = (index) => {
    // Убираем всем активный класс
    tabsContent.forEach((item) => {
        item.classList.remove("active");
    });

    // Устанавливаем тому, кому нужно по индексу
    tabsContent[index].classList.add("active");
};


/**
 * Функция переключения на активный элемент
 * @param _this
 */
const changeSwitcher = (_this) => {
    // Убираем активный класс у всех элементов
    tabsSwitcher.forEach((item) => {
        item.classList.remove("interactive-avatar_active");
    });

    // Добавляем активный класс на элемент, который нажали
    _this.classList.add("interactive-avatar_active");
};

/**
 * Основная функция для смены таба
 * @param e
 */
const changeTabs = (e) => {
    e.preventDefault();

    const _this = e.currentTarget;
    const index = _this.dataset.index;

    // Переключаем свитчер
    changeSwitcher(_this);

    // Переключаем слайд
    showTabs(index);

    // Изменяем имя автора на мобиле
    setAuthor(tabsContent[index]);
};


/**
 * Обработчик за табы
 */
if(tabsSwitcher.length) {
    tabsSwitcher.forEach((item) => {
        item.addEventListener("click", changeTabs);
    });
}


