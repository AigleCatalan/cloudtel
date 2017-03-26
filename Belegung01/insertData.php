<?php
$test = '';
include 'config.php';

$romData = mysql_query ( "SELECT * FROM reservierung where auszug > '2016-11-22' " ) or die ( "MySQL-Error" . mysql_error () );
$cont = 0;

while ( $row = mysql_fetch_assoc ( $romData ) ) {
	
	echo $row ['auszug'];
	echo '<br>';
	// $cont = $cont + 1;
	// $test .= $test . (' ' . $row ['objektID'] . '<br>');
}
echo "----------------";
// echo $test;
// echo $RoomNum_rows;
// echo $cont;

if (isset ( $_POST ['anlegen'] )) {
	
	$objekt = $_POST ['objekt'];
	$name = $_POST ['name'];
	
	$ankunf = $_POST ['ankunf'];
	
	$ankunf = date ( "Y/m/d H:i:s", strtotime ( $ankunf ) );
	// echo $ankunf;
	$auszug = $_POST ['auszug'];
	$auszug = date ( "Y/m/d H:i:s", strtotime ( $auszug ) );
	
	$query = mysql_query ( "INSERT INTO reservierung VALUES ('','$objekt','$name','$ankunf', '$auszug') " ) or die ( "MySQL-Error" . mysql_error () );
	
	// $succes = "rendevous reservez avec succes";
	
	// mysql_query ( "UPDATE freietermine SET status = 'belegt' WHERE ftID = '$resultID'" ) or die ( "MySQL-Error" . mysql_error () );
	
	if ($query === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: ";
	}
}


// else {
// 	$succes = "rendevous indisponible";
// }