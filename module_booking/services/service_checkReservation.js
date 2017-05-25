/**
 *this function send and ajax-request to the backend system with the start- and enddate and wäit for a responce with
 *containing all reservation between this periode
 *
 * is is very important that the date have the format: yyyy-mm-dd  (2017-02-07)
 * */

function loadReservationChecker(startDate, endDate, object) {


    // TODO check if it ist OK
    var startdate = convertStringToDate(arrAllDayToSchowInKalendarStringFormat[0]);
    var endDate = convertStringToDate(arrAllDayToSchowInKalendarStringFormat[27]);

    $
        .ajax({
            type: 'POST',
            url: "./module_booking/services/service_getDataFromDefinePeriod.php",
            data: ({startDate: startdate, enddate: endDate, object: 'r006'}),
            dataType: "json"
        })
        .success(
            function (data) {

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