<?php
require_once('Config.php');
$response = array();
$Id = $_POST['Id'];
$reg = "DELETE FROM `notification` WHERE Id='$Id'";
mysqli_query($con, $reg);
$response["status"] = "Success";
$response["message"] = "Deletetion successfully";
echo json_encode($response);
?>