<?php
require_once('Config.php');
$response = array();
$FullName = $_POST['FullName'];
$MobileNo = $_POST['MobileNo'];
$Password = $_POST['Password'];
$Address = $_POST['Address'];
$Latitude = $_POST['Latitude'];
$Longitude = $_POST['Longitude'];
$Speciality = $_POST['Speciality'];
$Consultation_Fee = $_POST['Consultation_Fee'];
$Hospital_Name = $_POST['Hospital_Name'];
$Opning_Time = $_POST['Opning_Time'];
$Closing_Time = $_POST['Closing_Time'];
$s = "select * from doctor where Mobile_No= '$MobileNo'";
$result = mysqli_query($con, $s);
$num = mysqli_num_rows($result);
if ($num >= 1) {
    $response["status"] = "False";
    $response["message"] = "Doctor Mobile No. already exist as a Doctor";
} else {
    $s = "select * from customer where MobileNumber= '$MobileNo'";
    $result = mysqli_query($con, $s);
    $num = mysqli_num_rows($result);
    if ($num >= 1) {
        $response["status"] = "False";
        $response["message"] = "Mobile No. already exist as a Customer";
    } else {
        $reg = "insert into doctor( `Full_Name`, `Mobile_No`, `Address`, 
    `Speciality`, `Hospital_Name`, `Consultation_Fee`, `Opning_Time`, 
    `Closing_Time`, `Latitude`, `Longitude`, `Status`, `Password`)
     values('$FullName','$MobileNo','$Address','$Speciality',
     '$Hospital_Name','$Consultation_Fee','$Opning_Time',
     '$Closing_Time','$Latitude',
     '$Longitude','Pending', '$Password')";
        mysqli_query($con, $reg);
        $response["status"] = "True";
        $response["message"] = "Registration successfully";
    }
}
echo json_encode($response);
