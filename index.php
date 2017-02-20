<!DOCTYPE html>
<html>
<style>

html {
  position: relative;
  min-height: 100%;
}

body {
    font-family: "Lato", sans-serif;
    transition: background-color .5s;
}

.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    background-color: white;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 50px;
}

.sidenav a {
    padding: 8px 32px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s
}

.sidenav a:hover, .offcanvas a:focus{
    color: #f1f1f1;
}

.sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 20px;
    font-size: 35px;
    margin-left: 50px;
	 cursor:pointer;
	 border: 1px solid #AEAEAE;
    border-radius: 30px;
	 
}

#main {
    transition: margin-left .5s;
    padding: 6px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 18px;}
  .sidenav a {font-size: 18px;}
}

#addPerson input{

  display: block;
  margin-left:10%;
  
}

button{
 display: inline;
 margin-left:9.5%;
 margin-bottom:5%;
}

#overlay{
font-size:50px;
top: 40%;
width:75px;
color: white;
cursor:pointer;
position:fixed;
margin: 0 0 0% 97.5%;
background-color: gray;
padding: 2% 0% 2% 0%;
position:fixed;

}
</style>

<head>
 
  <title>Techniques AJAX - XMLHttpRequest</title>

   <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
  <script src="//code.jquery.com/jquery-1.12.4.js"></script>
  <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  
   <script>
		 
            window.onload = downScripts;

            function downScripts(){
			
					var element = document.createElement("script");
					element.src = "help.js";
					document.body.appendChild(element);
            }
			
        </script>

</head>
<body>



 <a id="close" class="closebtn" onclick="closeNav()" hidden>&rsaquo;</a>
	

<div id="mySidenav" class="sidenav">

  <a  class="closebtn" onclick="closeNav()">&times;</a> 
  
  	<form id="addPerson" name ="addPerson" method="post" action="index.php">
		
          <div id="personAttribute">
		  
			   <div id = "child1">	 
			            <br> 
						
						<input readonly="readonly" type="text" name="startdate"  class="childOfDiv" placeholder="Startdatum format tt.mm.jjjj" onkeyup="checkData(this);"> <p id="error"></p>
						
						 <input readonly="readonly" type="text" name="enddate"   class="childOfDiv" placeholder="Enddatum format tt.mm.jjjj" onkeyup="checkData(this);" >   <p id="errorMsg"></p> 
			   
						 <input type="text" name="firstname" class="childOfDiv"  onkeyup="checkData(this);" placeholder="Vorname*"><br>
						
						 <input type="text" name="lastname" class="childOfDiv" onkeyup="checkData(this);" placeholder="Nachname*"><br>
						
				</div>
				
           </div>
 
	       <button type="submit"  onclick="request(readData);"> Submit </button>
	
	       <!--<button type="submit"  onclick="saveData();"> Submit </button>  -->     
            
			 <button id="myBtnWeiter"  onclick="cloneDiv();" disabled> add More...</button> 
		   
        </form>
		
		 
</div>

<div id="main">
  <h2>Working on Function overlay</h2>
  <p>Click on the element below to open the side navigation menu, and push this content to the right. Notice that we add a black see-through background-color to body when the sidenav is opened.</p>
   <p>Notice that we add a black see-through background-color to body when the sidenav is opened.</p>
    <p>Click on the element below to open the side navigation menu, and push this content to the right. Notice that we add a black see-through background-color to body when the sidenav is opened.</p>
  <!--<span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span>-->
</div>
<div title="click to add reservation" onclick="openNav();" id="overlay">
<span>&lsaquo;</span>
</div>

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
                                     validate($(this).val());
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
  
    console.log($(sIdOfClonedElt).length);
	
	$(sIdOfClonedElt).each(function (index, value){
	
       //console.log($(this).attr('name'));
	   
	   if ($(this).attr('name') === "startdate" || $(this).attr('name')==="enddate"){
	
	     $(this).removeClass('hasDatepicker')
		        .removeAttr("id")
                .datepicker({ dateFormat: "dd.mm.yy",
                                 onClose: function(){
                                                validate($(this).val());
                                                }
                            });
	    }
    });
 }); 
 
/***************END OF JQUERY-FUNCTION ************************************/

function validate(dateText){
        
		  var  sErrorMsg="";
		  
		    if(dateText == null || dateText== ""){
			   
			      sErrorMsg ="Empty date not allowed!"
				 
				  console.log(sErrorMsg);
				 // bIsEmpty = !bIsEmpty;
			   }
			   
			return sErrorMsg;
		
    }


/// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
//console.log("inside 2 js "+event.target.nodeName);
   if (event.target.nodeName === "HTML") {
	
        /*
		   document.getElementById("mySidenav").style.display = "none";
		   document.getElementById("main").style.marginLeft= "0"; 
		 */
		 document.getElementById("mySidenav").style.width = "0";
         document.body.style.backgroundColor = "white";
		
		//console.log("inside 3 js ");
		
    }
}

function openNav() {

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



function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}


</script>
     
</body>
</html> 
