// Get Current Year

const currentYear = document.getElementById('currentyear');
const today = new Date();
const year = today.getFullYear();
currentYear.textContent = year;

// Last Modified

const lastModified = document.getElementById('lastModified');
lastModified.textContent = document.lastModified;
