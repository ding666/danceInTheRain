#!/usr/local/bin/php
<?php 
$servername = "localhost";
$username = "lehmannp_admin";
$password = "melody123";
$dbname = "lehmannp_dance";

$p1 = $_GET['p1'];
$p2 = $_GET['p2'];

// $p1=15239;
// $p2=2256;

// $id = 2;

// echo json_encode($proj);
// exit(200);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "UPDATE pledge set pledge1 = $p1, pledge2= $p2"; 
// echo "sql=\n";
// echo "$sql\n";

if ($conn->query($sql) === TRUE) {
 //   echo "Record updated successfully";
 exit(200);
} else {
   // echo "Error updating record: " . $conn->error;
   exit(401);
}

//exit(200);

?>
