//burger menu
const burgerMenu = document.getElementById('burger-menu');
const menu = document.getElementById('menu');
const header = document.querySelector('header');

// Toggle menu visibility and burger icon
burgerMenu.addEventListener('click', (event) => {
    event.stopPropagation(); // Previne închiderea instantanee când se face click pe meniu
    menu.classList.toggle('active');
    burgerMenu.classList.toggle('active');
});

// Close menu when clicking outside of the header
document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) {
        menu.classList.remove('active');
        burgerMenu.classList.remove('active');
    }
});

//sectiuni
let currentSection = 1;
let startX = 0;
let endX = 0;

const container = document.querySelector('.container');

// Detectează începutul swipe-ului
document.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});

// Detectează sfârșitul swipe-ului și efectuează tranziția
document.addEventListener('touchend', (event) => {
    endX = event.changedTouches[0].clientX;

    // Detectează dacă swipe-ul este de la dreapta la stânga sau invers
    if (startX > endX + 50) {
        // Scroll dreapta
        currentSection = (currentSection === 1) ? 2 : 1;
        container.classList.toggle('scroll-right', currentSection === 2);
        container.classList.toggle('scroll-left', currentSection === 1);
    } else if (startX < endX - 50) {
        // Scroll stânga
        currentSection = (currentSection === 1) ? 2 : 1;
        container.classList.toggle('scroll-right', currentSection === 2);
        container.classList.toggle('scroll-left', currentSection === 1);
    }
});
