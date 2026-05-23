<?php
require_once 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM team");
        echo json_encode($stmt->fetchAll());
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $members = json_decode($input, true);
    
    if (is_array($members)) {
        try {
            $pdo->beginTransaction();
            $pdo->exec("DELETE FROM team");
            $stmt = $pdo->prepare("INSERT INTO team (id, name, role, imageUrl, facebook, instagram, twitter) VALUES (?, ?, ?, ?, ?, ?, ?)");
            
            foreach ($members as $member) {
                $socials = $member['social'] ?? [];
                $stmt->execute([
                    $member['id'] ?? uniqid(),
                    $member['name'] ?? '',
                    $member['role'] ?? '',
                    $member['imageUrl'] ?? '',
                    $socials['facebook'] ?? '',
                    $socials['instagram'] ?? '',
                    $socials['twitter'] ?? ''
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
