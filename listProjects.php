#!/usr/local/bin/php
<?php
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

$sql = "SELECT id, name, location, description FROM projects";
$result = $conn->query($sql);

$list=array(); //instantiate the array 

if ($result->num_rows > 0) {
    // output data of each row
    // echo "{\"records\":[";
    while($row = $result->fetch_assoc()) {
        $proj = new stdClass(); // create a new odbc_fetch_object
        $proj->id = $row["id"];
        $proj->name = $row["name"];
        $proj->location = $row["location"];
        $proj->description = $row["description"];
        array_push($list,$proj);

        // echo "{";
        // echo "\"id\": \" " . $row["id"] . "\",";
        // echo "\"name\":\" " . $row["name"] . "\",";
        // echo "\"description\":\" " . $row["description"]. "\"";
        // echo "}, "; 
    }
    // echo "]}"; 
    echo json_encode($list);
} else {
    echo "0 results";
}
$conn->close();
exit(200);
?>
