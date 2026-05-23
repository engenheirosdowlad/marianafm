<?php
require_once 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM schedule");
        $items = $stmt->fetchAll();
        // Converte a string days de volta para array
        foreach ($items as &$item) {
            $item['days'] = json_decode($item['days'], true) ?? [];
        }
        echo json_encode($items);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $programs = json_decode($input, true);
    
    if (is_array($programs)) {
        try {
            $pdo->beginTransaction();
            $pdo->exec("DELETE FROM schedule");
            $stmt = $pdo->prepare("INSERT INTO schedule (id, time, title, description, presenterId, days) VALUES (?, ?, ?, ?, ?, ?)");
            
            foreach ($programs as $prog) {
                $daysJson = json_encode($prog['days'] ?? []);
                $stmt->execute([
                    $prog['id'] ?? uniqid(),
                    $prog['time'] ?? '',
                    $prog['title'] ?? '',
                    $prog['description'] ?? '',
                    $prog['presenterId'] ?? '',
                    $daysJson
                ]);
            }
            $pdo->commit();
            echo json_encode(['status' => 'success']);
        } catch (PDOException $e) {
            $pdo->rollBack();
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Dados inválidos']);
    }
}
?>
