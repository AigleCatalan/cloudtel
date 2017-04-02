<?php


			// Database Connection
$connect = mysql_connect ( "Localhost", "root", "test" ) or die ( "could not connect to database" );

mysql_select_db ( 'hotelverw' ) or die ( "could not find the database!" . mysqli_connect_error () );

?>

