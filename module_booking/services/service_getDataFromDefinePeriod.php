<?php
include "../../configuration/databaseConnection_configuration.php";
header('content-type: application/json');
$departure = $_POST['startDate'];
$arrival = $_POST['enddate'];
$stmt = $pdo->prepare("SELECT
  client.name,
  reservationposition.arrival,
  reservationposition.departur,
  object.objectId,
  object.description
FROM reservationposition
  INNER JOIN object ON reservationposition.object_objectId = object.objectId
  INNER JOIN reservation ON reservation.reservationId = reservationposition.reservation_reservationId
  INNER JOIN client ON client.clientId = reservation.client_clientId
  WHERE reservationposition.arrival BETWEEN :departur AND :arrival
OR
reservationposition.departur BETWEEN :departur AND :arrival
OR
DATEDIFF(reservationposition.departur, reservationposition.arrival) > 28");
$stmt->execute(array(':arrival' => $arrival, ':departur' => $departure, ':arrival' => $arrival, ':departur' => $departure));
$result = array();
// return a json datei with all the Reservations
while ($row = $stmt->fetch()) {
    $rowResult = array();
    $rowResult ['objectId'] = $row ['objectId'];
    $rowResult ['objectDescription'] = $row ['description'];
    $rowResult ['kName'] = $row ['name'];
    $rowResult ['arrivalDate'] = $row ['arrival'];
    $rowResult ['departureDate'] = $row ['departur'];
    $result [] = $rowResult;
}
print_r(json_encode($result));
$pdo = null;
