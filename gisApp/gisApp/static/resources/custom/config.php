<?php

$host = "10.96.4.34";
$user = "postgres";
$password = "postgres";
$dbname = "mathura";

$con = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if(!$con){
    die("Connection failed.");
}

?>