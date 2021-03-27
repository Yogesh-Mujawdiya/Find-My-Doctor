<?php
require_once('Config.php');
$response = array();
$MobileNo = $_POST['MobileNo'];
$Password = $_POST['Password'];

$s = "select * from admin where Mobile_No='$MobileNo' && Password='$Password'";
$result = mysqli_query($con, $s);
$num = mysqli_num_rows($result);
if ($num == 1) {
    $r = $result->fetch_assoc();
    $response["UserType"] = "Admin";
    $response["status"] = "Success";
    $response["message"] = "Login Successfully";
} else {
    $s = "select * from doctor where Mobile_No='$MobileNo' && Password='$Password'";
    $result = mysqli_query($con, $s);
    $num = mysqli_num_rows($result);
    if ($num == 1) {
        $r = $result->fetch_assoc();
        $response["UserData"]['Id'] = $r["Id"];
        $response["UserData"]['Name'] = $r["Full_Name"];
        $response["UserData"]['Mobile_No'] = $r["Mobile_No"];
        $response["UserData"]['Address'] = $r["Address"];
        $response["UserData"]['Speciality'] = $r["Speciality"];
        $response["UserData"]['Hospital_Name'] = $r["Hospital_Name"];
        $response["UserData"]['Consultation_Fee'] = $r["Consultation_Fee"];
        $response["UserData"]['Opning_Time'] = $r["Opning_Time"];
        $response["UserData"]['Closing_Time'] = $r["Closing_Time"];
        $response["UserData"]['Latitude'] = $r["Latitude"];
        $response["UserData"]['Longitude'] = $r["Longitude"];
        $response["UserData"]['Status'] = $r["Status"];
        $response["UserType"] = "Doctor";
        $response["status"] = "Success";
        $response["message"] = "Login Successfully";
    } else {
        $s = "select * from customer where MobileNumber='$MobileNo' && Password='$Password'";
        $result = mysqli_query($con, $s);
        $num = mysqli_num_rows($result);
        if ($num == 1) {
            $r = $result->fetch_assoc();
            $response['UserType'] = "User";
            $response["UserData"]['Id'] = $r["Id"];
            $response["UserData"]['Name'] = $r["Name"];
            $response["UserData"]['Mobile'] = $r["MobileNumber"];
            $response["UserData"]['Gender'] = $r["Gender"];
            $response["UserData"]['DOB'] = $r["DOB"];
            $response["status"] = "Success";
            $response["message"] = "Login Successfully";
        } else {
            $response["status"] = "Error";
            $response["message"] = "invalid information";
        }
    }
}
echo json_encode($response);
