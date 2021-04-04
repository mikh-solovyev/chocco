const slider = $('.sliders__list').bxSlider({
    pager: false,
    controls: false
});

$(".sliders__controls_type_prev").on("click", (e) => {
    e.preventDefault();
    slider.goToPrevSlide();
});

$(".sliders__controls_type_next").on("click", (e) => {
    e.preventDefault();
    slider.goToNextSlide();
});