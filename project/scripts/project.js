
"use strict";

// First 20 chemical elements
const elements = [
    { number: 1, symbol: "H", name: "Hydrogen", description: "Hydrogen is the lightest element and the most abundant element in the universe." },
    { number: 2, symbol: "He", name: "Helium", description: "Helium is a noble gas commonly used in balloons and scientific equipment." },
    { number: 3, symbol: "Li", name: "Lithium", description: "Lithium is a lightweight metal widely used in rechargeable batteries." },
    { number: 4, symbol: "Be", name: "Beryllium", description: "Beryllium is a lightweight, strong metal used in specialized aerospace applications." },
    { number: 5, symbol: "B", name: "Boron", description: "Boron is a metalloid used in heat-resistant glass and other materials." },
    { number: 6, symbol: "C", name: "Carbon", description: "Carbon is essential to living organisms and forms an enormous variety of compounds." },
    { number: 7, symbol: "N", name: "Nitrogen", description: "Nitrogen makes up most of Earth's atmosphere and is essential for life." },
    { number: 8, symbol: "O", name: "Oxygen", description: "Oxygen is essential for human respiration and is a component of water." },
    { number: 9, symbol: "F", name: "Fluorine", description: "Fluorine is a highly reactive nonmetal used in many chemical compounds." },
    { number: 10, symbol: "Ne", name: "Neon", description: "Neon is a noble gas known for its use in illuminated signs." },
    { number: 11, symbol: "Na", name: "Sodium", description: "Sodium is a reactive metal found in compounds such as table salt." },
    { number: 12, symbol: "Mg", name: "Magnesium", description: "Magnesium is a lightweight metal and an essential nutrient." },
    { number: 13, symbol: "Al", name: "Aluminium", description: "Aluminium is a lightweight metal used in packaging, vehicles, and construction." },
    { number: 14, symbol: "Si", name: "Silicon", description: "Silicon is a semiconductor widely used in electronics and computer chips." },
    { number: 15, symbol: "P", name: "Phosphorus", description: "Phosphorus is essential for DNA, bones, and cellular energy transfer." },
    { number: 16, symbol: "S", name: "Sulfur", description: "Sulfur is a nonmetal used in fertilizers and many industrial processes." },
    { number: 17, symbol: "Cl", name: "Chlorine", description: "Chlorine is used in water treatment and the manufacture of many chemicals." },
    { number: 18, symbol: "Ar", name: "Argon", description: "Argon is a noble gas used in welding and certain types of lighting." },
    { number: 19, symbol: "K", name: "Potassium", description: "Potassium is an essential nutrient involved in nerve and muscle function." },
    { number: 20, symbol: "Ca", name: "Calcium", description: "Calcium is important for bones, teeth, and many biological processes." }
];

const storageKey = "insideTheAtomSavedAtoms";

// Shared footer
function updateFooter() {
    const yearElement = document.querySelector("#currentyear");
    const modifiedElement = document.querySelector("#lastModified");

    if (yearElement) {
        yearElement.textContent = `${new Date().getFullYear()}`;
    }

    if (modifiedElement) {
        modifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }
}

// Mobile navigation
function setupNavigation() {
    const menuButton = document.querySelector("#menu-button");
    const navigation = document.querySelector("#primary-navigation");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", `${isOpen}`);
        menuButton.setAttribute(
            "aria-label",
            `${isOpen ? "Close" : "Open"} navigation menu`
        );
        menuButton.textContent = isOpen ? "✕" : "☰";
    });
}

// Find an element using its atomic number
function findElement(protons) {
    return elements.find((element) => element.number === protons);
}

// Calculate the selected atom's properties
function calculateAtom(protons, neutrons, electrons) {
    const element = findElement(protons);
    const massNumber = protons + neutrons;
    const charge = protons - electrons;

    let classification = "Neutral Atom";

    if (charge > 0) {
        classification = "Positive Ion (Cation)";
    } else if (charge < 0) {
        classification = "Negative Ion (Anion)";
    }

    return {
        protons,
        neutrons,
        electrons,
        element,
        massNumber,
        charge,
        classification
    };
}

// Educational visual representation
function renderAtomVisual(atom) {
    const visual = document.querySelector("#atom-visual");

    if (!visual) {
        return;
    }

    // Simplified visual model, not a quantum orbital diagram.
    const displayedElectrons = Math.min(atom.electrons, 20);

    const electronDots = Array.from(
        { length: displayedElectrons },
        (_, index) => {
            const angle = (2 * Math.PI * index) /
                Math.max(displayedElectrons, 1);

            const radius = 35;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);

            return `
                <span class="electron-dot"
                    style="left: ${x}%; top: ${y}%;"
                    aria-hidden="true"></span>
            `;
        }
    ).join("");

    visual.innerHTML = `
        <div class="electron-orbit" aria-hidden="true"></div>
        <div class="atom-nucleus">
            <span>${atom.element.symbol}</span>
        </div>
        ${electronDots}
    `;

    visual.setAttribute(
        "aria-label",
        `${atom.element.name} model with ${atom.protons} protons, ${atom.neutrons} neutrons, and ${atom.electrons} electrons`
    );
}

// Display calculation results
function displayAtom(atom) {
    const elementName = document.querySelector("#element-name");
    const atomicNumber = document.querySelector("#atomic-number");
    const massNumber = document.querySelector("#mass-number");
    const netCharge = document.querySelector("#net-charge");
    const classification = document.querySelector("#atom-classification");
    const description = document.querySelector("#atom-description");

    elementName.textContent = `${atom.element.name} (${atom.element.symbol})`;
    atomicNumber.textContent = `${atom.protons}`;
    massNumber.textContent = `${atom.massNumber}`;
    netCharge.textContent = `${atom.charge > 0 ? "+" : ""}${atom.charge}`;
    classification.textContent = `${atom.classification}`;
    description.textContent = `${atom.element.description}`;

    renderAtomVisual(atom);
}

// Retrieve saved atoms
function getSavedAtoms() {
    try {
        const saved = JSON.parse(localStorage.getItem(storageKey));

        return Array.isArray(saved) ? saved : [];
    } catch (error) {
        console.warn("Unable to read saved atoms.", error);
        return [];
    }
}

// Save atoms in localStorage
function storeSavedAtoms(atoms) {
    try {
        localStorage.setItem(storageKey, JSON.stringify(atoms));
        return true;
    } catch (error) {
        console.warn("Unable to save atoms.", error);
        return false;
    }
}

// Display saved atom cards
function renderSavedAtoms() {
    const container = document.querySelector("#saved-atoms");

    if (!container) {
        return;
    }

    const savedAtoms = getSavedAtoms();

    if (savedAtoms.length === 0) {
        container.innerHTML = `
            <p class="empty-message">
                You have not saved any atoms yet.
            </p>
        `;
        return;
    }

    container.innerHTML = savedAtoms.map((atom, index) => `
        <article class="saved-atom-card">
            <h3>${atom.element.name} (${atom.element.symbol})</h3>
            <p>Protons: ${atom.protons}</p>
            <p>Neutrons: ${atom.neutrons}</p>
            <p>Electrons: ${atom.electrons}</p>
            <p>Mass Number: ${atom.massNumber}</p>
            <p>Net Charge: ${atom.charge > 0 ? "+" : ""}${atom.charge}</p>
            <button type="button"
                class="remove-atom"
                data-index="${index}"
                aria-label="Remove saved ${atom.element.name} atom">
                Remove
            </button>
        </article>
    `).join("");
}

// Initialize the atom builder
function setupAtomBuilder() {
    const form = document.querySelector("#atom-form");

    if (!form) {
        return;
    }

    const saveButton = document.querySelector("#save-atom");
    const clearButton = document.querySelector("#clear-saved");
    const savedContainer = document.querySelector("#saved-atoms");
    const saveMessage = document.querySelector("#save-message");

    let currentAtom = calculateAtom(6, 6, 6);

    function readAtomForm() {
        const protons = Number(form.elements.protons.value);
        const neutrons = Number(form.elements.neutrons.value);
        const electrons = Number(form.elements.electrons.value);

        const valid = (
            Number.isInteger(protons) &&
            Number.isInteger(neutrons) &&
            Number.isInteger(electrons) &&
            protons >= 1 &&
            protons <= 20 &&
            neutrons >= 0 &&
            neutrons <= 30 &&
            electrons >= 0 &&
            electrons <= 30
        );

        if (!valid) {
            return null;
        }

        return calculateAtom(protons, neutrons, electrons);
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        const atom = readAtomForm();

        if (!atom) {
            saveMessage.textContent = "Please enter valid particle numbers.";
            return;
        }

        currentAtom = atom;
        displayAtom(currentAtom);
        saveMessage.textContent = "";
    });

    form.addEventListener("reset", () => {
        currentAtom = calculateAtom(6, 6, 6);
        displayAtom(currentAtom);
        saveMessage.textContent = "";
    });

    saveButton.addEventListener("click", () => {
        const savedAtoms = getSavedAtoms();

        const alreadySaved = savedAtoms.some((atom) =>
            atom.protons === currentAtom.protons &&
            atom.neutrons === currentAtom.neutrons &&
            atom.electrons === currentAtom.electrons
        );

        if (alreadySaved) {
            saveMessage.textContent = "This atom is already saved.";
            return;
        }

        savedAtoms.push(currentAtom);

        if (storeSavedAtoms(savedAtoms)) {
            saveMessage.textContent = "Atom saved successfully!";
            renderSavedAtoms();
        } else {
            saveMessage.textContent = "Unable to save this atom.";
        }
    });

    savedContainer.addEventListener("click", (event) => {
        const removeButton = event.target.closest(".remove-atom");

        if (!removeButton) {
            return;
        }

        const index = Number(removeButton.dataset.index);
        const savedAtoms = getSavedAtoms();

        if (!Number.isInteger(index) ||
            index < 0 ||
            index >= savedAtoms.length) {
            return;
        }

        savedAtoms.splice(index, 1);

        if (storeSavedAtoms(savedAtoms)) {
            renderSavedAtoms();
            saveMessage.textContent = "Saved atom removed.";
        } else {
            saveMessage.textContent = "Unable to remove saved atom.";
        }
    });

    clearButton.addEventListener("click", () => {
        if (storeSavedAtoms([])) {
            renderSavedAtoms();
            saveMessage.textContent = "All saved atoms have been cleared.";
        } else {
            saveMessage.textContent = "Unable to clear saved atoms.";
        }
    });

    displayAtom(currentAtom);
    renderSavedAtoms();
}

// Start website features
updateFooter();
setupNavigation();
setupAtomBuilder();
