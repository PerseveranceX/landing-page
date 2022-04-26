/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

//Build the Nav

let sections = document.querySelectorAll("section[id *= section]");
let fragment = new DocumentFragment();

for (let i = 0; i < sections.length; i++) {
    let navItem = document.createElement("li");
    let section = sections[i].getAttribute("data-nav");
    navItem.innerHTML = `<a href="#" class="menu__link" data-nav="${section}">${section}</a>`;
    fragment.appendChild(navItem);
}

let nav = document.querySelector("ul");
nav.appendChild(fragment);

/*
 * Add the active class to the section visible in viewport, and remove it from the rest
 * Display/Hide the go to top button if the user has scrolled below the first section
 * Add the active class to the nav link corresponding to the section in the view port, and remove it from the rest
*/

const options = {
    root: null,
    threshold: 0.5
};

let anchors = document.querySelectorAll("a");
let button = document.querySelector(".to-top");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        let section = entry.target;
        section.classList.toggle("visible", entry.isIntersecting);
        if (entry.isIntersecting) {

            let sectionNumber = Number(section.id.substr(7, 1));
            if (sectionNumber >= 2) {
                button.classList.add("show-btn");
            }
            else if (sectionNumber == 1) {
                button.classList.remove("show-btn");
            }

            anchors.forEach(anchor => {
                anchor.classList.remove("link__active");
            });
            let anchor = document.querySelector(`a[data-nav='${section.getAttribute("data-nav")}']`);
            anchor.classList.add("link__active");
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

button.addEventListener("click", e => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});

// When a nav bar link is clicked, scroll to the corresponding section

anchors.forEach(anchor => {
    anchor.addEventListener("click", scrollToElement);
});

const scrollOptions = {
    behavior: "smooth",
    block: 'center'
};

function scrollToElement(event) {
    event.preventDefault();
    let sectionId = event.target.getAttribute("data-nav");
    let section = document.querySelector(`section[data-nav='${sectionId}']`);
    section.scrollIntoView(scrollOptions);
}