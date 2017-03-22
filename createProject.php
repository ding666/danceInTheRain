#!/usr/local/bin/php
<?php

//  $data = json_decode(file_get_contents("php://input"));
//  echo json_encode($data);

// $data = file_get_contents("php://input");
// echo $data;
echo "hello\n";

$data = new stdClass();
$data->projName = "testing project";
$data->projDescription = "create a testing project
to test php creare project function";
$data->firstName = "apalala";
$data->lastName = "ding";
$data->email= "apalalading@gmail.com";
$data->phone="908-234-5678";
 $data->city = "middletown";
 $data->state = "NJ";
 $data->country = "USA";
//
$servername = "localhost";
$username = "acrossp1_ding";
$password = "asdf1234";
$dbname = "acrossp1_dance";

echo json_encode($data);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

echo "asdf1 $data->projName\n";
$sql = "INSERT INTO projects (name, description) VALUES ($data->projName, $data->projDescription)";

if ($conn->query($sql) === TRUE) {
    $projDBrecordAdded = TRUE;
    $last_projID = $conn->insert_id;
} else {
    echo "asdf failed in insert proj\n";
    $projDBrecordAdded = FALSE;
}
echo "asdf2\n";

$sql = "INSERT INTO people (first_name, last_name, email, phone, city, state, country)
VALUES ($data->firstName, $data->lastName, $data->email, $data->phone, $data->city, $data->state, $data->country)";

if ($conn->query($sql) === TRUE) {
    $peopleDBrecordAdded = TRUE;
    $last_peopleID = $conn->insert_id;
} else {
    $peopleDBrecordAdded = FALSE;
}

if ($projDBrecordAdded && $last_peopleID) {
    $sql = "INSERT INTO proj_people (projID, peopleID)
    VALUES ($last_projID, $last_peopleID)";
    if ($conn->query($sql) === TRUE) {
        $projPeopleDBrecordAdded = TRUE;
    } else {
        $projPeopleDBrecordAdded = FALSE;
    }
}
if ($projDBrecordAdded && $peopleDBrecordAdded && $projPeopleDBrecordAdded) {
    $statusCode = 200;
} else {
    $statusCode = 400;
}
echo "$statusCode";

$conn->close();
// exit(200);
?>
