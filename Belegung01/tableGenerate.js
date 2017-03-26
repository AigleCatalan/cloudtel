/**
 * 
 * 
 */
/*
 * 
 * function updateClass( oldClassName, newClassName){
 * $(this).removeClass(oldClassName); $(this).addClass(newClassName); }
 * 
 */
var NumberOfDay = 28;
/**
 * split a STring an return an Element on the Index
 * 
 * @param: dateString, index
 * @return: an Element on the Index.
 * 
 */
function splitString(dateString, index) {

	var dateSplit = dateString.split(".");
	var getIndexElement = dateSplit[index];
	// console.log(getIndexElement);
	return getIndexElement;
}

/**
 * 
 * @param fraction
 * @param total
 * @returns {Number}
 */
function CalculatePercentage(fraction, total) {

	var percentage = (fraction * 100) / total;
	return percentage;
}

/**
 * generate the Table
 * 
 * @param rows
 * @param cols
 * 
 */
function generateTable(rows, cols, date) {

	var table = ''; // The table
	var tableMonth = ''; // to show the Month and the year
	var setdate = date;
	// var dateArray = dateFactory.getDateStrings(setdate);
	var monthRows = '';
	var listOfdateString = generateListOfDate(searchNextForteenDay(setdate));
	allDayToSchowInKalendar = listOfdateString;
	
	var listOfmont = searchMonthAndYear(listOfdateString)[0];
	var positionOfMonthChange = searchMonthAndYear(listOfdateString)[1];

	// create the Row of the Month and Year
	tableMonth += '<tr>';
	for (var int = 0; int < listOfmont.length; int++) {

		if (int == 0) {
			var ElementOfFirstMonth = positionOfMonthChange;
			tableMonth += '<td id = "firstMonth" style = "width:'
					+ CalculatePercentage(ElementOfFirstMonth, NumberOfDay)
					+ '% " >' + listOfmont[int] + '</td>';
		} else {
			var elementOfSecondMonth = NumberOfDay - positionOfMonthChange;
			tableMonth += '<td id = "secondMonth">' + listOfmont[int] + '</td>';
		}
	}
	tableMonth += '</tr>';

	// Create the complete table
	for (var r = 0; r < rows; r++) {

		// when first row
		if (r == 0) {
			table += '<tr class = "onlyRead">';
			alert (listOfdateString[2]);
			for (var c = 0; c < cols; c++) {
				var currentValue = listOfdateString[c];
				var cellsContent = splitString(currentValue, 0);
				// console.log("tag: " + cellsContent);

				table += '<td class = "firstTd">' + cellsContent + '</td>';
			}
			table += '</tr>';
		} else {

			table += '<tr>';
			for (var c = 0; c < cols; c++) {
				// console.log("cols : " + c + "date: " + dateArray[c]);
				table += '<td class = "selectableTD">' + '</td>';
			}
			table += '</tr>';
		}
	}

	var result = '<table id = "monthTable">' + tableMonth + '</table>';
	result+= '<table id = "hotelTable">' + table + '</table>';
	
	return result;
//	document.write('<div class="floatTable" id="tableDiv" >')
//	document.write('<table id = "monthTable">' + tableMonth + '</table>');
//	document.write('<table id = "hotelTable">' + table + '</table>');
//	document.write('</div>')
}

/**
 * get a List of all Month and position who then month changed
 * 
 * @param dateArray  
 */
function searchMonthAndYear(dateArray) {

	var ListOfMonth = new Array();
	var positionInList = 28;

	for (var int = 0; int < dateArray.length; int++) {

		var currentElement = splitString(dateArray[int], 0);
		var currentMonth = splitString(dateArray[int], 1)
				+ splitString(dateArray[int], 2);

		if (int != 0) {
			if (currentMonth != (splitString(dateArray[int - 1], 1) + splitString(dateArray[int - 1], 2))) {

				ListOfMonth.push(formatMonth(currentMonth));
				positionInList = int;
			}
		} else {
			// console.log("adjhas");
			// console.log(formatMonth(currentMonth));
			ListOfMonth.push(formatMonth(currentMonth));
		}
	}
	return [ ListOfMonth, positionInList ]

}

