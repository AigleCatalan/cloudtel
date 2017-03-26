/**
 * Transform a Date to a string in format dd.mm.yy
 */
function dateToString(date) {

	var date = new Date(date);

	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getYear() + 1900;
	date = day + "." + month + "." + year;
	return date;
}

/**
 * Transform a string to a Date in format mm/dd/yy
 */

function stringToDate(stringDate) {

	var strSplit = stringDate.split(".");
	var day = strSplit[0];
	var month = strSplit[1];
	var year = strSplit[2];
	var date = month + "/" + day + "/" + year;
	date = new Date(date);
	return date;
}
/**
 * 
 * search the valid period of 28 Day
 */
function searchNextForteenDay(enddate) {

	var date = stringToDate(enddate);
	var endDate = new Date(date);
	endDate.setDate(endDate.getDate() + 14);

	var startdate = new Date(endDate);
	startdate.setDate(startdate.getDate() - 28);
	return [ startdate, endDate ];
}
/**
 * 
 * Generate the Liste of 28 days in String Format.
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
		monthFormat = "M&aumlrz";
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
