<?php
include "../../configuration/databaseConnection_configuration.php";
header('content-type: application/json');
$json = file_get_contents('php://input');
$data = json_decode($json, true);
$process = $data['process'];

$stmtGetRoomID = $pdo->prepare("SELECT object.objectId FROM object WHERE object.description = :roomDescription");
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


function checkReservationperiod($departure, $arrival, $object, $stmt)
{

    $stmt->execute(array('object' => $object, ':arrival' => $arrival, ':departur' => $departure, ':arrival' => $arrival, ':departur' => $departure));
    $RoomNum_rows = $stmt->rowCount();

    $result = 'OK';
    if ($RoomNum_rows > 0) {
        $result = 'NOTOK';
    }
//    echo("checkreservationresult from romm: " . $object . " startdate: " . $arrival . " enddate: " . $departure . " result: " . $result);
    return $result;
}

if ($process == "SUBMIT") {

    // get Information of the Last reservationpositon in order to do a Backend verification
    $reservations = $data['data']['reservations'];
    $lastDeparture = $reservations[count($reservations) - 1]['startDate'];
    $LastArrival = $reservations[count($reservations) - 1]['endDate'];
    $LastObject = $reservations [count($reservations) - 1]['object'];

    // backing checking for the last reservationposition
    $checkResult = checkReservationperiod($LastArrival, $lastDeparture, $LastObject, $stmt);

    // when the Backend verification of the last Reservationposition is OK
    if ($checkResult == "OK") {

        //TODO update after define the approach with team
        //Insering reservation with client-information
        $stmtInsertReservation = $pdo->prepare("INSERT INTO reservation ( endPrice, client_clientId) VALUES (1234, 2)");
        $stmtInsertReservation->execute();
        $reservationID = $pdo->lastInsertId();

        //Insering all reservtion positions
        for ($i = 0; $i < count($reservations); $i++) {
            $arrival = $reservations[$i]['startDate'];
            $departure = $reservations[$i]['endDate'];
            $object = $reservations[$i]['object'];
            echo ($arrival.$departure);

            //fetch the RoomId with the help of description
            $stmtGetRoomID->bindParam(':roomDescription', $object);
            $stmtGetRoomID->execute();
            $roomID = $stmtGetRoomID->fetch();
            $roomID = $roomID["objectId"];

            //TODO please think to update parameters
            try {
                $statement = $pdo->prepare("INSERT INTO reservationposition (arrival, departur, price, commentar,reservation_reservationId, object_objectId) VALUES ($arrival, $departure,123, 'commentar not yet available ',$reservationID, $roomID)");
                $statement->execute();
            } catch (Error $error) {
                echo $error;
            }
            echo "reservation position insert " . $reservations[$i]['startDate'];
            $roomID = null;
        }
    }
    echo("result from SUBMIT: " . $checkResult );
    print_r(json_encode($checkResult));

} else {
    // case when the clone Button is clicked
    $reservation = $data['data'];
    $departure = $reservation['startDate'];
    $arrival = $reservation['endDate'];
    $object = $reservation['object'];

    $checkResult = checkReservationperiod($departure, $arrival, $object, $stmt);
//    echo("result from CLONE-DIV: " . $checkResult);
    print_r(json_encode($checkResult));
}
//reset pdo
$pdo = null;

