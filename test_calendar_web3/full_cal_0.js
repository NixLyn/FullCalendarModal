console.log("Full_Cal_0.js Plugged-In");

// Let's define each element in use

const selected_date = document.querySelector("#selected");
// We'll leave 'todays date' as the default: 
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${year}-${month}-${day}`;
console.log(currentDate);