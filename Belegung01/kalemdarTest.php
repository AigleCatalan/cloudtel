<?php
include 'getRoonOfDb.php';
// include 'getReservierungData.php';
// include 'insertData.php';
?>
<html>
<head>
<script
	src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"
	type="text/javascript"></script>
<link rel="stylesheet" href="style.css">
<script src="global_vars.js" type="text/javascript"></script>
<script src="tableGenerate.js" type="text/javascript"></script>
<script type="text/javascript" src="help.js"></script>
<script type="text/javascript" id="tableSelect" src="tableSelector.js"></script>
<script type="text/javascript" id="tableSelect"
	src="loadDataFromDbAndShowInTheTable.js"></script>
<link rel="stylesheet"
	href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<!--  <link rel="stylesheet" href="/resources/demos/style.css">-->
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<!--   Testscrpiten für das Einfügen von für den kalendarpicker    -->
<script type="text/javascript">

$( function() {
    $( ".datepicker" ).datepicker();
  } );

</script>

<!--  end des TestScripts -->

<style type="text/css">
</style>

</head>
<body>
<div> 


	<div id="divKalendar">
		<div id="kalendarNavDiv">
			<button id="leftKalendar" onclick="leftClick()">
				<img alt="left" src="navLink.png">
			</button>
			<button id="RightKalendar" onclick="rigthClick()">
				<img alt="rigth" src="navRecht.png">
			</button>
		</div>
		<p style="clear: both;"></p>
		<div>
			<div class="floatTable" id="roomDiv">
				<table id="">
					<tr>
						<td></td>
					</tr>
				</table>
				<table id="roomtable">
					<tr>
						<td>Objekte</td>
					</tr>				
				<?php echo $roomTable?>						
				</table>
				<input type="hidden" class=" notVisible" id="roomRowNbr"
					value="<?php echo $RoomNum_rows?>">
			</div>
			<div class="floatTable" id="tableDiv"></div>
			<p style="clear: both;"></p>
		</div>
		<input type="text" id="inhalt" name="fname"><br>
	</div>
	<br>
	<br>
	<div id="content">
		<form action="" name="insert" method="post">
			Objekt-Nr: <input type="text" name="objekt" /> <br> <br> Name: <input
				type="text" name="name" /><br> <br> ANkunft: <input type="text"
				name="ankunf" class="datepicker" readonly="readonly" /> <br> <br>
			Auszug: <input type="text" name="auszug" class="datepicker" /> <br> <br>
			<input type="submit" value="Submit" name="anlegen">
		</form>

	<!-- ****************************************************************scripte****************************************************************** -->

	<script type="text/javascript">

	var endDate = "28.11.2016";
	
	var NbrOfRoomRows = parseInt(document.getElementById("roomRowNbr").value) + 1;
	
	document.getElementById("tableDiv").innerHTML= generateTable(NbrOfRoomRows, 28, endDate);
	
	loadData();
	onlyRead = $(".onlyRead");
	onlyRead.attr("disabled","disabled");
	tableSelector();

			// get the list of all Room-Object in js-format 
		var js_array = <?php echo json_encode($arrayRoomData); ?>;
		alert(js_array);

	// the function return the indexs of a cell in a table
	function getCell( cell, table )
	{	    
	    var result = $( table +' tr').find('td').filter(function(){
			return $(this).text()===cell;
		    });
		var index = new Array();
		index[0] =result.parent().index();
		index[1] =result.index();;	 	   
	    return index;    
	 }

	 function leftClick(){
		 var endDateVormat = stringToDate(endDate);
		 
		 	endDateVormat.setDate(endDateVormat.getDate() - 14);
			endDateVormat = dateToString(endDateVormat);
			endDate = endDateVormat;
		 document.getElementById("tableDiv").innerHTML = generateTable(NbrOfRoomRows, 28, endDate);
		 loadData();
		 tableSelector();
		 
	 }

	function rigthClick(){

		 var endDateVormat = stringToDate(endDate);
		 endDateVormat.setDate(endDateVormat.getDate() + 14);
		 endDateVormat = dateToString(endDateVormat);
		endDate = endDateVormat;
		 document.getElementById("tableDiv").innerHTML = generateTable(NbrOfRoomRows, 28,endDate);
		 loadData();
		 tableSelector();
	 }

	// change the value of a cell content
// 	function setRowPrice(tableId, rowId, colNum, newValue)
// 	{
// 	    $('#'+table).find('tr#'+rowId).find('td:eq(colNum)').html(newValue);
// 	}
	</script>


	

</body>
</html>