const items = document.querySelectorAll(".product__link");
const close = document.querySelectorAll(".product__close");

/**
 * Функция расчета ширины
 * @param item
 * @returns {number}
 */
const mesureWidth = item => {
    const screenWidth = $(window).width();
    const itemWidth = item.offsetWidth;
    const itemsWidth = itemWidth * items.length;

    const isTablet= window.matchMedia("(max-width: 768px)").matches;
    const isMobile= window.matchMedia("(max-width: 480px)").matches;

    if(isTablet) {
        if(isMobile)
            return screenWidth - itemWidth;
        return  screenWidth - itemsWidth;
    } else {
        return  500;
    }
};

/**
 * Функция для скрытия всех элементов
 */
const hideEveryItems = () => {
    items.forEach((item) => {
        const container = item.parentElement;
        const content = container.querySelector(".product__content");

        container.classList.remove("active");
        content.style.width = 0;
    });
};

/**
 * Основной метод для открытия и закрытия пунктов
 * @param item
 */
const changeItemAcco = (item) => {
    const container = item.parentElement;
    const content = container.querySelector(".product__content");
    const textContainer = container.querySelector(".product__text");

    if(container.classList.contains("active")) {
        container.classList.toggle("active")
        content.style.width = 0;
    } else {
        hideEveryItems();
        container.classList.toggle("active")

        content.style.width = mesureWidth(item) + "px";
        textContainer.style.width = mesureWidth(item) + "px";
    }
};


/**
 * Навешиваем события на клик по пунктам
 */
if(items.length) {
    items.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();

            const curItem = e.currentTarget;
            changeItemAcco(curItem);
        });
    });
}

/**
 * Навешиваем события на клик закрывающему крестику
 */
if(close.length) {
    close.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();

            hideEveryItems();
        });
    });
}

const setPosItemForMobile = () => {
    let items = document.querySelectorAll(".product__link");
    const isMobile= window.matchMedia("(max-width: 480px)").matches;

    items = [...items].reverse();

    items.forEach((item, index) => {
        if(isMobile) {
            const position = index * -100;
            item.style.transform = 'translateX(' + position + '%)';
        } else {
            item.style.transform = 'translateX(0)';
        }
        

    });
}

setPosItemForMobile();