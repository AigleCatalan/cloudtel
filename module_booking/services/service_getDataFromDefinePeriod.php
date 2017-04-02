<?php
include "../../configuration/databaseConnection_configuration.php";
header ( 'content-type: application/json' );

 $departure = $_POST['startDate'];
 $arivate = $_POST['enddate'];

$query = "SELECT * FROM reservierung WHERE einkunft <= '$departure' AND auszug >= '$arivate'";
$mysqlQuuery = mysql_query ( $query );

$result = array ();

// return a json datei with all the Reservations
while ( $row = mysql_fetch_assoc ( $mysqlQuuery ) ) {

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