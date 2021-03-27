<?php
require_once('Config.php');
$response = array();
$FullName = $_POST['FullName'];
$MobileNo = $_POST['MobileNo'];
$DOB = $_POST['DOB'];
$Password = $_POST['Password'];
$Gender = $_POST['Gender'];
$s = "select * from customer where MobileNumber= '$MobileNo'";
$result = mysqli_query($con, $s);
$num = mysqli_num_rows($result);
if ($num >= 1) {
	$response["status"] = "False";
	$response["message"] = "Mobile No. already exist as a Customer";
} else {
	$s = "select * from doctor where Mobile_No= '$MobileNo'";
	$result = mysqli_query($con, $s);
	$num = mysqli_num_rows($result);
	if ($num >= 1) {
		$response["status"] = "False";
		$response["message"] = "Mobile No. already exist as a Doctor";
	} else {
		$reg = "insert into customer(`Name`, `MobileNumber`, `Gender`, `DOB`, `Password`) values('$FullName','$MobileNo','$Gender','$DOB','$Password')";
		mysqli_query($con, $reg);
		$response["status"] = "True";
		$response["message"] = "Registration successfully";
	}
}
echo json_encode($response);
?>