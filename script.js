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
['transport-persoane', 'transport-colete','contact'].forEach(id => {
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


document.querySelectorAll('.rezerva-button').forEach(button => {
    button.addEventListener('click', function() {
      window.location.href = "tel:+40774537259";  // Inițiază apelul către numărul de telefon
    });
  });


  //skills
//skills
const skills = [
    { name: 'SERIOZITATE', level: '100%' },
    { name: 'COMFORT', level: '100%' },
    { name: 'EFICIENTA', level: '100%' },
];

const skillsContainer = document.getElementById('skills-container');

function displaySkills() {
    skills.forEach(skill => {
        const skillElement = createSkillElement(skill);
        skillsContainer.appendChild(skillElement);
    });
}

function createSkillElement(skill) {
    const skillElement = document.createElement('div');
    skillElement.classList.add('skill');
    skillElement.innerHTML = `
        <h3>${skill.name}</h3>
        <div class="level" data-level="${skill.level}">
            <span class="percentage">0%</span>
        </div>
    `;
    return skillElement;
}

function animateSkill(skillElement) {
    const levelElement = skillElement.querySelector('.level');
    const percentageElement = skillElement.querySelector('.percentage');
    const skillLevel = parseInt(levelElement.dataset.level, 10);
    let width = 0;
    const increment = 5; // Increment percentage by 5 at each step
    const interval = 10; // Set interval to 10 milliseconds

    const intervalId = setInterval(() => {
        if (width >= skillLevel) {
            clearInterval(intervalId);
            width = skillLevel; // Ensure final width matches skillLevel
        } else {
            width += increment;
            if (width > skillLevel) {
                width = skillLevel; // Prevent width from exceeding skillLevel
            }
            levelElement.style.width = width + '%';
            percentageElement.textContent = width + '%';
        }
    }, interval);
}

displaySkills();

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkill(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill').forEach(skill => {
    observer.observe(skill);
});

//statistici
document.addEventListener("DOMContentLoaded", function() {
    const statsSection = document.getElementById('statistics');
    const stats = document.querySelectorAll('.number');
    let hasAnimated = false;

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function animateStats() {
        stats.forEach(stat => {
            const updateCount = () => {
                const target = +stat.getAttribute('data-target');
                const count = +stat.innerText.replace('+', '');

                const speed = 200; // Adjust this value for animation speed
                const increment = target / speed;

                if (count < target) {
                    stat.innerText = `+${Math.ceil(count + increment)}`;
                    setTimeout(updateCount, 10);
                } else {
                    stat.innerText = `+${target}`;
                }
            };

            updateCount();
        });
    }

    function checkAnimation() {
        if (isInViewport(statsSection) && !hasAnimated) {
            hasAnimated = true;
            animateStats();
        }
    }

    window.addEventListener('scroll', checkAnimation);
    window.addEventListener('resize', checkAnimation);
    checkAnimation(); // Initial check in case the section is already in view
});
