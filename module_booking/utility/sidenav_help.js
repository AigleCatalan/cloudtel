
/**
*
*@autor : Edmond
*@version : November 2016
*
**/

/**
 *
 * This function helps to add a new booking by cloning the inputs fields
 * of the form
 *
 **/
 function cloneDiv(){ //beginn of cloneDiv
           
           //Div with the id personAttribute
		   var oParentDiv = document.getElementById("personAttribute");
		   
		   //Count the number of div inside oParentDiv 
		   var iNberOfDiv = oParentDiv.getElementsByTagName("div").length;

		   var oNewDiv ={};

		   var  strIdOfFirstDiv = "";

			strIdOfFirstDiv = "child"+(iNberOfDiv).toString();//child1

		   var x = document.getElementById(strIdOfFirstDiv).getElementsByTagName('input').length;

			for (var i = x - 1; i >= 0; i--) {

				console.log("Values: "+document.getElementById(strIdOfFirstDiv).getElementsByTagName('input')[i].value);
			}
        
	        for (var i = iNberOfDiv - 1; i >= 0; i--) {

                  strIdOfFirstDiv = "child"+(iNberOfDiv).toString();

                  //create a copy of the <div> element and its child nodes
                  oNewDiv = document.getElementById(strIdOfFirstDiv).cloneNode(true); 
				  
				  //http://stackoverflow.com/questions/2441061/problem-when-cloning-jquery-ui-datepicker

			       var oBtnWeiter = document.getElementById("myBtnWeiter");  

			       oBtnWeiter.disabled = true;                

	        	  //set an id-attribut for the new div 
	        	  oNewDiv.id = "child" + (iNberOfDiv+1).toString();
	        		
	        	}		
      			
             //console.log(oNewDiv);

			var oInputs = oNewDiv.getElementsByTagName('input');
			
			var icount = oInputs.length;

			for(var i = 0; i < icount; i++){
				 
				 //clear the old value 
				 oInputs[i].value="";
				
			}

			//console.log("fe"+strIdOfFirstDiv);

			// Append the cloned <div> element to <div> with id="personAttribute"
			oParentDiv.appendChild(oNewDiv);
			
            for (var i = oParentDiv.getElementsByTagName("div").length - 1; i >= 0; i--) {

            	 var ifactor = oParentDiv.getElementsByTagName("div").length-2;

            	 //console.log("tetette"+ifactor);

            	if (oParentDiv.getElementsByTagName("div")[ifactor]) {

            		 //console.log("...."+oParentDiv.getElementsByTagName("div")[ifactor].id);

			          for(var x = 0; x < oParentDiv.getElementsByTagName("div")[ifactor].getElementsByTagName('input').length; x++){
			           
							 oParentDiv.getElementsByTagName("div")[ifactor].getElementsByTagName('input')[x].disabled=true;
										
						}

            	}	

            }

  } // end of cloneDiv


//
// function openNav(){
//
//
// 	    childCounter = 1;
//         document.getElementById("mySidenav").style.position = "absolute";
//         document.getElementById("mySidenav").style.width = "500px";
//         document.body.style.backgroundColor = "rgba(0,0,0,0.1)";
//
//         var parEl = document.getElementById("personAttribute");
//         var index = parEl.childElementCount;
//
//         if (index > 0) {
//             for (var i = 1; i <= index; i++) {
//                 var elem = document.getElementById("child" + i);
//                 elem.parentNode.removeChild(elem);
//             }
//         }
//         CreateDivInSidenav();
//
// }

function closeNav(){

    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";

}

 function changeDisabledAttributeValue(sIdOfElt) { // begin of changeDisabledAttributeValue

        var oElement = document.getElementById(sIdOfElt);

        if (oElement.disabled) {
            oElement.disabled = true; //sperren
        } else {
            oElement.disabled = true; //set value to true "sperren"
        }
    } // end of changeDisabledAttributeValue


        function CreateDivInSidenav(){

        var childDiv = document.createElement('div');
        var childId = "child" + childCounter;
        childDiv.setAttribute("id", childId);
        childDiv.innerHTML = childContent();
        document.getElementById("personAttribute").appendChild(childDiv);
        childCounter++;

        changeDisabledAttributeValue("myBtnWeiter");

        $('.childOfDiv').each(function () {

            if ($(this).attr('name') === "startdate" || $(this).attr('name') === "enddate") {

                $(this).datepicker({
                    dateFormat: "dd.mm.yy",
                    onClose: function () {
                        var sCheckDate = validate($(this).val());
                        return sCheckDate;
                    }
                });

            }
        });
    }
  
  /**
   *
   * Check if the inputs fields inside the <form> element are set.
   * Enable the <addUser> button.
   * 
   **/
  function checkData(elt){ // beginn of checkData

			var bIsEmpty= false;
			
			// save id of element concerned
			var strParent = elt.parentElement.id;
			
			//console.log(strParent); //child1
			
			var oBtnWeiter = document.getElementById("myBtnWeiter");
            
			//get all element with attribute class 'childOfDiv' within the parent div element
			var aElts = document.getElementById(strParent).getElementsByClassName("childOfDiv");
			
			// count and save Elements with attribute class 'childOfDiv'
			var iCountElts = aElts.length;

			//console.log("Edmond"+iCountElts); 
			
			 for(var i = 0; i < iCountElts; i++){
           
				 if( aElts[i].value == null || aElts[i].value == ""){
				

				 // console.log("leer"+aElts[i].value);

					bIsEmpty = true;

					oBtnWeiter.disabled = true;

				}else{
					 //console.log("value"+aElts[i].value);

				}
							
			}   
			
             if(bIsEmpty == false){
			 
               oBtnWeiter.disabled = false;
			 
			}

			//console.log(bIsEmpty);//false
			return bIsEmpty;


			
} // end of checkData


function disableButtonAddUser(elt){ // begin of disableButtonAddUsser

var bIsEmpty= false;

var oBtnWeiter = document.getElementById("myBtnWeiter");

 oBtnWeiter.disabled = false;

} // end of disableButtonAddUsser

/** 
 * 26.03.2017
 * Create an array-object, then fill it with form-data.
 * Store the data in the array-object and convert it to Json.
 * 
 **/
function getJsonData(){ // begin of getJsonData

var oEmptyArray = {"items":[]}; 

 $('[id^=child]').each(function(){ // loop in to the input's wrapper  

     var obj = {

	    startdate :  $(this).find("input[name*='startdate']").val(), // place the startdate in a new object. name is = startdate
	    
	    enddate   :  $(this).find("input[name*='enddate']").val(), // place the enddate in a new object
        
        firstname :  $(this).find("input[name^='first']").val(), // place the firstname in a new object. name startswith first
       
        lastname  : $(this).find("input[name^='last']").val() // place the lastname in a new object
      
      };
      
      oEmptyArray.items.push(obj); // push in the "oEmptyArray" object created
   
    });

    var oFilled = JSON.stringify(oEmptyArray);    	

     return oFilled; // send an JSON-String-objet(s) back. 
    
} // end of getJsonData


/**
* 
* Check if require fields are given.
* 
**/
function validate(dateText){ //begin of validate
        
		  var  sErrorMsg="";
		  
		    if(dateText == null || dateText== ""){
			   
			      sErrorMsg ="Empty date not allowed!"
				 
				  console.log(sErrorMsg);
				 // bIsEmpty = !bIsEmpty;
			   }
			   
			return sErrorMsg;
		
} // end of validate
