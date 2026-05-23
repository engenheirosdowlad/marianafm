<?php
require_once 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM top5 ORDER BY position ASC");
        echo json_encode($stmt->fetchAll());
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $items = json_decode($input, true);
    
    if (is_array($items)) {
        try {
            $pdo->beginTransaction();
            $pdo->exec("DELETE FROM top5");
            $stmt = $pdo->prepare("INSERT INTO top5 (id, title, artist, youtubeUrl, position) VALUES (?, ?, ?, ?, ?)");
            
            foreach ($items as $item) {
                $stmt->execute([
                    $item['id'] ?? uniqid(),
                    $item['title'] ?? '',
                    $item['artist'] ?? '',
                    $item['youtubeUrl'] ?? '',
                    $item['position'] ?? 0
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
