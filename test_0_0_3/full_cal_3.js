console.log("Full_Cal::v-3.js Plugged-In");
/* Dynamic Calendar */

    /* 
        TODO:

        ? Add Disabled Days Method
        ? Add Disabled Dates Method
        ? Integrate InTo Made Modual    
    */


// Set variables of HTML elements which we will be working with..
// Headers:  Date-Selected, Year, Month, Week, Date, etc...

let offDates = [];
function add_disbaled_dates(dates_list){
    if (dates_list){

        console.log("[JS_SIDE]:[DatesList]: ", dates_list);
        for (let y = 0; y < dates_list.length; y++){
            let yy = dates_list[y].split("-")[0];
            let mm = dates_list[y].split("-")[1];
            let dd = dates_list[y].split("-")[2];
            console.log("[YY]:", yy, "[MM]:", mm, "[DD]:", dd);
            offDates.push(dates_list[y]);

        }
    }
}



/* ~~~~~~~~~~~~~~~~~~ */
const setDate = document.getElementById("selected");
const setDay = document.getElementById("set-day");
const setMonth = document.getElementById("currentMonth");
const setYear = document.getElementById("currentYear");
/* ~~~~~~~~~~~~~~~~~~ */


/* Set Elements Needed */
let currentYear         = document.getElementById("currentYear");
let currentMonth        = document.getElementById("currentMonth");
/* ~~~~~~~~~~~~~~~~~~ */

/* Set Base Variables */
let selected            = null;
let selected_date       = "YYYY-MM-DD";
let is_set              = false;
let set_year            = null;
let set_month_name      = null;
let set_month_num       = null;
let set_week_day        = null;
let set_date_num        = null;
let final_date_set      = "yyyy-mm-dd";

/* ~~~~~~~~~~~~~~~~~~ */

let current_set         = [selected, selected_date, is_set];
let yyyy_mm_dd          = [set_year, set_month_num, set_month_name, set_week_day, set_date_num];

/* ~~~~~~~~~~~~~~~~~~ */

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

/* ~~~~~~~~~~~~~~~~~~ */

/* User Defined Variables */
//let disabledDates = null;

//console.log("[TO_BE_DEACTIVATED]: ", disabledDates);


/* Update SetVals */


function UpdateSets(thatYear, thatMonthNum, thatMonthName, thatWeekDay, thatDate){
    set_year                = thatYear;
    set_month_num           = thatMonthNum;
    set_month_name          = thatMonthName;
    set_week_day            = thatWeekDay;
    set_date_num            = thatDate;

    let mm_n                = set_month_num;
    let dd_n                = set_date_num;

    if (mm_n < 10){mm_n = "0"+mm_n}
    if (dd_n < 10){dd_n = "0"+dd_n}

    final_date_set          = set_year+"-"+mm_n+"-"+dd_n

    yyyy_mm_dd          = [set_year, set_month_num, set_month_name, set_week_day, set_date_num];
    display_state();
}

/* ~~~~~~~~~~~~~~~~~~ */




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








/* ---My Try--- */



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
    // Dynamic EventListener..
    let d_listnr = document.getElementById(d_id);

    // ID being clicked..
    d_listnr.addEventListener("click", function() {
        console.log("[CLICKED]::[", d_listnr.innerText, "]");

        //console.log("[?-IS-SET]: ", is_set);
        // If Not 'Set_Date' -> 'Set_Date' -> 'Selected_Date':
        if (is_set == false){
            //console.log("[NEW_SET]: ");
            // STYLE_NEW...
            d_listnr.style = "background: linear-gradient(120deg, rgba(0, 0, 255, 0.132), rgba(025, 0, 255, 0.83));";
            selected                = d_listnr;
            if (d_listnr.innerText < 10){selected_date= "d0"+d_listnr.innerHTML;}
            else{selected_date = "d"+d_listnr.innerHTML;}
            is_set                  = true;
            current_set             = [selected, selected_date, is_set];

            set_date_num            = d_listnr.innerText
            UpdateSets(set_year, set_month_num, set_month_name, set_week_day, set_date_num);

            console.log(current_set);
            return;
        }
        // If Already Set : 
        if(is_set == true){
            //console.log("[UNSET_OLD]:[SET_NEW]:[FIX_CSS..]:");
            // If Selected Same 'Set_Date' -> 'UnSet_Date'
            if(selected_date == d_listnr.innerHTML){
                //console.log("[TO_UNSET]: ", selected, "::", selected_date);

                d_listnr.style  = "background: linear-gradient(120deg, rgba(0, 255, 255, 0.132), rgba(0, 0, 255, 0.13));";
                is_set          = false;
                selected        = null;
                selected_date   = "YYYY-MM-DD";
                current_set     = [selected, selected_date, is_set];

                UpdateSets(null, null, null, null, null);
                return;

            }
            // If Selected !Same 'Set_Date' -> 'Replace_Date' 
            else{
                //console.log("[TO_UNSET]: ", selected, "::", selected_date);

                // STYLE NEW..
                d_listnr.style  = "background: linear-gradient(120deg, rgba(0, 0, 255, 0.132), rgba(025, 0, 255, 0.83));";

                // UN_STYLE OLD...
                let old_set     = document.getElementById(selected_date);
                old_set.style   = "background: linear-gradient(120deg, rgba(0, 255, 255, 0.132), rgba(0, 0, 255, 0.13));";
                selected        = d_listnr;
                if (d_listnr.innerText < 10){selected_date= "d0"+d_listnr.innerHTML;}
                else{selected_date           = "d"+d_listnr.innerHTML;}
                is_set          = true;
                current_set     = [selected, selected_date, is_set];
                //console.log(current_set);
                set_date_num            = d_listnr.innerText
                UpdateSets(set_year, set_month_num, set_month_name, set_week_day, set_date_num);
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
            try{DownYear();}
            catch{console.log("[Year_Not_Set]");}
        });
    // Next Year
        document.getElementById("next-year").addEventListener("click", function(){
            try{UpYear();}
            catch{console.log("[Year_Not_Set]");}
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


    // Is Day/Date of the Month
    function editDateOn(x_id, to_date){
        //console.log("[ThatWeekOn]::\n[ID]: ",x_id, "\n[ToDate]: ", to_date);
        document.getElementById(x_id).innerText = to_date;
        document.getElementById(x_id).style.display = 'flex';
    }
    // Is NOT Day/Date of the Month
    // ? Add Check For "DisabledDays && DisabledDates"
    function editDateOff(x_id){
        try{
            console.log("[ThatWeekOff]::\n[ID]: ",x_id);
            document.getElementById(x_id).style.display = 'none';
    
        }
        catch(err) {
            console.log(err.message);

        }

    }


    // Date-Grid-By-Week..
    /* 
        TODO:

        ? Add Disabled Days Method
        ? Add Disabled Dates Method
        ? Integrate InTo Made Modual    
    */
    function theWeekDays(firstDay, monthSize, weekNum){
        try{
            console.log("[CurrentWeekDay]: ", firstDay, "\n[MonthSize]: ", monthSize, "\n[WeekNum]: ", weekNum);
            for(let x = 0; x <= 34; x++){
                let toDate = x - weekNum + 1;
                //console.log("[X]:",x);
                let thatWeekNum = weekNum;
                let da_date = null;
                let da_mont = null;

                if (set_month_num < 10){da_mont = "0"+(set_month_num + 1)}
                else{da_mont = set_month_num}
                
                if (toDate < 10){da_date = "0"+toDate}
                else{da_date = toDate}
                let prab_date = set_year+"-"+da_mont+"-"+da_date
                //console.log("\n\n*:-----%--%-----:*\n*--", prab_date,"--*\n*:-----%--%-----:*\n");

                if (x < thatWeekNum || x > monthSize || offDates.includes(prab_date)){
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
                if (x >= thatWeekNum && x <= monthSize && !offDates.includes(prab_date)){
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
        catch(err){
            console.log("[First-Day_Not_Set]", err.message);
        }
        
    }


    // Date-Grid-By-Week..
    function theFirstDay(){
        console.log("[WHAT'S]:[THE]:[PROBLEM]:???", set_year, set_month_num);
        try{
            // ✅ Get the first day of any month
            let fday          = getFirstDayOfMonth(set_year, set_month_num+1);
            let fday_0          = fday.getDay();

            // Get First Week Day Of Month..
            let that_week_day = weekDays_Short[fday_0];

            // Get Size Of Month
            let lday          = getLastDayOfMonth(set_year, set_month_num+1);
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
        console.log("**[SETTING]:[ID_VALS]**");
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



function SetDynamicCalendar(){
    theYear();
    theMonth();
    theFirstDay();
    set_id_vals();

}



function display_state(){
    console.log(current_set);
    console.table(yyyy_mm_dd);
    if (final_date_set){console.log(final_date_set);}
    else{console.log("[DATE-NOT-SET]\n");}
}




function checkDates(prab_date){
    for(let j = 0; j < offDates.length; j++){
//        console.log("[TESTING-PRAB_DATE]");

        if (prab_date == offDates[j]){
            console.log("[true] ", prab_date, " == ", offDates[j]);
            return true;
        }
        else{
//            console.log("Nope...");
            return false;
        }
    

    }

}



