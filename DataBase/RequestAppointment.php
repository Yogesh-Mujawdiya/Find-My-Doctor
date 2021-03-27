<?php
require_once('Config.php');
$response = array();
$User_Mobile = $_POST['User_Mobile'];
$Doctor_Mobile = $_POST['Doctor_Mobile'];
$Date_Time = $_POST['Date_Time'];
$reg = "insert into `appointment`(`User_Mobile_No`, `Dr_Mobile_No`, `Date`, `Status`)
values('$User_Mobile', '$Doctor_Mobile', '$Date_Time', 'Pending')";
mysqli_query($con, $reg);
$response["status"] = "Success";
$response["message"] = "Appointment Request Added successfully";
echo json_encode($response);
?>