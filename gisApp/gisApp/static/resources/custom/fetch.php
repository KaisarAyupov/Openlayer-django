<?php

// include "http://10.96.4.34/TPLGIS/resources/custom/config.php";

$host = "10.96.4.34";
$user = "postgres";
$password = "postgres";
$dbname = "mathura";

$con = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if(!$con){
    die("Connection failed.");
}

$request = "";

if(isset($_POST['request'])){
  $request = $_POST['request'];
  $searchTxt = $_POST['searchTxt'];
  $searchLayer = $_POST['searchLayer'];
  $searchAttribute = $_POST['searchAttribute'];
}

// Fetch all records
if($request == 'liveSearch'){

  // $query = "SELECT * FROM public.mspanno WHERE LOWER(fl) LIKE LOWER('%$searchTxt%') ORDER BY fl ASC LIMIT 10";
  $query = "SELECT * FROM $searchLayer WHERE LOWER($searchAttribute) LIKE LOWER('%$searchTxt%') ORDER BY $searchAttribute ASC LIMIT 10";

  $result = pg_query($con, $query);

  $response = array();

  while ($row = pg_fetch_assoc($result) ){

     $value = $row[$searchAttribute];


     $response[] = array(
      $searchAttribute => $value,

     );
  }

  echo json_encode($response);
  die;
}

?>