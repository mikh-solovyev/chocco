let time;

// Навешиваем на боди класс для скрытие или показа скролла
const changeScroll = function () {
    document.body.classList.toggle("hideScroll");
};

// Расчет позиции элементов при ресайзе
window.addEventListener("resize", (e) => {
    if(time) clearTimeout(time);

    time = setTimeout(() => {
        setPosItemForMobile();
    }, 500);
});