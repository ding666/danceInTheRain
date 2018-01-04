#!/usr/local/bin/php
<?php
$servername = "localhost";
$username = "lehmannp_admin";
$password = "melody123";
$dbname = "lehmannp_dance";

$id = $_GET['id'];
 // $id = 1;

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

// note if a project has more than 1 owners, the following sentence will go wrong, then need to out number to 1

$sql = "SELECT id, first_name, last_name, email, phone, city, state, country FROM people 
where id = (select peopleID from proj_people where projID = $id and owner=true)";
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
