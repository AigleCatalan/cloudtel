<?php
			
		header('content-type:application/json');

		 $obj = file_get_contents('php://input');

		 $response = json_encode($obj);

		 echo 'salut vous venez de recevoir ces donnees:'.'<br />'.json_decode($response);

		 //DB-Verarbeitung
						  					
?>