const carouselTimer = 5000;
let carouselRunning = false;
let carouselInterval = null;
let currentCarouselPosition = 0;
const carouselShowImageInfo = false;
const headerDetachPosition = Math.floor(document.querySelector('.page-header').getBoundingClientRect().height) - Math.floor(document.querySelector('.page-navigation').getBoundingClientRect().height);
const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

// Carousel init
initCarousel(currentCarouselPosition);

// Start the carousel
startCarousel();

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
    const header = document.querySelector('.page-header');

    // Scroll positions
    if (window.scrollY > headerDetachPosition) {
        // Scrolled down below detach position
        header.classList.remove('takeoff');
        header.classList.add('detached');

        if (carouselRunning) {
            stopCarousel();
        }
    } else if (window.scrollY > 0 && window.scrollY < headerDetachPosition) {
        // Starting scroll and still above detach position
        // Takeoff!!
        header.classList.remove('detached');
        header.classList.add('takeoff');

        if (!carouselRunning) {
            startCarousel();
        }
    } else {
        // Top
        header.classList.remove('takeoff', 'detached');

        if (!carouselRunning) {
            startCarousel();
        }
    }
})

// lazySizes options
window.lazySizesConfig = window.lazySizesConfig || {};
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
