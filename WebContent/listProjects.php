#!/usr/local/bin/php
<?php
$servername = "localhost";
$username = "acrossp1_ding";
$password = "asdf1234";
$dbname = "acrossp1_dance";

/ Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT id, name, description FROM projects";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["name"]. " " . $row["description"]. "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();

?>
