<?php
require_once('Config.php');
$response = array();
$AppointmentList = array();
$User_Mobile = $_POST['User_Mobile'];
$R = mysqli_query($con, "SELECT * FROM appointment where User_Mobile_No='$User_Mobile'");
$i = 0;
while ($I = mysqli_fetch_array($R)) {
	$AppointmentList[$i]["Appointment"]["Id"] = $I["Id"];
	$AppointmentList[$i]["Appointment"]["User_Mobile_No"] = $I["User_Mobile_No"];
	$AppointmentList[$i]["Appointment"]["Dr_Mobile_No"] = $I["Dr_Mobile_No"];
	$AppointmentList[$i]["Appointment"]["Date_Time"] = $I["Date"];
	$AppointmentList[$i]["Appointment"]["Status"] = $I["Status"];
	$DrMobile = $I["Dr_Mobile_No"];
	$Doctor = array();
	$s = "select * from doctor where Mobile_No='$DrMobile'";
	$result = mysqli_query($con, $s);
	$num = mysqli_num_rows($result);
	if ($num == 1) {
		$r = $result->fetch_assoc();
		$Doctor["Id"] = $r["Id"];
		$Doctor["Mobile_No"] = $r["Mobile_No"];
		$Doctor["Full_Name"] = $r["Full_Name"];
		$Doctor["Address"] = $r["Address"];
		$Doctor["Speciality"] = $r["Speciality"];
		$Doctor["Hospital_Name"] = $r["Hospital_Name"];
		$Doctor["Consultation_Fee"] = $r["Consultation_Fee"];
		$Doctor["Opning_Time"] = $r["Opning_Time"];
		$Doctor["Closing_Time"] = $r["Closing_Time"];
		$Doctor["Latitude"] = $r["Latitude"];
		$Doctor["Longitude"] = $r["Longitude"];
		$Doctor["Status"] = $r["Status"];
	}
	$AppointmentList[$i]["Doctor"] = $Doctor;
	$i += 1;
}
$response["AppointmentList"] = $AppointmentList;
$response["status"] = "True";
$response["message"] = "Data Fetch !";
echo json_encode($response);
?>