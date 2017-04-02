/**
 * 
 */
function tableSelector() {

	var table = $("#hotelTable");
	var isMouseDown = false;
	var startRowIndex = null;
	var startCellIndex = null;
	var EndRowIndex = null;
	var EndCellIndex = null;
	var test = null;
	var test2 = null;
	var test3 = null;

	function selectTo(cell) {

		var row = cell.parent();
		var cellIndex = cell.index();
		var rowIndex = row.index();

		var rowStart, rowEnd, cellStart, cellEnd;

		if (rowIndex < startRowIndex) {
			rowStart = rowIndex;
			rowEnd = startRowIndex;
		} else {
			rowStart = startRowIndex;
			rowEnd = rowIndex;
		}

		if (cellIndex < startCellIndex) {
			cellStart = cellIndex;
			cellEnd = startCellIndex;

		} else {
			cellStart = startCellIndex;
			cellEnd = cellIndex;

		}

		for (var i = rowStart; i <= rowEnd; i++) {
			var rowCells = table.find("tr").eq(i).find("td");

			//while (rowCells.getClassName == ".selectableTD") {
				for (var j = cellStart; j <= cellEnd; j++) {
					rowCells.eq(j).addClass("selected");
				}
			//}
		}

	}

	table.find(".selectableTD").mousedown(function(e) {
		isMouseDown = true;
		var cell = $(this);
		table.find(".selected").removeClass("selected"); // deselect

		if (e.shiftKey) {
			selectTo(cell);
		} else {
			cell.addClass("selected");
			startCellIndex = cell.index();
			startRowIndex = cell.parent().index();
			test = "cell:" + startCellIndex + " row:" + startRowIndex;
		}

		return false; // prevent text selection
	}).mouseover(function() {
		if (!isMouseDown)
			return;
		table.find(".selected").removeClass("selected");
		selectTo($(this));
		EndCellIndex = $(this).index();
		EndRowIndex = $(this).parent().index();

		test2 = "  // cellEnd:" + EndCellIndex + " :rowEnd" + EndRowIndex;
	});
	// .bind("selectstart", function() {
	// return true;
	// });

	table
			.find(".selectableTD")
			.mouseup(
					function() {
						isMouseDown = false;
						test3 = (test + ":" + test2);
						var s = document.getElementById("inhalt");
						s.value = test3;
						isMouseDown = false;

						// get Content of Field
						var dateFrom = document.getElementById("hotelTable").rows[0].cells[startCellIndex].innerHTML;
						var roomNr = document.getElementById("roomtable").rows[startRowIndex].cells[0].innerHTML;

						// alert(test3 + " from: " + dateFrom + " zimmer: " +
						// roomNr);
						// reset the Variables.
						test2 = null;
						test3 = null;
					});

}