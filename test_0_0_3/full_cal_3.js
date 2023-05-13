console.log("Full_Cal::v-3.js Plugged-In");
//let disabledDates = ['2023-05-07', '2023-05-17', '2023-05-27' ];
//console.log("[TO_BE_DEACTIVATED]: ", disabledDates);



// Set variables of HTML elements which we will be working with..
// Headers:  Date-Selected, Year, Month, Week, Date, etc...

const setDate = document.getElementById("selected");
const setDay = document.getElementById("set-day");
const setMonth = document.getElementById("currentMonth");
const setYear = document.getElementById("currentYear");






/* The more correct way of getting things done around here */
/* We will dive into JS-OOP  (My First Time ..) :~| */



/* v PART - 1 v */

function getWeekNumber(date)
{                                    // January being the [v] Index..
    const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1)
                                        // And the first day [^] of that month

    const pastDaysOfTheYear = (date - firstDayOfTheYear) / 86400000;

    // Index is 'Zero-Based'
    return Math.ceil((pastDaysOfTheYear + firstDayOfTheYear.getDay() + 1) / 7);

}
class Day
{
    constructor(date=null, lang='default')
    {
        date = date ?? new Date();

        // TIME
        this.timestamp = date.getTime();
        // DATE
        this.Date = date;
        // DAY
        this.date = date.getDate();
        this.day = date.toLocaleString(lang, { weekday: 'long' });
        this.dayShort = date.toLocaleString(lang, { weekday: 'short' });
        this.dayNumber = date.getDay() + 1;
        // WEEK
        this.week = getWeekNumber(date);
        // MONTH
        this.monthNumber =  Number(
            date.toLocaleString(lang, { month: '2-digit' })
        );
        this.month = date.toLocaleString(lang, { month: 'long' });
        this.monthShort = date.toLocaleString(lang, { month: 'short' });
        // YEAR
        this.year = date.getFullYear();
        this.yearShort = Number(
            date.toLocaleString(lang, { year: '2-digit'})
        );


    

    }

    get isToday(){
        return this.isEqualTo(new Date());

    }

    isEqualTo(date){
        date = date instanceof Day ? date.Date : date;
        return date.getDate() === this.date &&
        date.getMonth === this.monthNumber - 1 &&
        date.getFullYear() === this.year;
    }
    format(formatStr){
        return formatStr
        .replace(/\YYYY\b/, this.year)
        .replace(/\YY\b/, this.yearShort)
        .replace(/\MMMM\b/, this.month)
        .replace(/\MM\b/, this.monthShort)
        .replace(/\MMN\b/, this.monthNumber.toString().padStart(2, '0'))
        .replace(/\DN\b/, this.dayNumber)
        .replace(/\DD\b/, this.date.toString().padStart(2, '0'))
    }
}
/* ^ PART - 1 ^ */


/* PART - 2*/
function isLeapYear(year){
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}
class Month
{
    constructor(date = null, lang = 'default')
    {
        const day           = new Day(null, lang);
        const monthSize     = [31, 28, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30];
        this.lang           = lang;

        this.name           = day.month;
        this.number         = day.monthNumber;
        this.numberOfDays   = monthSize[this.number - 1];
        this.year           = day.year;

        if (this.number === 2){
            this.numberOfDays += isLeapYear(day.year) ? 1 : 0;
        }

        this[Symbol.iterator]   = function* (){
            let number          = 1;
            yield this.getDay(number);
            while(number < this.numberOfDays){
                ++number;
                yield this.getDay(number);
            }
        }
    }
    getDay(date){
        console.log("[getDay]: ", this.number);
        return new Day(new Date(this.year, this.number - 1, date), this.lang);
    }

}
/* ^ PART - 2 ^ */




/* v PART - 3 v */
class Calendar
{
    weekDays = Array.from({length: 7});
    constructor(year = null, monthNumber = null, lang='default'){
        this.today  = new Day(null, lang);
        this.year = year ?? this.today.year;
        this.month = new Month(new Date(this.year, (monthNumber || this.today.monthNumber) -1), lang);
        this.lang = lang;


        this[Symbol.iterator] = function* (){
            let number = 1;
            yield this.getMonth(number);
            while(number < 12){
                ++number;
                yield this.getMonth(number);
            }
        };

        
        this.weekDays.forEach((_, i) => {
            const day = this.month.getDay(i);
            if(!this.weekDays.includes(day.day)){
                this.weekDays[day.dayNumber- 1] = day.day
            }
        });
    }
    isLeapYear(){
        return isLeapYear(this.year);
    }
    getMonth(monthNum){
        return new Month(new Date(this.year, monthNum -1), this.lang);
    }

}
//
/* ^ PART - 3 ^ */





/* ---My Try--- */


/* Dynamic Calendar */

/* Set Elements Needed */
let currentYear         = document.getElementById("currentYear");
let currentMonth        = document.getElementById("currentMonth");

/* Set Base Variables */
let selected            = null;
let selected_date       = "YYYY-MM-DD";
let is_set              = false;
let set_year            = null;
let set_month_name      = null;
let set_month_num       = null;
let set_week_day        = null;
let set_date_num        = null;
let set_First_Week_Day  = null;
let set_Month_Size      = null;
let currentWeekDay      = null;


let current_set         = [selected, selected_date, is_set];
let yyyy_mm_dd          = [set_year, set_month_num, set_month_name, set_week_day, set_date_num];

let weekDays_Short = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
]

let allMonths = [
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
]


/* Update SetVals */


function UpdateSets(thatYear, thatMonthNum, thatMonthName, thatWeekDay, thatDate){
    let yyyy_mm_dd          = [thatYear, thatMonthNum, thatMonthName, thatWeekDay, thatDate];
    console.table(yyyy_mm_dd);
}

/* ~~~~~~~~~~~~~~~~~~ */


/* Year Header Nav's */
function getNextYear(thisYear){
    let isLeap = isLeapYear(thisYear);
    return [thisYear+1, isLeap];
}

function getPrevYear(thisYear){
    let isLeap = isLeapYear(thisYear);
    return [thisYear-1, isLeap];
}

function UpYear(){
    console.log("[GetNextYear]:");
    let prevYear = getNextYear(set_year);
    console.log(prevYear);
    // Update Year Header..
    let new_year = prevYear[0];
    console.log('[New_Year]: ', new_year);
    currentYear.innerText = new_year;
    // Update Year Variable..
    set_year = new_year;
    theFirstDay();
}

function DownYear(){
    console.log("[GetPrevYear]:");
    let nextYear = getPrevYear(set_year);
    console.log(nextYear);
    // Update Year Header..
    let new_year = nextYear[0];
    console.log('[Prev_Year]: ', new_year);
    currentYear.innerText = new_year;
    // Update Year Variable..
    set_year = new_year;
    theFirstDay();

}

/* ~~~~~~~~~~~~~~~~~ */

/* Month Header Nav's */

function getNextMonth(monthNum, monthName){
    // Month-Next-Number..
    console.log("[MonthVals]:\n[NUM]:: ", monthNum, "\n[NAME]:: ", monthName);
    if (monthNum == 11){
        let mNum = 0;
        console.log("[Dec->Jan]: ", mNum);
        // Month-Next-Name..
        let mName = allMonths[mNum];
        let monthSet = [mNum, mName];


        // Corrospond-Year-Change..
        UpYear();
        return monthSet;

    }
    if (monthNum <= 10){
        let mNum = monthNum+1;
        console.log("[",monthName ,"->",allMonths[mNum] ,"]:[", mNum,"]");
        // Month-Next-Name..
        let mName = allMonths[mNum];
        let monthSet = [mNum, mName];
        return monthSet;

    }


}

function getPrevMonth(monthNum, monthName){
    // Month-Next-Number..
    console.log("[MonthVals]:\n[NUM]:: ", monthNum, "\n[NAME]:: ", monthName);
    if (monthNum == 0){
        let mNum = 11;
        console.log("[",monthName ,"->",allMonths[mNum] ,"]:[", mNum,"]");
        // Month-Prev-Name..
        let mName = allMonths[mNum];
        let monthSet = [mNum, mName];
        // Corrospond-Year-Change..
        DownYear();
        return monthSet;

    }
    if (monthNum <= 11 && monthNum >= 1){
        let mNum = monthNum-1;
        console.log("[",monthName ,"->",allMonths[mNum] ,"]:[", mNum,"]");
        // Month-Prev-Name..
        let mName = allMonths[mNum];
        let monthSet = [mNum, mName];
        return monthSet;

    }


}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month-1, 1);
}

function getLastDayOfMonth(year, month) {
    return new Date(year, month, 0);
}

/* ~~~~~~~~~~~~~~~~~~ */


/* Main Date Setter Nav's */

function set_date_sel(d_id){
    //console.log("[D_ID]: [", d_id, "]");
    let d_listnr = document.getElementById(d_id);


    // ID being clicked..
    d_listnr.addEventListener("click", function() {
        console.log("[CLICKED]::[", d_listnr.innerHTML, "]::[", d_listnr.innerText, "]");
        console.log("[?-IS-SET]: ", is_set);
        // If Not 'Set_Date' -> 'Set_Date' -> 'Selected_Date':
        if (is_set == false){
            console.log("[NEW_SET]: ");
            // STYLE_NEW...
            d_listnr.style = "background: linear-gradient(120deg, rgba(0, 0, 255, 0.132), rgba(025, 0, 255, 0.83));";
            selected                = d_listnr;
            selected_date           = "d"+d_listnr.innerHTML;
            is_set                  = true;
            current_set = [selected, selected_date, is_set];


            set_date_num            = d_listnr.innerText
            UpdateSets(set_year, set_month_num, set_month_name, set_week_day, set_date_num);

            console.log(current_set);
            return;
        }

        // If Already Set : 
        if(is_set == true){
            console.log("[UNSET_OLD]:[SET_NEW]:[FIX_CSS..]:");

            // If Selected Same 'Set_Date' -> 'UnSet_Date'
            if(selected_date == d_listnr.innerHTML){
                console.log("[TO_UNSET]: ", selected, "::", selected_date);

                d_listnr.style = "background: linear-gradient(120deg, rgba(0, 255, 255, 0.132), rgba(0, 0, 255, 0.13));";
                is_set = false;
                selected = null;
                selected_date = "YYYY-MM-DD";
                current_set = [selected, selected_date, is_set];

                console.log(current_set);
                return;

            }
            // If Selected !Same 'Set_Date' -> 'Replace_Date' 
            else{
                console.log("[TO_UNSET]: ", selected, "::", selected_date);

                // STYLE NEW..
                d_listnr.style = "background: linear-gradient(120deg, rgba(0, 0, 255, 0.132), rgba(025, 0, 255, 0.83));";

                // UN_STYLE OLD...
                let old_set = document.getElementById(selected_date);
                old_set.style = "background: linear-gradient(120deg, rgba(0, 255, 255, 0.132), rgba(0, 0, 255, 0.13));";

                selected = d_listnr;
                selected_date = "d"+d_listnr.innerHTML;
                is_set = true;
                current_set = [selected, selected_date, is_set];

                console.log(current_set);

                return;

            }
        }


    });
}

/* ~~~~~~~~~~~~~~~~~~~~~~ */


try{
    // Assign True Date Values..
    // Year..
    try{
    function theYear(){
        try{

            let date                = new Day();
            currentYear.innerText   = date.year;
            set_year                = date.year;
            console.log("[DATE]:[YEAR]: ",date.year);

        }
        catch{
            console.log("[Year_Not_Set]");
        }
    }
    try{
    // Prev Year
        document.getElementById("prev-year").addEventListener("click", function(){
            try{
                DownYear();
                }
                catch{
                    console.log("[Year_Not_Set]");
                }
        });
    // Next Year
        document.getElementById("next-year").addEventListener("click", function(){
            try{
                UpYear();

                }
                catch{
                    console.log("[Year_Not_Set]");
                }
        });
    }
    catch{
        console.log("[ERROR]:[YEAR]");
    }
    }
    catch{
        console.log("[ERROR]:[YEARS]:[SETTER]");
    }

    // Month..
    try{
    function theMonth(){
        try{
            let date                = new Day();
            currentMonth.innerText  = date.month;
            set_month_name          = date.month;
            set_month_num           = date.monthNumber - 1;
            console.log("[DATE]:[MONTH]:: ", set_month_name, " ::[NUM]::", set_month_num);
        }
        catch{
            console.log("[Month_Not_Set]");
        }
    }
    try{
        // Prev Month..
        document.getElementById("prev-month").addEventListener("click", function(){
            try{
                console.log("[GetPrevMonth]:");
                let lastMonth           = getPrevMonth(set_month_num, set_month_name)
                let monthLastNum        = lastMonth[0];
                let monthLastName       = lastMonth[1];
                set_month_name          = monthLastName;
                set_month_num           = monthLastNum;
                currentMonth.innerText  = set_month_name;
                console.log("[PrevMonth]:: [Name]: ", monthLastName, "::[Num]::", monthLastNum, "\n:----:\n");
                console.log("[DATE]:[MONTH]:: ", set_month_name, " ::[NUM]::", set_month_num);
                theFirstDay();
            }
            catch{
                console.log("[ERROR]:[Prev-Month]");
            }
            
        });
        // Next Month..
        document.getElementById("next-month").addEventListener("click", function(){
            try{
                console.log("[GetNextMonth]:");
                let nextMonth       = getNextMonth(set_month_num, set_month_name);
                console.log("[NextMonth] -> :",nextMonth);
                let monthNextNum        = nextMonth[0];
                let monthNextName       = nextMonth[1];
                set_month_name          = monthNextName;
                set_month_num           = monthNextNum;
                currentMonth.innerText  = set_month_name;
                console.log("[NextMonth]:: [Num] ", monthNextNum, "::[Name]::", monthNextName, "\n:----:\n");
                console.log("[DATE]:[MONTH]:: ", set_month_name, " ::[NUM]::", set_month_num);
                theFirstDay();
            }
            catch{
                console.log("[ERROR]:[Prev-Month]");
            }
            
        });

    }
    catch{
        console.log("[CATCH]:[MONTH_NAV]");
    }
    }
    catch{
        console.log("[ERROR]:[MONTHS]:[SETTER]");
    }


    function editDateOn(x_id, to_date){
        console.log("[ThatWeekOn]::\n[ID]: ",x_id, "\n[ToDate]: ", to_date);
        document.getElementById(x_id).innerText = to_date;
    }

    function editDateOff(x_id){
        console.log("[ThatWeekOff]::\n[ID]: ",x_id);
        document.getElementById(x_id).innerText = "--";
        document.getElementById(x_id).style.display = 'none';
    }


    // Date-Grid-By-Week..
    function theWeekDays(firstDay, monthSize, weekNum){
        try{
            console.log("[CurrentWeekDay]: ", firstDay, "\n[MonthSize]: ", monthSize, "\n[WeekNum]: ", weekNum);
            for(let x = 0; x <= 34; x++){
                let toDate = x - weekNum + 1;
                console.log("[X]:",x);
                let thatWeekNum = weekNum;
                if (x < thatWeekNum || x > monthSize){
                    thatWeekNum+1;
                    if (x < 10){
                        let x_id = "d0"+x;
                        editDateOff(x_id);
                    }
                    else{
                        let x_id = "d"+x;
                        editDateOff(x_id);
                    }
                }
                if (x >= thatWeekNum && x <= monthSize){
                    thatWeekNum+1;
                    if (x < 10){
                        let x_id = "d0"+x;
                        editDateOn(x_id, toDate);
                    }
                    else{
                        let x_id = "d"+x;
                        editDateOn(x_id, toDate);
                    }
                }

            }
        }
        catch{
            console.log("[First-Day_Not_Set]");
        }
        
    }


    // Date-Grid-By-Week..
    function theFirstDay(){
        try{
            // ✅ Get the first day of any month
            const fday          = getFirstDayOfMonth(set_year, set_month_num+1);
            let fday_0          = fday.getDay();

            // Get First Week Day Of Month..
            let that_week_day = weekDays_Short[fday_0];

            // Get Size Of Month
            const lday          = getLastDayOfMonth(set_year, set_month_num+1);
            let lday_0          = lday.getDate();

            console.log("[F_DAY]: ", fday,"\n[F_DAY_0]:", that_week_day,"\n\n[L_DAY]:", lday,"\n[L_DAY_0]: ", lday_0);

            set_week_day        = fday_0;

            // Start Assigning Date Nums by First Week Day
            theWeekDays(that_week_day, lday_0, fday_0);
            UpdateSets(set_year, set_month_num, set_month_name, set_week_day, set_date_num);



        }
        catch{
            console.log("[First-Day_Not_Set]");
        }
        
    }
}
catch{
    console.log("[Date_Vals_Not_Set]");
}

try{
    function set_id_vals(){
        for (let d_val = 0; d_val <= 34; d_val++){
            if (d_val < 10){
                let d_id = "d0"+d_val;
                set_date_sel(d_id);
            }
            else{
                let d_id = "d"+d_val;
                set_date_sel(d_id);
            }
        }
    }
    
}
catch{
    console.log("[IDs_Not_Set]");
}



try{
    set_id_vals();
    theYear();
    theMonth();
    theFirstDay();

}
catch{
    console.log("[Mains]:[FAILURE]");
}

function display_state(){
    console.log(current_set);
    console.table(yyyy_mm_dd);
}









try{



// DAY ...
//console.log("[** Part - 1 **]");
//console.log('[Day]: ');
//const day = new Day(null, "en");
//console.log(day.format("YYYY-MMN-DD"));
//console.table(day);


// MONTH ...
//console.log("[** Part - 2 **]");
//console.log('[Month]: ');
//const month = new Month();
//console.table(month);
//console.log(month, ...month);

//for(dayz of month){
//    console.log("[dayOfMonth]: ", dayz.date);
//}



//console.log("[** Part - 3 **]");
//console.log('[Calendar]: ');
//const calendar = new Calendar();
//console.table(calendar);
//console.log(calendar, ...calendar);
//
//for(monthz of calendar){
//    console.log(monthz);
//}




}
catch{
    console.log("MainClass-[FAILED]");
}


