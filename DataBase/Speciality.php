<?php
    require_once ('Config.php');
	$response = array();
	$SpecialityList = array();
	$R=mysqli_query($con,"SELECT * FROM speciality");
	$i=0;
	while ($I=mysqli_fetch_array($R)) {
		$SpecialityList[$i]["Id"] = $I["Id"] ;
		$SpecialityList[$i]["Name"] = $I["Name"] ;
		$i+=1;
	}
	$response["SpecialityList"] = $SpecialityList;
	$response["status"] = "True";
	$response["message"] = "Data Fetch !";
	echo json_encode($response);
?>