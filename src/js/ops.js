// Нужные константы
const wrapper = document.querySelector(".wrapper");
const section = document.querySelectorAll("section");
const display = document.querySelector(".maincontent");
const sideMenu = document.querySelector(".fixed-menu");
const sideMenuItems = sideMenu.querySelectorAll(".fixed-menu__item");
const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();
const scrollLink = document.querySelectorAll(`[data-scroll-to]`);
let inScroll = false;

// Добавляем первой секции активный класс
section[0].classList.add("active");

/**
 * Функция расчета позиции смещения
 * @param sectionIndex
 * @returns {number}
 */
const countSectionPosition = sectionIndex => {
    const position = sectionIndex * -100;

    if (isNaN(position)) {
        console.error("Не число !!");
        return 0;
    }

    return sectionIndex * -100;
};

/**
 * Функция смены класса на фиксированном меню
 * @param itemIndex
 * @param activeClass
 */
const resetActiveClass = (itemIndex, activeClass) => {
    sideMenuItems.forEach((item, index) => {
        item.classList.remove(activeClass);

        if (index === itemIndex)
            item.classList.add(activeClass);
    });
}

/**
 * Функция смены темы фиксированного меню
 * @param sectionIndex
 */
const changeMenuTheme = sectionIndex => {
    const curSection = section[sectionIndex];
    const menuTheme = curSection.dataset.switherTheme;
    const themeClass = "fixed-menu_theme--dark";

    if (menuTheme === "black") {
        sideMenu.classList.add(themeClass);
    } else {
        sideMenu.classList.remove(themeClass);
    }
};

/**
 * Обработка событий на навигационные элементы
 */
scrollLink.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        const _this = e.currentTarget;
        const target = _this.dataset.scrollTo;
        const reqSection = document.querySelector(`[data-section-id=${target}]`);
        const index = [...section].indexOf(reqSection);

        performTransition(index);
    });
})


/**
 * Основная функция сдвига к нужному блоку
 * @param sectionIndex
 */
const performTransition = sectionIndex => {
    if (inScroll) return;

    const transitionOver = 1000;
    const mouseInertiaOver = 300;

    inScroll = true;
    const position = countSectionPosition(sectionIndex);

    display.style.transform = `translateY(${position}%)`;

    section.forEach((item) => {
        item.classList.remove('active');
    });

    section[sectionIndex].classList.add("active");

    changeMenuTheme(sectionIndex);

    setTimeout(() => {
        inScroll = false;
        resetActiveClass(sectionIndex, "fixed-menu__item_active");
    }, transitionOver + mouseInertiaOver);

};

/**
 * Метод возвращает функции для направления сдвига
 * @returns {{next(): void, prev(): void}}
 */
const viewportScroller = () => {

    const activeSection = {};

    section.forEach((item, index) => {
        if (item.classList.contains("active")) {
            activeSection.element = item;
            activeSection.index = index;
        }
    });

    const nextSection = activeSection.element.nextElementSibling;
    const prevSection = activeSection.element.previousElementSibling;

    return {
        next() {
            if (nextSection) {
                performTransition(activeSection.index + 1);
            }
        },
        prev() {
            if (prevSection) {
                performTransition(activeSection.index - 1);
            }
        }
    };
}

/**
 * Обработка события скролла колесом
 */
window.addEventListener("wheel", (e) => {
    const deltaY = e.deltaY;
    const scroller = viewportScroller();

    if (deltaY > 0) {
        scroller.next();
    }

    if (deltaY < 0) {
        scroller.prev();
    }
});

/**
 * Обработка события нажатия на кнопки вверх и вниз
 */
window.addEventListener("keydown", (e) => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInputs = tagName === "input" || tagName === "textarea";
    if (userTypingInInputs) return;

    const scroller = viewportScroller();

    switch (e.keyCode) {
        case 38:
            scroller.prev();
            break;
        case 40:
            scroller.next();
            break;
    }
});

/**
 * Скролл на мобильниках
 */
if(isMobile) {

    // Запрещаем событие на мобильниках
    wrapper.addEventListener("touchmove", e => e.preventDefault());

    $(function () {
        $("body").swipe({
            //Generic swipe handler for all directions
            swipe: function (event, direction) {
                const scroller = viewportScroller();
                let scrollDirection = null;

                if(direction === "up") scrollDirection = "next";
                if(direction === "down") scrollDirection = "prev";
                scroller[scrollDirection]();

            }
        });
    });
}



