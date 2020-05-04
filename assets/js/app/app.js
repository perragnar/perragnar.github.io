const carouselTimer = 5000;
let carouselRunning = false;
let carouselInterval = null;
let currentCarouselPosition = 0;
const carouselShowImageInfo = false;
const headerDetachPosition = Math.floor(document.querySelector('.page-header').getBoundingClientRect().height) - Math.floor(document.querySelector('.page-navigation').getBoundingClientRect().height);
const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

const carouselItems = [
    {
        img: 'PRE_2081.jpg',
        title: 'Stairway',
        note: '',
        photographer: 'Per Ragnar Edin',
        color: {
            primary: '#ffffff',
            secondary: 'rgba(0, 0, 0, .5)'
        }
    },
    {
        img: '2020-03-27-6.jpg',
        title: 'Sunset and the tree',
        note: '',
        photographer: 'Per Ragnar Edin',
        color: {
            primary: '#ffffff',
            secondary: 'rgba(0, 0, 0, .5)'
        }
    },
    {
        img: 'PRE_2290.jpg',
        title: 'Contrast',
        note: '',
        photographer: 'Per Ragnar Edin',
        color: {
            primary: '#ffffff',
            secondary: 'rgba(0, 0, 0, .5)'
        }
    },
    {
        img: '2020-02-23-17.jpg',
        title: 'Kapplasse cliffs',
        note: 'This is a note',
        photographer: 'Per Ragnar Edin',
        color: {
            primary: '#ffffff',
            secondary: 'rgba(0, 0, 0, .5)'
        },
    },
    {
        img: '2020-03-06-3.jpg',
        title: 'The old house',
        note: 'This is a note',
        photographer: 'Per Ragnar Edin',
        color: {
            primary: '#333333',
            secondary: '#ffffff'
        }
    },
    {
        img: '2019-12-23-6.jpg',
        title: 'Välliste',
        note: 'This is a note',
        photographer: 'Per Ragnar Edin',
        color: {
            primary: '#ffffff',
            secondary: 'transparent'
        }
    },
];

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
    } else {
        // Top
        header.classList.remove('takeoff', 'detached');

        if (!carouselRunning) {
            startCarousel();
        }
    }
})

// Contact buttos
const contactButtons = document.querySelectorAll('.contact-options .button');
for (const contactButton of contactButtons) {
    contactButton.addEventListener('click', (event) => {
        const url = contactButton.getAttribute('data-href');
        document.location.href = url;
    });
}

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
