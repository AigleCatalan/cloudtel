<?php
include "../../configuration/databaseConnection_configuration.php";
header('content-type: application/json');
$json = file_get_contents('php://input');
$data = json_decode($json, true);
$process = $data['process'];

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
    return $result;
}

if ($process == "SUBMIT") {
	
	//get reservation lists
	$reservations = $data['data']['reservations'];
	
	for ($i = 0; $i < count($reservations); $i++) {
		echo"gut for".$reservations[$i]['startDate'];			
	}
    //case when the submit button is clicked
/*     if ($checkResult == "OK") {
        try {

            $statement = "INSERT INTO reservationposition ( arrival, departur) VALUES ('2017-05-01', '2017-05-01')";
            $statement->execute();
        } catch (Error $error) {
            echo $error;
        }
    }
    print_r(json_encode($checkResult)); */

} else {
	$reservation = $data['data'];
	$departure = $reservation['startDate'];
	$arrival = $reservation['endDate'];
	$object = $reservation['object'];
	
	$checkResult = checkReservationperiod($departure, $arrival, $object, $stmt);
    // case when the clone Button is clicked
    print_r(json_encode($checkResult));
}

//print_r(json_encode($result));
$pdo = null;

//
//$stmt->execute(array('object' => $object, ':arrival' => $arrival, ':departur' => $departure, ':arrival' => $arrival, ':departur' => $departure));
//$RoomNum_rows = $stmt->rowCount();
//
//$result = 'NOTOK';
//if ($RoomNum_rows > 0) {
//    $result = 'OK';
//}

