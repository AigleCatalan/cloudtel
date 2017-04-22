/**
 * 
 */

//TODO: setting the start- and endDate as Parameters 
function loadData() {

	var startdate = "2016-11-11";
	var endDate = "2016-12-08";

	$
	.ajax({
				type : 'POST',
				url : "./module_booking/services/service_getDataFromDefinePeriod.php",
				data: ({startDate: endDate, enddate:startdate}),
				dataType : "json"
			})
			.success(
					function(data) {d
						for (var i = 0; i < data.length; i++) {

							var startAndEndreservaitionPeriod = '';
							startAndEndreservaitionPeriod = new Array();
							var name = data[i].kName;
							var objekt = data[i].objNr;
							var reservNr = data[i].reservNr;
							var ankunf = data[i].ankunftDate;
							startAndEndreservaitionPeriod.push(ankunf);
							ankunf = dateToString(ankunf);
							var ankunfDay = splitString(ankunf, 0);
							var auszug = data[i].auszugDate;
							startAndEndreservaitionPeriod.push(auszug);
							auszug = dateToString(auszug);
							var auszugDay = splitString(auszug, 0);
							var indexZimmer = getCell(objekt, "#roomtable");
							// console.log("indexZimmer " + indexZimmer);

							var indexEinzug = getCell(ankunfDay, "#hotelTable");
							// console.log("indexEinzug " + indexEinzug);

							var indexAuszug = getCell(auszugDay, "#hotelTable");
							// console.log("indexAuszug " + indexAuszug);

							if (indexEinzug[0] != -1) {
								$('#hotelTable').find(
										'tr:eq(' + indexZimmer[0] + ')').find(
										'td:eq(' + indexEinzug[1] + ')').html(
										name);
							} else {

								$('#hotelTable').find(
										'tr:eq(' + indexZimmer[0] + ')').find(
										'td:eq(' + 0 + ')').html(name);

							}
							// get the Duration of the Reservations
							var stayDuration = generateListOfDate(startAndEndreservaitionPeriod);
							for (var j = 0; j < stayDuration.length; j++) {

								var splitStayDay = stayDuration[j].split(".");
								var dateIndex = getCell(splitStayDay[0],
										"#hotelTable");
								// console.log("di "+ dateIndex[1]);
								$('#hotelTable').find(
										'tr:eq(' + indexZimmer[0] + ')').find(
										'td:eq(' + dateIndex[1] + ')')
										.addClass("besetzt").removeClass(
												"selectableTD").attr(
												"disabled", true);
								// console.log(dateIndex)

							}
						}

						// })

					});

}