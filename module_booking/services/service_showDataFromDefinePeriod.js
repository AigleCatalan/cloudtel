/**
 *
 */

//TODO: setting the start- and endDate as Parameters 
function loadData() {

    var startdate = stringToDatet(allDayToSchowInKalendar[0]);
    var endDate = stringToDatet(allDayToSchowInKalendar[27]);

    alert("strat " + startdate + "end " + endDate);
    $
        .ajax({
            type: 'POST',
            url: "./module_booking/services/service_getDataFromDefinePeriod.php",
            data: ({startDate: startdate, enddate: endDate}),
            dataType: "json"
        })
        .success(
            function (data) {
                alert("return");
                var allDayString = getAllDayShows();
                // alert(data.length);

                for (var i = 0; i < data.length; i++) {

                    var startAndEndreservaitionPeriod = new Array();
                    var name = data[i].kName;
                    var objekt = data[i].objectDescription;
                    var reservNr = data[i].reservNr;
                    var ankunf = data[i].arrivalDate;
                    var auszug = data[i].departureDate;

                    var arrivateDate = new Date(ankunf);
                    var depatureDate = new Date(auszug);
                    var arrivateDayAndMonth = arrivateDate.getDate() + '-' + arrivateDate.getMonth();
                    var departureDateMonth = depatureDate.getDate() + '-' + depatureDate.getMonth();


                    startAndEndreservaitionPeriod.push(ankunf);
                    ankunf = dateToString(ankunf);
                    var ankunfDay = splitString(ankunf, 0);

                    startAndEndreservaitionPeriod.push(auszug);
                    auszug = dateToString(auszug);
                    var auszugDay = splitString(auszug, 0);
                    var indexZimmer = getCell(objekt, "#roomtable");

                    //array index from anzug and auszug in form [romm, day]
                    var indexEinzug = getCell(ankunfDay, "#hotelTable");
                    var indexAuszug = getCell(auszugDay, "#hotelTable");

                    //dayIndex from arrival an departure  in string
                    var indexArrivalDay = indexEinzug[1];
                    var indexDepartureDay = indexAuszug[1];

                    // departure and arrival know
                    if ($.inArray(arrivateDayAndMonth, prototypMonthDay) >= 0 && $.inArray(departureDateMonth, prototypMonthDay) >= 0) {

                        var duration = daydiff(arrivateDate, depatureDate);
                        duration = duration * 102;
                        var indexArrival = getCell(arrivateDate.getDate().toString(), "#hotelTable");

                        // console.log("index" + indexArrival[1] + "arr" + arrivateDate.getDate().toString() + " ind "  + indexArrival[0]);
                        $('#hotelTable').find(
                            'tr:eq(' + indexZimmer[0] + ')').find(
                            'td:eq(' + indexArrival[1] + ')').find('.bookingcontent').html(
                            name).css({
                            position: 'relative',
                            backgroundColor: 'red',
                            width: duration + '%',
                            padding: '8px 0 0 0'
                        });


                        var cellPosition = getCell(depatureDate.getDate().toString(), "#hotelTable");

                        for (var count = (indexArrival[1]); count < cellPosition[1]; count++) {

                            // console.log("count" + count);
                            $('#hotelTable').find(
                                'tr:eq(' + indexZimmer[0] + ')').find(
                                'td:eq(' + count + ')')
                                .addClass("besetzt").removeClass(
                                "selectableTD").attr(
                                "disabled", true);
                        }

                    }

                    // arivale not know
                    if ($.inArray(arrivateDayAndMonth, prototypMonthDay) >= 0 && $.inArray(departureDateMonth, prototypMonthDay) < 0) {
                        var lastDayInTablle = allDayToSchowInKalendarIndate[allDayToSchowInKalendarIndate.length - 1];
                        var duration = daydiff(arrivateDate, lastDayInTablle);
                        duration = (duration + 1) * 102;

                        var indexArrival = getCell(arrivateDate.getDate().toString(), "#hotelTable");

                        // console.log("index" + indexArrival[1] + "arr" + arrivateDate.getDate().toString() + " ind "  + indexArrival[0]);
                        $('#hotelTable').find(
                            'tr:eq(' + indexZimmer[0] + ')').find(
                            'td:eq(' + indexArrival[1] + ')').find('.bookingcontent').html(
                            name).css({
                            position: 'relative',
                            backgroundColor: 'red',
                            width: duration + '%',
                            padding: '8px 0 0 0'
                        });

                        var arrCellPosition = getCell(arrivateDate.getDate().toString(), "#hotelTable");
                        var lastCellPosition = getCell(lastDayInTablle.getDate().toString(), "#hotelTable");


                        for (var count = arrCellPosition[1]; count < lastCellPosition[1]; count++) {

                            $('#hotelTable').find(
                                'tr:eq(' + indexZimmer[0] + ')').find(
                                'td:eq(' + count + ')')
                                .addClass("besetzt").removeClass(
                                "selectableTD").attr(
                                "disabled", true);
                        }

                    }

                    // departure not know
                    if ($.inArray(arrivateDayAndMonth, prototypMonthDay) < 0 && $.inArray(departureDateMonth, prototypMonthDay) >= 0) {
                        var firstDayInTabelle = allDayToSchowInKalendarIndate[0];
                        var duration = daydiff(firstDayInTabelle, depatureDate);
                        duration = duration * 102;

                        var indexdeparture = getCell(firstDayInTabelle.getDate().toString(), "#hotelTable");

                        $('#hotelTable').find(
                            'tr:eq(' + indexZimmer[0] + ')').find(
                            'td:eq(' + indexdeparture[1] + ')').find('.bookingcontent').html(
                            name).css({
                            position: 'relative',
                            backgroundColor: 'red',
                            width: duration + '%',
                            padding: '8px 0 0 0'
                        });

                        var firstCellPosition = getCell(firstDayInTabelle.getDate().toString(), "#hotelTable");
                        var deparCellPosition = getCell(depatureDate.getDate().toString(), "#hotelTable");

                        for (var count = firstCellPosition[1]; count < deparCellPosition[1]; count++) {

                            $('#hotelTable').find(
                                'tr:eq(' + indexZimmer[0] + ')').find(
                                'td:eq(' + count + ')')
                                .addClass("besetzt").removeClass(
                                "selectableTD").attr(
                                "disabled", true);
                        }

                    }

                    // longer that 28 days
                    //TODO: check why is not work
                    if ($.inArray(arrivateDayAndMonth, prototypMonthDay) < 0 && $.inArray(departureDateMonth, prototypMonthDay) < 0) {
                        console.log("found");
                        var firstDayInTabelle = allDayToSchowInKalendarIndate[0];
                        var duration = 28 * 102;
                        var firstindex = getCell(firstDayInTabelle.getDate().toString(), "#hotelTable");

                        // console.log("index" + indexArrival[1] + "arr" + arrivateDate.getDate().toString() + " ind "  + indexArrival[0]);
                        $('#hotelTable').find(
                            'tr:eq(' + indexZimmer[0] + ')').find(
                            'td:eq(' + firstindex[1] + ')').find('.bookingcontent').html(
                            name).css({
                            position: 'relative',
                            backgroundColor: 'red',
                            width: duration + '%',
                            padding: '8px 0 0 0'
                        });

                    }

                    // console.log(objekt + "/-/     " + indexArrivalDay + " / " + indexDepartureDay);
                    // // prototyp
                    //
                    // // color the used field on the table
                    // // get the Duration of the Reservations
                    // var stayDuration = generateListOfDate(startAndEndreservaitionPeriod);
                    // for (var j = 0; j < stayDuration.length; j++) {
                    //
                    //     var splitStayDay = stayDuration[j].split(".");
                    //     var dateIndex = getCell(splitStayDay[0], "#hotelTable");
                    //     // console.log("di "+ dateIndex[1]);
                    //     $('#hotelTable').find(
                    //         'tr:eq(' + indexZimmer[0] + ')').find(
                    //         'td:eq(' + dateIndex[1] + ')')
                    //         .addClass("besetzt").removeClass(
                    //         "selectableTD").attr(
                    //         "disabled", true);
                    //     // console.log(dateIndex)
                    //
                    // }
                }
                console.log("------------------------")

            });
}

function stringToDatet(stringDate) {

    var strSplit = stringDate.split(".");
    var day = strSplit[0];
    var month = strSplit[1];
    var year = strSplit[2];
    var strdate = year + "-" + month + "-" + day;
    return strdate;
}

function getAllDayShows() {
    var listOfDayShows = new Array();
    for (var count = 0; count < allDayToSchowInKalendar.length; count++) {
        var day = splitString(allDayToSchowInKalendar[count], 0);
        listOfDayShows.push(day);
    }
    return listOfDayShows;
}