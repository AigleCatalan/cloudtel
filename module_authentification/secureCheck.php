<?php
session_start();
	
	
	if(!isset($_SESSION['username'])) {
		header ('Location: /cloudtel/index.php');
	}
	

?>