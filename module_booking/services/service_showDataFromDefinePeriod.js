/**
 *this function send and ajax-request to the backend system with the start- and enddate and wäit for a responce with
 *containing all reservation between this periode
 *
 * is is very important that the date have the format: yyyy-mm-dd  (2017-02-07)
 * */

function loadData() {

    var startdate = convertStringToDate(arrAllDayToSchowInKalendarStringFormat[0]);
    var endDate = convertStringToDate(arrAllDayToSchowInKalendarStringFormat[27]);

    $
        .ajax({
            type: 'POST',
            url: "./module_booking/services/service_getDataFromDefinePeriod.php",
            data: ({startDate: startdate, enddate: endDate}),
            dataType: "json"
        })
        .success(
            function (data) {
                for (var i = 0; i < data.length; i++) {

                    // log all the received data from the server
                    console.log(data[i].objectDescription + " arr " + data[i].arrivalDate + "depr " + data[i].departureDate + "\n");

                    // fetch the reservation data into variables
                    var clientName = data[i].kName;
                    var objectDescription = data[i].objectDescription;
                    var strArrival = data[i].arrivalDate;
                    var strDeparture = data[i].departureDate;
                    //convert the dates
                    var dArrivalDate = new Date(strArrival);
                    var dDepartureDate = new Date(strDeparture);
                    // this is used to facilitate a content checking
                    var strArrivalDayAndMonth = dArrivalDate.getDate() + '-' + dArrivalDate.getMonth();
                    var strDepartureDayAndMonth = dDepartureDate.getDate() + '-' + dDepartureDate.getMonth();

                    strArrival = dateToString(strArrival);
                    strDeparture = dateToString(strDeparture);
                    var arrCellIndexRoom = getCell(objectDescription, "#roomtable");

                    // strDeparture and strArrival stay in the presentation-area
                    if ($.inArray(strArrivalDayAndMonth, arrAlldayToShowInKalendarInFormatDayAndMonth) >= 0 && $.inArray(strDepartureDayAndMonth, arrAlldayToShowInKalendarInFormatDayAndMonth) >= 0) {

                        var intStayPeriod = daydiff(dArrivalDate, dDepartureDate);
                        intStayPeriod = intStayPeriod * 102;
                        var arrCellIndexArrival = getCell(dArrivalDate.getDate().toString(), "#hotelTable");

                        $('#hotelTable').find(
                            'tr:eq(' + arrCellIndexRoom[0] + ')').find(
                            'td:eq(' + arrCellIndexArrival[1] + ')').find('.bookingcontent').html(
                            clientName).addClass("contentField").css({
                            position: 'relative',
                            backgroundColor: 'red',
                            width: intStayPeriod + '%',
                            padding: '8px 0 0 0'
                        });

                        var cellPosition = getCell(dDepartureDate.getDate().toString(), "#hotelTable");
                        for (var count = (arrCellIndexArrival[1]); count < cellPosition[1]; count++) {
                            $('#hotelTable').find(
                                'tr:eq(' + arrCellIndexRoom[0] + ')').find(
                                'td:eq(' + count + ')')
                                .addClass("besetzt").removeClass(
                                "selectableTD").attr(
                                "disabled", true);
                        }
                    }

                    // strArrival is not in the presentation area
                    if ($.inArray(strArrivalDayAndMonth, arrAlldayToShowInKalendarInFormatDayAndMonth) >= 0 && $.inArray(strDepartureDayAndMonth, arrAlldayToShowInKalendarInFormatDayAndMonth) < 0) {

                        var lastDayInTablle = arrAllDayToSchowInKalendarDateFormat[arrAllDayToSchowInKalendarDateFormat.length - 1];
                        var duration = daydiff(dArrivalDate, lastDayInTablle);
                        duration = (duration + 1) * 102;

                        var indexArrival = getCell(dArrivalDate.getDate().toString(), "#hotelTable");
                        $('#hotelTable').find(
                            'tr:eq(' + arrCellIndexRoom[0] + ')').find(
                            'td:eq(' + indexArrival[1] + ')').find('.bookingcontent').html(
                            clientName).css({
                            position: 'relative',
                            backgroundColor: 'red',
                            width: duration + '%',
                            padding: '8px 0 0 0'
                        });

                        var arrCellPosition = getCell(dArrivalDate.getDate().toString(), "#hotelTable");
                        var lastCellPosition = getCell(lastDayInTablle.getDate().toString(), "#hotelTable");
                        for (var count = arrCellPosition[1]; count < lastCellPosition[1]; count++) {

                            $('#hotelTable').find(
                                'tr:eq(' + arrCellIndexRoom[0] + ')').find(
                                'td:eq(' + count + ')')
                                .addClass("besetzt").removeClass(
                                "selectableTD").attr(
                                "disabled", true);
                        }
                    }

                    // strDeparture is not in the presentation area
                    if ($.inArray(strArrivalDayAndMonth, arrAlldayToShowInKalendarInFormatDayAndMonth) < 0 && $.inArray(strDepartureDayAndMonth, arrAlldayToShowInKalendarInFormatDayAndMonth) >= 0) {
                        var firstDayInTabelle = arrAllDayToSchowInKalendarDateFormat[0];
                        var duration = daydiff(firstDayInTabelle, dDepartureDate);
                        duration = duration * 102;
                        var indexdeparture = getCell(firstDayInTabelle.getDate().toString(), "#hotelTable");
                        $('#hotelTable').find(
                            'tr:eq(' + arrCellIndexRoom[0] + ')').find(
                            'td:eq(' + indexdeparture[1] + ')').find('.bookingcontent').html(
                            clientName).css({
                            position: 'relative',
                            backgroundColor: 'red',
                            width: duration + '%',
                            padding: '8px 0 0 0'
                        });

                        var firstCellPosition = getCell(firstDayInTabelle.getDate().toString(), "#hotelTable");
                        var deparCellPosition = getCell(dDepartureDate.getDate().toString(), "#hotelTable");
                        for (var count = firstCellPosition[1]; count < deparCellPosition[1]; count++) {
                            $('#hotelTable').find(
                                'tr:eq(' + arrCellIndexRoom[0] + ')').find(
                                'td:eq(' + count + ')')
                                .addClass("besetzt").removeClass(
                                "selectableTD").attr(
                                "disabled", true);
                        }
                    }

                    //TODO: check why is not work
                    // reservation period is longer that 28 days/ start and enddate are not in the presentation area
                    if ($.inArray(strArrivalDayAndMonth, arrAlldayToShowInKalendarInFormatDayAndMonth) < 0 && $.inArray(strDepartureDayAndMonth, arrAlldayToShowInKalendarInFormatDayAndMonth) < 0) {
                        console.log("found");
                        var firstDayInTabelle = arrAllDayToSchowInKalendarDateFormat[0];
                        var duration = 28 * 102;
                        var firstindex = getCell(firstDayInTabelle.getDate().toString(), "#hotelTable");

                        // console.log("index" + arrCellIndexArrival[1] + "arr" + dArrivalDate.getDate().toString() + " ind "  + arrCellIndexArrival[0]);
                        $('#hotelTable').find(
                            'tr:eq(' + arrCellIndexRoom[0] + ')').find(
                            'td:eq(' + firstindex[1] + ')').find('.bookingcontent').html(
                            clientName).css({
                            position: 'relative',
                            backgroundColor: 'red',
                            width: duration + '%',
                            padding: '8px 0 0 0'
                        });
                    }
                }
            });

}

/**
 * this is a utility function to convert  a date into a string that the server know.
 * @param stringDate
 * @returns {string}
 */
function convertStringToDate(stringDate) {

    var strSplit = stringDate.split(".");
    var day = strSplit[0];
    var month = strSplit[1];
    var year = strSplit[2];
    var strdate = year + "-" + month + "-" + day;
    return strdate;
}