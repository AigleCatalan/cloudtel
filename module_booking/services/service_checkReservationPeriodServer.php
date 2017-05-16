<?php
include "../../configuration/databaseConnection_configuration.php";
header('content-type: application/json');

$departure = $_POST['startDate'];
$arrival = $_POST['enddate'];
$object = $_POST['object'];

$stmt = $pdo->prepare("SELECT
  reservationposition.arrival,
  reservationposition.departur,
  object.objectId,
  object.description
FROM reservationposition
  INNER JOIN object ON reservationposition.object_objectId = object.objectId

WHERE object.description = :object AND (
      reservationposition.arrival BETWEEN :arrival AND :departur
      OR
      reservationposition.departur BETWEEN :arrival AND :departur)");

$stmt->execute(array('object' => $object, ':arrival' => $arrival, ':departur' => $departure, ':arrival' => $arrival, ':departur' => $departure));
$RoomNum_rows = $stmt->rowCount();

$result = 'false';
if ($RoomNum_rows > 0) {
    $result = 'true';
}
print_r(json_encode($result));
$pdo = null;