const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.classList.toggle("open");
});

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642.jpg"
    },
    {
        templeName: "Brasília Brazil",
        location: "Brasília, Brazil",
        dedicated: "2023, September, 17",
        area: 25000,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/brasilia-brazil-temple/brasilia-brazil-temple-39184.jpg"
    },
    {
        templeName: "Madrid Spain",
        location: "Madrid, Spain",
        dedicated: "1999, March, 19",
        area: 45800,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/madrid-spain-temple/madrid-spain-temple-68485.jpg"
    }
];

const templeContainer = document.querySelector("main");
const pageTitle = document.querySelector("h1");

function displayTemples(filteredTemples) {
    const oldGrid = document.querySelector(".temple-grid");

    if (oldGrid) {
        oldGrid.remove();
    }

    const templeGrid = document.createElement("div");
    templeGrid.classList.add("temple-grid");

    filteredTemples.forEach((temple) => {
        const card = document.createElement("section");
        const name = document.createElement("h2");
        const location = document.createElement("p");
        const dedication = document.createElement("p");
        const area = document.createElement("p");
        const image = document.createElement("img");

        name.textContent = temple.templeName;

        location.innerHTML = `<strong>Location:</strong> ${temple.location}`;
        dedication.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;
        area.innerHTML = `<strong>Size:</strong> ${temple.area} sq ft`;

        image.src = temple.imageUrl;
        image.alt = `${temple.templeName} Temple`;
        image.loading = "lazy";

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedication);
        card.appendChild(area);
        card.appendChild(image);

        templeGrid.appendChild(card);
    });

    templeContainer.appendChild(templeGrid);
}

displayTemples(temples);

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const filter = link.textContent;

        if (filter === "Home") {
            pageTitle.textContent = "Home";
            displayTemples(temples);
        } else if (filter === "Old") {
            pageTitle.textContent = "Old Temples";

            const oldTemples = temples.filter((temple) => {
                return parseInt(temple.dedicated.split(",")[0]) < 1900;
            });

            displayTemples(oldTemples);
        } else if (filter === "New") {
            pageTitle.textContent = "New Temples";

            const newTemples = temples.filter((temple) => {
                return parseInt(temple.dedicated.split(",")[0]) > 2000;
            });

            displayTemples(newTemples);
        } else if (filter === "Large") {
            pageTitle.textContent = "Large Temples";

            const largeTemples = temples.filter((temple) => {
                return temple.area > 90000;
            });

            displayTemples(largeTemples);
        } else if (filter === "Small") {
            pageTitle.textContent = "Small Temples";

            const smallTemples = temples.filter((temple) => {
                return temple.area < 10000;
            });

            displayTemples(smallTemples);
        }

        navigation.classList.remove("open");
        menuButton.classList.remove("open");
    });
});