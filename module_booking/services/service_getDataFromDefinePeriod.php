<?php
include "../../configuration/databaseConnection_configuration.php";
header('content-type: application/json');

$departure = $_POST['startDate'];
$arrival = $_POST['enddate'];
$query = "SELECT
  client.name,
  reservationposition.arrival,
  reservationposition.departur,
  object.objectId,
  object.description
FROM reservationposition
  INNER JOIN object ON reservationposition.object_objectId = object.objectId
  INNER JOIN reservation ON reservation.reservationId = reservationposition.reservation_reservationId
  INNER JOIN client ON client.clientId = reservation.client_clientId
  WHERE reservationposition.arrival BETWEEN '$departure' AND '$arrival'
OR
reservationposition.departur BETWEEN '$departure' AND '$arrival'
";

$mysqlQuuery = mysql_query($query);

$result = array();

// return a json datei with all the Reservations
while ($row = mysql_fetch_assoc($mysqlQuuery)) {

    $rowResult = array();
    $rowResult ['objectId'] = $row ['objectId'];
    $rowResult ['objectDescription'] = $row ['description'];
    $rowResult ['kName'] = $row ['name'];
    $rowResult ['arrivalDate'] = $row ['arrival'];
    $rowResult ['departureDate'] = $row ['departur'];

    $result [] = $rowResult;
}

// create the json-Structur
print_r(json_encode($result));

// close the mysql-connection
mysql_close($connect);

?>