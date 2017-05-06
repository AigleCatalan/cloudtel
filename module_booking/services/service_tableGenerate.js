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
 * generate the booking table
 *
 * @param rows
 * @param cols
 *
 */
function generateTable(rows, cols, date) {

    var table = ''; // The table
    var tableMonth = ''; // to show the Month and the year
    var setdate = date;


    var DatePeriodeToShow = searchNextForteenDay(setdate);
    var startDate = DatePeriodeToShow[0];
    var endDate = DatePeriodeToShow[1];
    var listOfDate = getDateToShow(startDate, endDate);
    arrAllDayToSchowInKalendarDateFormat = listOfDate;
    arrAlldayToShowInKalendarInFormatDayAndMonth = generateDayAndMonth(listOfDate);


    var listOfdateString = generateListOfDate(searchNextForteenDay(setdate));
    arrAllDayToSchowInKalendarStringFormat = listOfdateString;

    var listOfmont = searchMonthAndYear(listOfdateString)[0];
    var positionOfMonthChange = searchMonthAndYear(listOfdateString)[1];

    // create the Row of the Month and Year
    tableMonth += '<tr>';
    for (var count = 0; count < listOfmont.length; count++) {

        if (count == 0) {
            var ElementOfFirstMonth = positionOfMonthChange;
            tableMonth += '<td id = "firstMonth" style = "width:'
                + CalculatePercentage(ElementOfFirstMonth, NumberOfDay)
                + '% " >' + listOfmont[count] + '</td>';
        } else {
            // var elementOfSecondMonth = NumberOfDay - positionOfMonthChange;
            tableMonth += '<td id = "secondMonth" style = "width:'
                + (100 - CalculatePercentage(ElementOfFirstMonth, NumberOfDay)) + '% ">' + listOfmont[count]
                + '</td>';
        }
    }
    tableMonth += '</tr>';

    // Create the complete table
    for (var rowCount = 0; rowCount < rows; rowCount++) {

        // when first row (row content day list)
        if (rowCount == 0) {

            table += '<tr class = "onlyRead">';
            for (var columCount = 0; columCount < cols; columCount++) {

                var currentDate = listOfDate[columCount];
                table += '<td class = "firstTd">' + currentDate.getDate().toString() + '</td>';
            }
            table += '</tr>';

        } else {

            table += '<tr>';
            for (var c = 0; c < cols; c++) {
                // console.log("cols : " + columCount + "date: " + dateArray[columCount]);
                table += '<td class = "selectableTD">' + '<div class = bookingContent>' + '</div>' + '</td>';
            }
            table += '</tr>';
        }
    }

    var result = '<table id = "monthTable">' + tableMonth + '</table>';
    result += '<table id = "hotelTable">' + table + '</table>';

    return result;
}

/**
 * get a List of all Month and position who then month changed
 *
 * @param dateArray
 * @returns {Array}
 */
function searchMonthAndYear(dateArray) {

    var ListOfMonth = new Array();
    var positionInList = 28;

    for (var int = 0; int < dateArray.length; int++) {

        // var currentElement = splitString(dateArray[int], 0);
        var currentMonth = splitString(dateArray[int], 1)
            + splitString(dateArray[int], 2);

        if (int != 0) {
            if (currentMonth != (splitString(dateArray[int - 1], 1) + splitString(
                    dateArray[int - 1], 2))) {

                ListOfMonth.push(formatMonth(currentMonth));
                positionInList = int;
            }
        } else {
            // console.log(formatMonth(currentMonth));
            ListOfMonth.push(formatMonth(currentMonth));
        }
    }
    return [ListOfMonth, positionInList]

}
/**
 *this could be used to show a day on the dashboard
 * @param day
 * @returns {*}
 */
function dayFormat(day) {
    switch (day) {
        case "0":
            return "L";
            break;
        case "1":
            return "M";
            break;
        case "2":
            return "M";
            break;
        case "3":
            return "J";
            break;
        case "4":
            return "V";
            break;
        case "5":
            return "S";
            break;
        case "6":
            return "D";
            break;
        default:
            return day;
            break;
    }
}

/**
 * this is a help function to create a array with only the day and the month of a reservation
 * @param listOfDate
 * @returns {Array}
 */
function generateDayAndMonth(listOfDate) {
    var listAndMonth = new Array();
    for (var count = 0; count < listOfDate.length; count++) {
        var currentDate = listOfDate[count].getDate() + "-" + listOfDate[count].getMonth();
        listAndMonth.push(currentDate);
    }
    return listAndMonth;
}
