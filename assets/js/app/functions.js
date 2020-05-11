/**
 * Initializing the page header
 */
const initPageHeader = () => {
    const header = document.querySelector('.page-header');

    // Scroll positions
    if (window.scrollY > headerDetachPosition) {
        // Scrolled down below detach position
        header.classList.remove('takeoff');
        header.classList.add('detached');

        if (carouselWrapper) {
            if (carouselRunning) {
                stopCarousel();
            }
        }
    } else if (window.scrollY > 0 && window.scrollY < headerDetachPosition) {
        // Starting scroll and still above detach position
        // Takeoff!!
        header.classList.remove('detached');
        header.classList.add('takeoff');

        if (carouselWrapper) {
            if (!carouselRunning) {
                startCarousel();
            }
        }
    } else {
        // Top
        header.classList.remove('takeoff', 'detached');

        if (carouselWrapper) {
            if (!carouselRunning) {
                startCarousel();
            }
        }
    }
}

/**
 * Initializing the carousel
 */
const initCarousel = () => {
    const carousel = document.querySelector('#carousel');

    // Populating carousel items
    if (carouselItems) {
        const carouselItemCount = carouselItems.length;

        carouselItems.map((item, key) => {
            const listElement = document.createElement('li');

            // Setting CSS classes
            listElement.classList.add('carousel-item', 'lazyload');

            if (currentCarouselPosition === key) {
                listElement.classList.add('active');
            } else {
                listElement.classList.add('hide');
            }

            // Carousel item index
            listElement.setAttribute('data-carousel-item-index', key);
            listElement.setAttribute('data-bg', `/assets/img/photos/hero/${item.img}`);

            // Carousel image info
            if (carouselShowImageInfo) {
                const infoElement = document.createElement('div');
                infoElement.classList.add('carousel-info');
                infoElement.style.textShadow = `1px 1px 0 ${item.secondaryColor};`;

                if (item.title && item.title !== '') {
                    const titleElement = document.createElement('div');
                    titleElement.classList.add('carousel-info__title');
                    const title = document.createTextNode(item.title);
                    titleElement.appendChild(title);
                    infoElement.appendChild(titleElement);
                }

                if (item.note && item.note !== '') {
                    const noteElement = document.createElement('div');
                    noteElement.classList.add('carousel-info__note');
                    const note = document.createTextNode(item.note);
                    noteElement.appendChild(note);
                    infoElement.appendChild(noteElement);
                }

                if (item.photographer && item.photographer !== '') {
                    const photographerElement = document.createElement('div');
                    photographerElement.classList.add('carousel-info__photographer');
                    const photographer = document.createTextNode(item.photographer);
                    photographerElement.appendChild(photographer);
                    infoElement.appendChild(photographerElement);
                }

                // Adding the info element to the list item
                listElement.appendChild(infoElement);
            }

            if (listElement) {
                carousel.append(listElement);
            }

            // Indicators
            if (carouselItemCount > 1) {
                const indicator = document.createElement('div');

                indicator.classList.add('indicator');
                indicator.setAttribute('data-index', key);
                indicator.setAttribute('data-title', item.title);

                if (currentCarouselPosition === key) {
                    indicator.classList.add('active');
                }

                document.querySelector('#carousel-page-indicator').appendChild(indicator);
            }
        });
    }
}

/**
 * Start the carousel
 */
const startCarousel = () => {
    // Fixing bug on mobile where nav doesn't inherit color
    if (isMobile) {
        const navItems = document.querySelectorAll('#page-header .nav-item a');
        for (const navItem of navItems) {
            navItem.style.color = carouselItems[currentCarouselPosition].primaryColor;
        };
    }

    // Show the current carousel item
    showCarouselItem();

    // Starting the carousel autoplay
    if (carouselTimer > 0) {
        carouselRunning = true;
        carouselInterval = setInterval(() => {
            showCarouselItem();
        }, carouselTimer);
    }
}

/**
 * Stop the carousel
 */
const stopCarousel = () => {
    clearInterval(carouselInterval);
    carouselRunning = false;
}

/**
 * Reset the carousel timer indicator
 */
const resetCarouselTimerIndicator = () => {
    const progressBar = document.querySelector('#carousel-progress__progress-bar');
    progressBar.setAttribute.style.minWidth = 0;
}

/**
 * Show the current carousel item
 */
const showCarouselItem = () => {
    // Hides the current active item
    const carouselActiveElement = document.querySelector('.carousel .active');
    if (carouselActiveElement) {
        carouselActiveElement.classList.add('hide');
        carouselActiveElement.classList.remove('active');
    }

    // Shows the next item
    const carouselNextElement = document.querySelector(`.carousel-item[data-carousel-item-index="${currentCarouselPosition}"]`);
    if (carouselNextElement) {
        carouselNextElement.classList.remove('hide');
        carouselNextElement.classList.add('active');
    }

    // Update the indicator
    const carouselCurrentActiveIndicator = document.querySelector('#carousel-page-indicator .indicator.active');
    const carouselNextIndicator = document.querySelectorAll('#carousel-page-indicator .indicator')[currentCarouselPosition];
    if (carouselCurrentActiveIndicator) {
        carouselCurrentActiveIndicator.classList.remove('active');
    }
    if (carouselNextIndicator) {
        carouselNextIndicator.classList.add('active');
    }

    // Set header color
    document.querySelector('#page-header').style.color = carouselItems[currentCarouselPosition].primaryColor;
    document.querySelector('#page-header .logotype--nav').style.fill = carouselItems[currentCarouselPosition].primaryColor;

    // Hero mobile 100vh fix
    if (isMobile) {
        setTimeout(() => {
            document.querySelector('.page-header--full').style.height = `${window.innerHeight}px`;
        }, 0);
    }

    // Carousel indicators
    const currentImageTitle = (document.querySelectorAll('#carousel-page-indicator .indicator')[currentCarouselPosition]) ? document.querySelectorAll('#carousel-page-indicator .indicator')[currentCarouselPosition].getAttribute('data-title') : null;
    const indicators = document.querySelectorAll('#page-header .carousel-page-indicator .indicator');
    for (const indicator of indicators) {
        indicator.style.borderColor = carouselItems[currentCarouselPosition].primaryColor;
        if (indicator.classList.contains('active')) {
            indicator.style.backgroundColor = carouselItems[currentCarouselPosition].primaryColor;
        } else {
            indicator.style.backgroundColor = '';
        }
    }
    document.querySelector('#carousel-page-indicator .indicator__title').innerHTML = currentImageTitle;

    currentCarouselPosition = (currentCarouselPosition + 1 >= carouselItems.length) ? 0 : currentCarouselPosition += 1;
}

/**
 * Initializing all buttons with a data-href attribute
 */
const initButtons = () => {
    const buttons = document.querySelectorAll('button[data-href]');
    for (const button of buttons) {
        button.addEventListener('click', (event) => {
            const url = button.getAttribute('data-href');
            document.location.href = url;
        });
    }
}
