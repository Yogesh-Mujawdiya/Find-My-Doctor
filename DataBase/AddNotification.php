<?php
require_once('Config.php');
$response = array();
$UserType = $_POST['UserType'];
$Text = $_POST['Text'];
$reg = "insert into `notification`(`Type`, `Text`)  values('$UserType', '$Text')";
mysqli_query($con, $reg);
$response["status"] = "Success";
$response["message"] = "Notification Added successfully";
echo json_encode($response);
?>