console.log("Full_Cal_0.js Plugged-In");
let disabledDates = ['2023-05-07', '2023-05-17', '2023-05-27' ];
console.log("[TO_BE_DEACTIVATED]: ", disabledDates);


// Months of the year in an array
var monthNames = [ 
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// Set variables of HTML elements which we will be working with..
// Date-Selected, Year, Month, dates

const setDate = document.getElementById("selected");
const setDay = document.getElementById("set-day");
const setMonth = document.getElementById("currentMonth");
const setYear = document.getElementById("currentYear");




function getNextMonth(date) {
    console.log(date);
}

function getWeekNumber(date)
{                                    // January being the [v] Index..
    const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1)
                                        // And the first day [^] of that month
    console.log("[FIRST DAY OF THE YEAR]: ", firstDayOfTheYear);
}





/* The more correct way of getting things done around here */
/* We will dive into JS-OOP :~| */

class Day
{
    constructor(date=null, lang='default')
    {
        date = date ?? new Date();
        this.timestamp = date.getTime();
        this.Date = date;
        this.date = date.getDate();
        this.day = date.toLocaleString(lang, { weekday: 'long' });

        // Find Matching 'id'
        const this_day = document.getElementById(this.day);

        // Set Heading: 
        console.log("[*****]");

        const today = document.getElementById(this.day).innerHTML;
        console.log(today);

        // HighLight That 'Id' innerHTML > ParentElement
        /* STYLE CURRENT WEEK_DAY */
        this_day.style.background = "linear-gradient(120deg, rgba(0, 255, 255, 0.132), rgba(0, 0, 255, 0.13))";
        this_day.style.borderRadius = "20px";
        this_day.style.paddingLeft = "10px";
        this_day.style.paddingRight = "10px";

        const inner_style = "<h1 style='color: grey;'>"+ today +"</h1>";
        this_day.innerHTML = inner_style;
        /* STYLE CURRENT WEEK_DAY */

        console.log("[*****]");




        this.dayNumber = date.getDay() + 1;
        // Find Matching Number 

        // &&

        // Edit Element

        this.dayShort = date.toLocaleString(lang, { weekday: 'short' });
        console.log("[Day_Short]: ", this.dayShort);
        // ^ Day of the week


        console.log("[Day_Long]: ", this.dayNumber);
        // Assign Day to be HighLighted on Calander:







        this.monthLong = date.toLocaleString(lang, { month: 'long' });
        console.log("[Month_Long]: ", this.monthLong);
        // Assign Current Month:
        setMonth.innerHTML = this.monthLong;


        this.monthShort = date.toLocaleString(lang, { month: 'short' });
        console.log("[Month_Short]: ", this.monthShort);
        // To Be Used For other things....

        this.year = date.getFullYear();
        console.log("[YEAR]: ", this.year);
        this.yearShort = Number(
            date.toLocaleString(lang, { year: '2-digit'})
        );
        // Assign Current Month..
        setYear.innerHTML = this.year;

    }
}


const day = new Day();

console.log('-- day', day);