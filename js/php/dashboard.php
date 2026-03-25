<?php
require 'config.php';
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.html");
    exit();
}

// Delete Logic
if (isset($_GET['delete'])) {
    $stmt = $pdo->prepare("DELETE FROM registrations WHERE id = ?");
    $stmt->execute([$_GET['delete']]);
    header("Location: dashboard.php");
}

$data = $pdo->query("SELECT * FROM registrations ORDER BY date_registered DESC")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body style="display: block; overflow-y: auto; padding: 20px;">
    <div class="admin-container glass-card" style="max-width: 100%; margin: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2>Monitoring Sheet</h2>
            <a href="logout.php" style="color: #ff4d4d; text-decoration: none; font-weight: bold;">Logout</a>
        </div>
        
        <input type="text" id="searchInput" onkeyup="filterTable()" placeholder="Search names, departments, or emails...">
        
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Dept</th>
                    <th>Contact</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($data as $row): ?>
                <tr>
                    <td><?= htmlspecialchars($row['full_name']) ?></td>
                    <td><?= $row['age'] ?></td>
                    <td><?= htmlspecialchars($row['department']) ?></td>
                    <td><?= htmlspecialchars($row['contact_number']) ?></td>
                    <td><?= $row['date_registered'] ?></td>
                    <td>
                        <a href="?delete=<?= $row['id'] ?>" onclick="return confirm('Delete this record?')" style="color: #ff4d4d;">Delete</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <script src="script.js"></script>
</body>
</html>
