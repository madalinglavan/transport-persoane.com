// Burger menu
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
    if (!header.contains(event.target) && !event.target.closest('#burger-menu')) {
        menu.classList.remove('active');
        burgerMenu.classList.remove('active');
        closeAllSubmenus();
    }
});

// Funcție pentru a închide toate submeniurile
function closeAllSubmenus() {
    document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.style.display = 'none'; // Ascunde toate submeniurile
    });

    // Elimină clasa 'active' de la toate meniurile
    document.querySelectorAll('.menu li').forEach(menuItem => {
        menuItem.classList.remove('active');
    });
}

// Funcție pentru a controla deschiderea și închiderea submeniurilor
function toggleSubmenu(id) {
    const menuItem = document.getElementById(id);
    const submenu = menuItem.querySelector('.submenu');

    // Dacă submeniul curent este deja deschis, îl închidem
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
        menuItem.classList.remove('active'); // Resetează iconița
    } else {
        // Închide toate celelalte submeniuri înainte de a deschide cel curent
        closeAllSubmenus();

        // Afișează submeniul curent
        submenu.style.display = 'block';
        menuItem.classList.add('active'); // Rotește iconița
    }
}

// Adaugă evenimentele pentru toate secțiunile cu submeniuri
['transport-persoane', 'transport-colete', 'retele-sociale', 'contact'].forEach(id => {
    document.getElementById(id).addEventListener('click', function(event) {
        toggleSubmenu(id); // Afișează sau închide submeniul selectat
        event.stopPropagation(); // Previne închiderea meniului în afara secțiunii
        event.preventDefault();  // Previne navigarea accidentală
    });
});

// Închide meniul burger și submeniurile atunci când este selectat un link din submeniuri
const submenuLinks = document.querySelectorAll('.submenu li a');
submenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Închide meniul burger
        menu.classList.remove('active');
        burgerMenu.classList.remove('active');
        
        // Ascunde toate submeniurile
        closeAllSubmenus();
    });
});

// Închide meniul burger când se face clic în afara acestuia
document.addEventListener('click', (event) => {
    if (!header.contains(event.target) && !event.target.closest('#burger-menu')) {
        menu.classList.remove('active');
        burgerMenu.classList.remove('active');
        closeAllSubmenus();
    }
});

// Selectează toate elementele care au submeniu
document.querySelectorAll('#menu li').forEach(function(menuItem) {
    menuItem.addEventListener('click', function() {
        // Închide alte submeniuri
        document.querySelectorAll('#menu li').forEach(function(item) {
            if (item !== menuItem) {
                item.classList.remove('open');
            }
        });

        // Toggle pentru deschiderea/închiderea submeniului curent
        menuItem.classList.toggle('open');
    });
});

// Previne propagarea click-ului pe linkurile din submeniu
document.querySelectorAll('.submenu a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.stopPropagation();  // Oprește propagarea evenimentului
    });
});
