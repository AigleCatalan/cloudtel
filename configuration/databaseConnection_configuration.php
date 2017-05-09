<?php

// Database Connection
$connect = mysql_connect ( "localhost", "root", "" ) or die ( "could not connect to database" );
mysql_select_db ( 'cloudteldb' ) or die ( "could not find the database!" . mysqli_connect_error () );

?>

