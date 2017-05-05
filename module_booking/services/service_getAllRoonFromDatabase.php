<?php
include "././configuration/databaseConnection_configuration.php";

$roomTable = '';
$arrayRoomData  = array(); 
$roomData = mysql_query ( "SELECT *FROM object" ) or die ( "MySQL-Error" . mysql_error () );
$RoomNum_rows = mysql_num_rows ( $roomData );
echo $roomData;

while ( $k_row = mysql_fetch_assoc ( $roomData ) ) {
	array_push($arrayRoomData, $k_row ['description']);
	$roomTable .= '<tr><td>'.$k_row ['description'].'</td></tr>';
}

?>