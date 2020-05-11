const carouselTimer = 5000;
let carouselRunning = false;
let carouselInterval = null;
let currentCarouselPosition = 0;
const carouselShowImageInfo = false;
const headerDetachPosition = Math.floor(document.querySelector('.page-header').getBoundingClientRect().height) - Math.floor(document.querySelector('.page-navigation').getBoundingClientRect().height);
const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

// Carousel init
initCarousel();

// Page header init
initPageHeader();

// Carousel indicator click
const indicatorContainer = document.querySelector('#carousel-page-indicator');
const indicators = document.querySelectorAll('#carousel-page-indicator .indicator');
let indicatorTitle = '';

for (const indicator of indicators) {
    indicator.addEventListener('click', (event) => {
        clearInterval(carouselInterval);

        currentCarouselPosition = parseInt(event.target.getAttribute('data-index'));

        // Start the carousel if scrolled top
        if (window.scrollY < headerDetachPosition) {
            startCarousel();
        } else {
            showCarouselItem();
        }
    }, false);

    indicator.addEventListener('mouseenter', (event) => {
        indicatorTitle = event.target.getAttribute('data-title');
        document.querySelector('#carousel-page-indicator .indicator__title').innerHTML = indicatorTitle;
    }, false);
}

// Scrolling page
document.addEventListener('scroll', (event) => {
    initPageHeader();
})

// lazySizes options
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.loadHidden = false;
window.lazySizesConfig.requireJs = function (modules, cb) {
    window.require(modules, cb);
};

// lazySizes background image support
document.addEventListener('lazybeforeunveil', function (e) {
    var bg = e.target.getAttribute('data-bg');
    if (bg) {
        e.target.style.backgroundImage = 'url(' + bg + ')';
    }
});
