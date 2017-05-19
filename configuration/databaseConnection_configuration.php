<?php
// Database Connection
try {
    $pdo = new PDO('mysql:host=localhost;dbname=cloudteldb', "root", "");
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}

