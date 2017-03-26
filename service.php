<?php
			
		header('content-type:application/json');

		 $obj = file_get_contents('php://input');

		 $response = json_encode($obj);

		 echo 'salut'.json_decode($response);

		 //DB-Verarbeitung
						  					
?>