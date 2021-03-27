<?php
require_once('Config.php');
$response = array();
$MobileNo = $_POST['MobileNo'];
$reg = "DELETE FROM `doctor` WHERE Mobile_No='$MobileNo'";
mysqli_query($con, $reg);
$response["status"] = "Success";
$response["message"] = "Deletetion successfully";
echo json_encode($response);
?>