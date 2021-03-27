<?php
require_once('Config.php');
$response = array();
$Doctor_Mobile = $_POST['Doctor_Mobile'];
$Status = $_POST['Status'];
$reg = "update `doctor` Set Status='$Status' WHERE Mobile_No='$Doctor_Mobile'";
mysqli_query($con, $reg);
$response["status"] = "Success";
$response["message"] = "Updation successfully";
echo json_encode($response);
?>