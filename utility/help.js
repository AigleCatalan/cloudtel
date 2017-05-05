/**
 * Transform a Date to a string in format dd.mm.yy
 * @param date
 * @returns {String}
 */
function dateToString(date) {

    var date = new Date(date);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getYear() + 1900;
    if (month < 10) {
        month = "0" + month;
    }
    strdate = day + "." + month + "." + year;
    return strdate;
}

/**
 * Transform a string to a Date in format mm/dd/yy
 * @param stringDate
 * @returns {Date}
 */
function stringToDate(stringDate) {

    var strSplit = stringDate.split(".");
    var day = strSplit[0];
    var month = strSplit[1];
    var year = strSplit[2];
    var strdate = month + "/" + day + "/" + year;
    date = new Date(strdate);
    return date;
}
