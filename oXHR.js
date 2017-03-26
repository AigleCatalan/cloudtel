function getXMLHttpRequest(){

	var xhr = null;

	if(window.XMLHttpRequest || window.ActiveXObject){

	    if (window.XMLHttpRequest){//Google Chrome, Mozilla Firefox, Opera, Safari, IE 7
		    
		    xhr = new XMLHttpRequest();
			
			}
	   
	    else if(window.ActiveXObject){// Internet Explorer 6 und niedriger
	        
			//xhr = new ActiveXObject("Microsoft.XMLHTTP");
			
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		
		try{
	            //xhr = new ActiveXObject("Msxml2.XMLHTTP");
				
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
	      
	      }catch(e){
	           
	            //xhr = new ActiveXObject("Microsoft.XMLHTTP");
	       
	        }
	   
	    }else{
	          
	          alert("Your Browser do not support object XMLHTTPRequest...");
	         //xhr = null;
	    }
	
	}

	return xhr;

}