/**
 * search the valid period of 28 Day
 * @param enddate in string Format
 * @returns {Array}
 */
function searchNextForteenDay(enddate) {

    var date = stringToDate(enddate);
    var endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 14);

    var startdate = new Date(endDate);
    startdate.setDate(startdate.getDate() - 28);
    return [startdate, endDate];
}

/**
 * this is a prototyp---------------------------------------------------------------
 * @param startDate
 * @param stopDate
 * @returns {Array}
 *
 */
Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getDateToShow(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate < stopDate) {
        dateArray.push(currentDate)
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}


/**
 * Generate the Liste of 28 days in String Format.
 * @param startAnEndDate
 * @returns {Array}
 */
function generateListOfDate(startAnEndDate) {
    var i = 0;
    var startDate = startAnEndDate[0];
    var endDate = startAnEndDate[1];
    // console.log(startDate + " " + endDate);

    var dateArray = new Array(); // the List in Date format
    var dateListString = new Array(); // The List in String format
    var currentDate = new Date(startDate);
    endDate = new Date(endDate);

    while (currentDate < endDate) {
        currentDate = new Date(currentDate);
        var dateString = dateToString(currentDate);
        dateListString.push(dateString);
        // dateArray.push(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);

    }
    return dateListString;
}

/**
 * the function return the indexs of a cell in a table
 * @param cell
 * @param table
 * @returns {Array}
 */
function getCell(cell, table) {
    var result = $(table + ' tr').find('td').filter(function () {
        return $(this).text() === cell;
    });
    var index = new Array();
    index[0] = result.parent().index();
    index[1] = result.index();
    ;
    return index;
}

/**
 * This Function take an String in a Format mmyy an format this to a Format
 * Monat-Year
 *
 * @param monthAndYear
 * @returns {String}
 */
function formatMonth(monthAndYear) {
    var monthAndYears = monthAndYear;
    var monthFormat = "";
    var YearFormat = "";
    var element = monthAndYear.split("");
    var length = element.length - 4;

    // get The Month of The List
    for (var int = 0; int < length; int++) {

        monthFormat += element[int];
    }
    // get The Year of The List
    for (var int = length; int < element.length; int++) {

        YearFormat += element[int];
    }

    switch (monthFormat) {
        case "1":
            monthFormat = "Januar";
            break;
        case "2":
            monthFormat = "Februar";
            break;
        case "3":
            monthFormat = "mars";
            break;
        case "4":
            monthFormat = "April";
            break;
        case "5":
            monthFormat = "Mai";
            break;
        case "6":
            monthFormat = "Juni";
            break;
        case "7":
            monthFormat = "Juli";
            break;
        case "8":
            monthFormat = "August";
            break;
        case "9":
            monthFormat = "September";
            break;
        case "10":
            monthFormat = "Oktober";
            break;
        case "11":
            monthFormat = "November";
            break;
        case "12":
            monthFormat = "Dezember";
            break;
        default:

            break;
    }

    monthAndYears = monthFormat + "-" + YearFormat;
    return monthAndYears
}
/**
 * get the difference between two date
 * @param first
 * @param second
 * @returns {number}
 */

function daydiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}

