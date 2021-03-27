<?php
require_once('Config.php');
$response = array();
$Name = $_POST['Name'];
$s = "select * from speciality where Name= '$Name'";
$result = mysqli_query($con, $s);
$num = mysqli_num_rows($result);
if ($num >= 1) {
    $response["status"] = "Error";
    $response["message"] = "Speciality Name already exist";
} else {
    $reg = "insert into `speciality`(`Name`)  values('$Name')";
    mysqli_query($con, $reg);
    $response["status"] = "Success";
    $response["message"] = "Speciality Added successfully";
}
echo json_encode($response);
?>