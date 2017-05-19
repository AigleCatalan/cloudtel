/**
 * 
 */
function tableSelector() {

	var table = $("#hotelTable");
	var isMouseDown = false;
	var startRowIndex = null;
	var startCell = null;
	var startCellIndex = null;
	var EndRowIndex = null;
	var EndCellIndex = null;
	var data = {};

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
					  // Only marked as selected if current cell is not occupied.
					  if(checkIfSelectable(rowCells.eq(j).get(0)))
						  rowCells.eq(j).addClass("selected");
				}
		}		
	}
	
	function  checkIfSelectable(cell)
	{
		return cell.className !="besetzt"
	}
	
	table.find(".selectableTD").mousedown(function(e) {
		isMouseDown = true;
		startCell = $(this);
		table.find(".selected").removeClass("selected"); 
		
		if (e.shiftKey) {
			EndCellIndex = startCell.index();
			EndRowIndex = startCell.parent().index();
			
			if (checkIfSelectable(startCell.get(0)) && startRowIndex === EndRowIndex && startCellIndex < EndCellIndex){
				selectTo(startCell); 
			}else
				{
				    setNotAllowedCursor()
					resetSelection();
				}
					
		} else {
			// Check if the cell is not occupied before selected
			if (checkIfSelectable(startCell.get(0))){
				startCell.addClass("selected");	
				startCellIndex = startCell.index();
				startRowIndex = startCell.parent().index();					
			}else
				startRowIndex = null;
		}
		return false; // prevent text selection
	})

	// Mouseover event
	table.find(".selectableTD").mouseenter(function() {
		if (!isMouseDown)
			return;
		table.find(".selected").removeClass("selected");
		//Mark current cell
		var currentCell = $(this);
		
		// Really Basic but working stuff: Check if the user want to move to another row and if so
		// set up this cell to the startCellIndex
		if(startRowIndex === currentCell.parent().index()&& checkIfSelectable(currentCell.get(0))){
			// if left to right
			if(startCellIndex < currentCell.index()){
				selectTo(currentCell);
				EndCellIndex = currentCell.index();
				EndRowIndex = currentCell.parent().index();
			}
			else{
				 setNotAllowedCursor();			
				resetSelection();
			}
		}else	{
			     setNotAllowedCursor();
			    resetSelection();
		}
	 });
	
	function resetSelection(){
        console.log("reset up");

        EndCellIndex = startCell =startRowIndex = EndRowIndex = startCellIndex = null;
		    isMouseDown = false;
	}
	
	function setNotAllowedCursor()
	{
		table.find(".selectableTD").css( 'cursor', 'not-allowed');
	}
	
	table.find(".selectableTD")
			.mouseup(
					function() {

						if(startCellIndex != null && EndCellIndex != null && startCellIndex <EndCellIndex ){

							// store all information to data-Object.
							data.dateFrom = arrAllDayToSchowInKalendarStringFormat[startCellIndex];
							data.dateTo = arrAllDayToSchowInKalendarStringFormat[EndCellIndex];
							data.roomNr = document.getElementById("roomtable").rows[startRowIndex].cells[0].innerHTML;
							// set value;
							setModalValue();
							// open Modal.

                            console.log(document.body);
							 openNav();
							 resetSelection();
                        }else
							{
								   isMouseDown = false;
								   //reset mouse cursor
								   table.find(".selectableTD").css( 'cursor', 'cell');
							}
					});
	
	function setModalValue()
	{
		alert(data.roomNr);
		// var modalNav = document.getElementById("child1").children;
		// modalNav.room.value = data.roomNr;
		// modalNav.startdate.value = data.dateFrom;
		// modalNav.enddate.value = data.dateTo;
	}

}