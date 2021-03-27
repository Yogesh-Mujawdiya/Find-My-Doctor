<?php
require_once('Config.php');
$response = array();
$AppointmentList = array();
$Mobile = $_POST['Mobile'];
$R = mysqli_query($con, "SELECT * FROM appointment where Dr_Mobile_No='$Mobile'");
$i = 0;
while ($I = mysqli_fetch_array($R)) {
	$AppointmentList[$i]["Appointment"]["Id"] = $I["Id"];
	$AppointmentList[$i]["Appointment"]["User_Mobile_No"] = $I["User_Mobile_No"];
	$AppointmentList[$i]["Appointment"]["Dr_Mobile_No"] = $I["Dr_Mobile_No"];
	$AppointmentList[$i]["Appointment"]["Date_Time"] = $I["Date"];
	$AppointmentList[$i]["Appointment"]["Status"] = $I["Status"];
	$userMobile = $I["User_Mobile_No"];
	$User = array();
	$s = "select * from customer where MobileNumber='$userMobile'";
	$result = mysqli_query($con, $s);
	$num = mysqli_num_rows($result);
	if ($num == 1) {
		$r = $result->fetch_assoc();
		$User['Id'] = $r["Id"];
		$User['Full_Name'] = $r["Name"];
		$User['Mobile'] = $r["MobileNumber"];
		$User['Gender'] = $r["Gender"];
		$User['DOB'] = $r["DOB"];
	}
	$AppointmentList[$i]["User"] = $User;
	$i += 1;
}
$response["AppointmentList"] = $AppointmentList;
$response["status"] = "True";
$response["message"] = "Data Fetch !";
echo json_encode($response);
