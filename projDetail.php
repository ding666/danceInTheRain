#!/usr/local/bin/php
<?php
$servername = "localhost";
$username = "lehmannp_admin";
$password = "melody123";
$dbname = "lehmannp_dance";

$id = $_GET['id'];
//  $id = 2;

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

// to get all the participants


$sql = "select first_name, last_name from people join proj_people on people.id = proj_people.peopleID
where  proj_people.projID = $id and proj_people.owner = false";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $proj->joiners = array();
    // output data of each row
    // echo "{\"records\":[";
    while($row = $result->fetch_assoc()) {
        $joiner = new stdClass(); // create a new odbc_fetch_object
        $joiner->firstName= $row["first_name"];
        $joiner->lastName = $row["last_name"];
        array_push($proj->joiners,$joiner);

  //      echo "$joiner->firstName\n";
        // echo "{";
        // echo "\"id\": \" " . $row["id"] . "\",";
        // echo "\"name\":\" " . $row["name"] . "\",";
        // echo "\"description\":\" " . $row["description"]. "\"";
        // echo "}, "; 
    }
    // echo "]}"; 
    echo json_encode($proj);
} else {
    echo json_encode($proj);
}




exit(200);

?>
