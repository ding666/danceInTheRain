#!/usr/local/bin/php
<?php
$servername = "localhost";
$username = "acrossp1_ding";
$password = "asdf1234";
$dbname = "acrossp1_dance";

$id = $_GET['id'];
// $id = 2;

// echo json_encode($proj);
// exit(200);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT id, name, description FROM projects where id = $id";

$result = $conn->query($sql);

$row = $result->fetch_assoc();
$proj = new stdClass(); 
$proj->id = $row["id"];
$proj->name = $row["name"];
$proj->description = $row["description"];

$sql = "SELECT id, first_name, last_name, email, phone, city, state, country FROM people 
where id = (select peopleID from proj_people where projID = $id)";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

$owner = new stdClass(); 
$owner->id = $row["id"];
$owner->firstName = $row["first_name"];
$owner->lastName = $row["last_name"];
$owner->email = $row["email"];
$owner->phone = $row["phone"];
$owner->city = $row["city"];
$owner->state = $row["state"];
$owner->country = $row["country"];

$proj->owner = $owner;

echo json_encode($proj);


exit(200);

?>
