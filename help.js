
/**
*
*@autor : Edmond
*@version : 02 November 2016
*
**/

//This function helps to add a new booking by cloning the inputs fields of the form
 function cloneDiv(){ //beginn of cloneDiv
           
           //Div with the id personAttribute
		   var oParentDiv = document.getElementById("personAttribute");
		   
			//Count the number of div inside oParentDiv and add 1
			//var iNberOfDiv = oParentDiv.getElementsByTagName("div").length+1;
			var iNberOfDiv = oParentDiv.getElementsByTagName("div").length;

			var oNewDiv ={};

			var  strIdOfFirstDiv = "";

			strIdOfFirstDiv = "child"+(iNberOfDiv).toString();//child1

			var x = document.getElementById(strIdOfFirstDiv).getElementsByTagName('input').length;

			for (var i = x - 1; i >= 0; i--) {

				console.log("Values: "+document.getElementById(strIdOfFirstDiv).getElementsByTagName('input')[i].value);
			}
        
	        for (var i = iNberOfDiv - 1; i >= 0; i--) {

                  strIdOfFirstDiv = "child"+(iNberOfDiv).toString();//child1

                  //console.log(strIdOfFirstDiv);



                  //create a copy of the <div> element and its child nodes
                  oNewDiv = document.getElementById(strIdOfFirstDiv).cloneNode(true); 
				  
				//  http://stackoverflow.com/questions/2441061/problem-when-cloning-jquery-ui-datepicker

                  //console.log(strParent); //child1
			       var oBtnWeiter = document.getElementById("myBtnWeiter");  

			       oBtnWeiter.disabled = true;                

	        	  //set an id-attribut for the new div 
	        	  oNewDiv.id = "child" + (iNberOfDiv+1).toString();
	        		
	        	}		
      
			//var oNewDiv = document.getElementById("child1").cloneNode(true); 
			
			//oNewDiv.id = "child"+ iNberOfDiv;
			
             console.log(oNewDiv);

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

            	 console.log("tetette"+ifactor);

            	if (oParentDiv.getElementsByTagName("div")[ifactor]) {

            		 //console.log("...."+oParentDiv.getElementsByTagName("div")[ifactor].id);

			          for(var x = 0; x < oParentDiv.getElementsByTagName("div")[ifactor].getElementsByTagName('input').length; x++){
			           
							 oParentDiv.getElementsByTagName("div")[ifactor].getElementsByTagName('input')[x].disabled=true;
										
						}

            	}

            	

            }
  } // end of cloneDiv
  
  /* 
   *
   * Check if the inputs fields inside the <form> element are set.
   * Enable the <addUser> button.
   * 
   */
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


			
}// end of checkData

function disableButtonAddUser(elt){

var bIsEmpty= false;

var oBtnWeiter = document.getElementById("myBtnWeiter");

 oBtnWeiter.disabled = false;

}
