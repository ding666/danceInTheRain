#!/usr/local/bin/php
<?php

// To get the 2 pledge numbers

$servername = "localhost";
$username = "lehmannp_admin";
$password = "melody123";
$dbname = "lehmannp_dance";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT pledge1, pledge2 FROM pledge";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$resultObj = new stdClass(); // create a new odbc_fetch_object
$resultObj->pledge1 = $row["pledge1"];
$resultObj->pledge2 = $row["pledge2"];
$conn->close();

// echo "Hello\n";
// echo "$result->num_rows\n";
// echo $row["pledge1"];

echo json_encode($resultObj);
exit(200);

?>
