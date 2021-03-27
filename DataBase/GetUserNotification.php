<?php
    require_once ('Config.php');
	$response = array();
	$NotificationList = array();
	$R=mysqli_query($con,"SELECT * FROM notification where Type='User'");
	$i=0;
	while ($I=mysqli_fetch_array($R)) {
		$NotificationList[$i]["Id"] = $I["Id"] ;
		$NotificationList[$i]["Type"] = $I["Type"] ;
		$NotificationList[$i]["Text"] = $I["Text"] ;
		$i+=1;
	}
	$response["NotificationList"] = $NotificationList;
	$response["status"] = "True";
	$response["message"] = "Data Fetch !";
	echo json_encode($response);
?>