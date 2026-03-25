<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $stmt = $pdo->prepare("INSERT INTO registrations (full_name, age, gender, address, contact_number, email, department) VALUES (?, ?, ?, ?, ?, ?, ?)");
    
    if ($stmt->execute([
        $_POST['full_name'], $_POST['age'], $_POST['gender'], 
        $_POST['address'], $_POST['contact'], $_POST['email'], $_POST['dept']
    ])) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
