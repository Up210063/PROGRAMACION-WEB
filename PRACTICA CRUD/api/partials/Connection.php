<?php

$host = "localhost";
$dbName = "web programing";
$user = "root";
$password = "";
$protocol = "mysql:host={$host};dbname={$dbName}";
try {
  // Data base conection
  $conn = new PDO($protocol, $user, $password);
} catch (PDOException $e) {
  die($e->getMessage());
}
