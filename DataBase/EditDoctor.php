<?php
require_once('Config.php');
$response = array();
$Id = $_POST['Id'];
$FullName = $_POST['FullName'];
$MobileNo = $_POST['MobileNo'];
$Address = $_POST['Address'];
$Latitude = $_POST['Latitude'];
$Longitude = $_POST['Longitude'];
$Speciality = $_POST['Speciality'];
$Consultation_Fee = $_POST['Consultation_Fee'];
$Hospital_Name = $_POST['Hospital_Name'];
$Opning_Time = $_POST['Opning_Time'];
$Closing_Time = $_POST['Closing_Time'];
$reg = "upfate doctor set `Full_Name`='$FullName,
    `Mobile_No`='$MobileNo', `Address`='$Address', 
    `Speciality`='$Speciality', `Hospital_Name`='$Hospital_Name',
    `Consultation_Fee`='$Consultation_Fee', `Opning_Time`='$Opning_Time', 
    `Closing_Time`='$Closing_Time', `Latitude`='$Latitude',
    `Longitude`='$Longitude' where Id= '$Id'";
mysqli_query($con, $reg);
$response["status"] = "True";
$response["message"] = "Add successfully";

echo json_encode($response);
