#!/usr/local/bin/php
<?php

$data = json_decode(file_get_contents("php://input"));
// then all the data from $scope.saveProj will be passed to the above var
//

// $result = $data;
// echo json_encode($result);

// exit(200);

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

$projID = $data->projID;

$sql = "INSERT INTO people (first_name, last_name, email, phone, city, state, country)
VALUES (\"$data->joinFirstName\", \"$data->joinLastName\", \"$data->joinEmail\", \"$data->joinPhone\", 
\"$data->joinCity\", \"$data->joinState\", \"$data->joinCountry\")";

if ($conn->query($sql) === TRUE) {
    $peopleDBrecordAdded = TRUE;
    $last_peopleID = $conn->insert_id;
} else {
    $peopleDBrecordAdded = FALSE;
}

if ($last_peopleID) {
    $sql = "INSERT INTO proj_people (projID, peopleID, owner)
    VALUES (\"$projID\", \"$last_peopleID\", false)";
    if ($conn->query($sql) === TRUE) {
        $projPeopleDBrecordAdded = TRUE;
    } else {
        $projPeopleDBrecordAdded = FALSE;
    }
}
if ($peopleDBrecordAdded && $projPeopleDBrecordAdded) {
    $statusCode = 200;
} else {
    $statusCode = 400;
}

$conn->close();
 exit(200);
?>
