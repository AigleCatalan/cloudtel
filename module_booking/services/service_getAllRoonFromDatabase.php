<?php
include "././configuration/databaseConnection_configuration.php";

$roomTable = '';
$arrayRoomData = array();

$stmt = $pdo->prepare("SELECT *FROM object");
$stmt->execute();
$RoomNum_rows = $stmt->rowCount();

while ($row = $stmt->fetch()) {
    array_push($arrayRoomData, $row ['description']);
    $roomTable .= '<tr><td>' . $row ['description'] . '</td></tr>';
}
$pdo = null;
