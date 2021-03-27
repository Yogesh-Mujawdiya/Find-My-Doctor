<?php
    require_once ('Config.php');
	$response = array();
	$DoctorList = array();
	$R=mysqli_query($con,"SELECT * FROM doctor where Status='Approved'");
	$i=0;
	while ($I=mysqli_fetch_array($R)) {
		$DoctorList[$i]["Id"] = $I["Id"] ;
		$DoctorList[$i]["Mobile_No"] = $I["Mobile_No"] ;
		$DoctorList[$i]["Full_Name"] = $I["Full_Name"] ;
		$DoctorList[$i]["Address"] = $I["Address"] ;
		$DoctorList[$i]["Speciality"] = $I["Speciality"] ;
		$DoctorList[$i]["Hospital_Name"] = $I["Hospital_Name"] ;
		$DoctorList[$i]["Consultation_Fee"] = $I["Consultation_Fee"] ;
		$DoctorList[$i]["Opning_Time"] = $I["Opning_Time"] ;
		$DoctorList[$i]["Closing_Time"] = $I["Closing_Time"] ;
		$DoctorList[$i]["Latitude"] = $I["Latitude"] ;
		$DoctorList[$i]["Longitude"] = $I["Longitude"] ;
		$DoctorList[$i]["Status"] = $I["Status"] ;
		$i+=1;
	}
	$response["DoctorList"] = $DoctorList;
	$response["status"] = "True";
	$response["message"] = "Data Fetch !";
	echo json_encode($response);
?>