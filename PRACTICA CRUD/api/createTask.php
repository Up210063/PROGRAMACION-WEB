<?php
include "./partials/Connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userId = $_POST['users'] ?? null;
    $taskTitle = $_POST['title'] ?? null;
    $completed = $_POST['completed'] ?? null;

    if ($userId && $taskTitle !== null && $completed !== null) {
        try {
            $sql = "INSERT INTO task (title, idUser, completed) VALUES (?, ?, ?)";
            $state = $conn->prepare($sql);
            $state->execute([$taskTitle, $userId, $completed]);
            $lastInsertId = $conn->lastInsertId();
            echo json_encode(["success" => true, "taskId" => $lastInsertId]);
        } catch (PDOException $e) {
            echo json_encode(["success" => false, "error" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Todos los campos son obligatorios"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Método no permitido"]);
}
?>
