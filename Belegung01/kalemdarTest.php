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

<script type="text/javascript" src="ed_oXHR.js"></script>

<script type="text/javascript" src="ed_help.js"></script>

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
<div id="main"> 

	 <p id="console" > processing ...</p> <!-- print out json-->
    
      <div id="mySidenav" class="sidenav"> <!--- Beginn of sidenav-->

        <a class="closebtn" onclick="closeNav()">&times;</a> 
  
  	    <form id="addPerson" name ="addPerson" method="post" action="">
		
           <div id="personAttribute">
		  
			   <div id = "child1">	 
			            <br> 
						
						<input readonly="readonly" type="text" name="startdate"  class="childOfDiv" placeholder="Startdatum format tt.mm.jjjj" onkeyup="checkData(this);"> <p id="error"></p>
						
						 <input readonly="readonly" type="text" name="enddate"   class="childOfDiv" placeholder="Enddatum format tt.mm.jjjj" onkeyup="checkData(this);" >   <p id="errorMsg"></p> 
			   
						 <input type="text" name="firstname" class="childOfDiv"  onkeyup="checkData(this);" placeholder="Vorname*"><br>
						
						 <input type="text" name="lastname" class="childOfDiv" onkeyup="checkData(this);" placeholder="Nachname*"><br>
						
				</div>

			</div>

        </form>  
 
	  <button type="submit"  onclick="request(readData);"> Submit </button>
            
	  <button id="myBtnWeiter"  onclick="cloneDiv();" disabled> add More...</button> 	
		 
   </div> <!-- End of sidenav-->

   <div title="click to add reservation" onclick="openNav();" id="overlay"> <!--- Beginn of overlay-->

        <span>&lsaquo;</span>

   </div> <!--- Beginn of overlay-->


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
	</div>	<!-- end of content-->

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

<script>


/***************BEGINN OF FUNCTION SET JQUERY-DATEPIKER***********************
* 
* Set datepicker on choosen element 
*
******************************************************************************/

$('.childOfDiv').each(function (){
	   
	   if ($(this).attr('name') === "startdate" || $(this).attr('name')==="enddate"){
	
	     $(this).datepicker({ dateFormat: "dd.mm.yy",
                                 onClose: function(){

                                              var sCheckDate = validate($(this).val());

                                              return sCheckDate;

                                              }

                            });

	    }

    });

/***************END OF FUNCTION SET JQUERY-DATEPIKER**************************/


/***************BEGINN OF JQUERY-FUNCTION ************************************
* 
* This function will help to deal with datepicker issue after the clone ***
* We increment a variable nCount if the 'Add' button is clicked
* We Know that after the click the form is cloned so we select the new div
* We select the two first input because they must have an input and we remove 
* some attributes (e.g. hasDatepicker,id) and bind the datepicker again
*
***************************************************************************/

var nCount = 1;

$( "#myBtnWeiter" ).click(function() {

  nCount = nCount+1;
  
  var sIdOfClonedElt = "#"+"child"+nCount+" "+":input";
  
    //console.log($(sIdOfClonedElt).length);
	
	$(sIdOfClonedElt).each(function (index, value){
	
       //console.log($(this).attr('name'));
	   
	   if ($(this).attr('name') === "startdate" || $(this).attr('name')==="enddate"){
	
	     $(this).removeClass('hasDatepicker')
		       
            .removeAttr("id")
                
                .datepicker({ dateFormat: "dd.mm.yy",

                                 onClose: function(){

                                                var sCheckDate = validate($(this).val());

                                                 return sCheckDate;
                                                
                                                }

                            });

	    }

    });

 }); 
 
/***************END OF JQUERY-FUNCTION ************************************/



/// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event){
//console.log("inside 2 js "+event.target.nodeName);
   if (event.target.nodeName === "HTML"){
	
        /*
		   document.getElementById("mySidenav").style.display = "none";
		   document.getElementById("main").style.marginLeft= "0"; 
		 */
		 document.getElementById("mySidenav").style.width = "0";

     document.body.style.backgroundColor = "white";
		
		//console.log("inside 3 js ");
		
    }

}

function openNav(){

     /* 
	   document.getElementById("mySidenav").style.width = "850px";
	   document.getElementById("main").style.marginLeft = "0px";
	   document.body.style.overflow-y = "scroll"; Add vertical scrollbar 
	   document.body.style.overflow-x = "hidden"; /* Hide horizontal scrollbar
       document.body.style.overflow = "scroll"; 	   
	 */
     //document.body.style.overflow ="scroll";
	 document.getElementById("mySidenav").style.position ="absolute";

	 document.getElementById("mySidenav").style.width ="500px";

	  //document.getElementById("mySidenav").style.height ="850px";
	 //document.getElementById("mySidenav").style.overflow ="scroll";

  document.body.style.backgroundColor = "rgba(0,0,0,0.1)";
	
}

function closeNav(){

    document.getElementById("mySidenav").style.width = "0";

    document.getElementById("main").style.marginLeft= "0";

    document.body.style.backgroundColor = "white";

}

function request(callback){

    var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function(){

        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){

            callback(xhr.responseText); //recuperation de donnees sous forme textuel


        }

    };

    var oStoredData = getJsonData();
  
    xhr.open("POST", "ed_service.php", true);
  
  //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.setRequestHeader("Content-Type", "application/json");

  //data = encodeURIComponent("saved")+"="+encodeURIComponent(JSON.stringify(data));

  //alert(data);
  
    xhr.send(oStoredData);

     document.getElementById("mySidenav").style.width = "0";

    document.getElementById("main").style.marginLeft= "0";

    document.body.style.backgroundColor = "white";

}

function readData(sData){

    if (sData) {

      //  alert("C'est bon"+sData);

      document.getElementById("console").innerHTML = "...."+sData;

    } else {

        alert("Y'a eu un problème");

    }

}


</script>
	
</div> <!-- end of main-->
</body>
</html>