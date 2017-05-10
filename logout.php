<?php 
	session_start();
	if(session_destroy()) // Destroying All Sessions
	{
		header("Location: process.php"); // Redirecting To Home Page
	}
?>
