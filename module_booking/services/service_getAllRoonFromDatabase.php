<?php
include "././configuration/databaseConnection_configuration.php";

$roomTable = '';
$strRoomDescription = ''; //Information in order to fill the select-Box inside the sidenav
$arrayRoomData = array();

$stmt = $pdo->prepare("SELECT *FROM object");
$stmt->execute();
$RoomNum_rows = $stmt->rowCount();

while ($row = $stmt->fetch()) {
    array_push($arrayRoomData, $row ['description']);

        
     $strRoomDescription .= '<option>'.$row['description'].'</option>';

    $roomTable .= '<tr><td>' . $row ['description'] . '</td></tr>';
}
$pdo = null;
