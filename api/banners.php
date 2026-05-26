<?php
require_once 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Retorna todos os banners
    try {
        $stmt = $pdo->query("SELECT * FROM banners ORDER BY created_at ASC");
        $banners = $stmt->fetchAll();
        echo json_encode($banners);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
} 
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recebe o array de banners e atualiza no banco (Substituição total para espelhar o frontend)
    $input = file_get_contents('php://input');
    $banners = json_decode($input, true);
    
    if (is_array($banners)) {
        try {
            $pdo->beginTransaction();
            
            // Deleta todos os banners atuais
            $pdo->exec("DELETE FROM banners");
            
            // Insere os novos
            $stmt = $pdo->prepare("INSERT INTO banners (id, imageUrl, mobileImageUrl, linkUrl, position) VALUES (?, ?, ?, ?, ?)");
            
            foreach ($banners as $banner) {
                $id = $banner['id'] ?? uniqid();
                $imageUrl = $banner['imageUrl'] ?? '';
                $mobileImageUrl = $banner['mobileImageUrl'] ?? '';
                $linkUrl = $banner['linkUrl'] ?? '';
                $position = $banner['position'] ?? 'center';
                
                $stmt->execute([$id, $imageUrl, $mobileImageUrl, $linkUrl, $position]);
            }
            
            $pdo->commit();
            echo json_encode(['status' => 'success', 'message' => 'Banners salvos com sucesso!']);
            
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
