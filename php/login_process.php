<?php
require 'config.php';

$user = $_POST['username'];
$pass = $_POST['password'];

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$user]);
$admin = $stmt->fetch();

if ($admin && password_verify($pass, $admin['password'])) {
    $_SESSION['admin_logged_in'] = true;
    header("Location: dashboard.php");
} else {
    echo "<script>alert('Invalid Credentials'); window.location='login.html';</script>";
}
?>
