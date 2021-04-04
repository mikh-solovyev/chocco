let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
        center: [55.643344, 37.744528],
        zoom: 15,
        controls: []
    });

    const coords = [
        [55.64180353134756, 37.745141740753134],
        [55.64357317994271, 37.73744352877173],
        [55.64896234819763, 37.74507361433981],
        [55.64985062283247, 37.76998777555326]
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageSize: [46, 57],
        iconImageOffset: [-35, -52],
        iconImageHref: "./images/icons/marker.svg",
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');

};

ymaps.ready(init);

