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
