<?php
header ( 'content-type: application/json' );

$connect = mysql_connect ( "Localhost", "root", "" ) or die ( "could not connect to database" );

mysql_select_db ( 'hotelverw' ) or die ( "could not find the database!" . mysqli_connect_error () );

// Data-query
$departure = $_POST['startDate'];
$arivate = $_POST['enddate'];
$ergebnis= "date " + $arivate;

$query = "SELECT * FROM reservierung WHERE einkunft <= '$departure' AND auszug >= '$arivate'";
$mysqlQuuery = mysql_query ( $query );

$result = array ();

// return a json datei with all the Reservations
while ( $row = mysql_fetch_assoc ( $mysqlQuuery ) ) {
// 	echo $row ['reserNr'];
// 	echo '<br>';
	
	$rowResult = array ();
	
	$rowResult ['reservNr'] = $row ['reserNr'];
	$rowResult ['objNr'] = $row ['onjnr'];
	$rowResult ['kName'] = $row ['name'];
	$rowResult ['ankunftDate'] = $row ['einkunft'];
	$rowResult ['auszugDate'] = $row ['auszug'];
	
	$result [] = $rowResult;
}

// create the json-Structur
print_r ( json_encode ( $result ) );

// close the mysql-connection
mysql_close ( $connect );

?>