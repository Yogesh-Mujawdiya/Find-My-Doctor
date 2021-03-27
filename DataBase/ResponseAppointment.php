<?php
require_once('Config.php');
$response = array();
$User_Mobile = $_POST['User_Mobile'];
$Doctor_Mobile = $_POST['Doctor_Mobile'];
$Date_Time = $_POST['Date_Time'];
$Status = $_POST['Status'];
$reg = "update `appointment` Set Status='$Status' WHERE 
User_Mobile_No='$User_Mobile' and Dr_Mobile_No='$Doctor_Mobile'";
mysqli_query($con, $reg);
$response["status"] = "Success";
$response["message"] = "Updation successfully";
echo json_encode($response);
?>