<?php
header('Access-Control-Allow-Origin: http://localhost:4200');
$Host = 'localhost';
$UserName = 'root';
$Password = '';
$Database = 'find-my-doctor';

$con=mysqli_connect($Host,$UserName,$Password,$Database);

?>
