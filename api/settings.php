<?php
require_once 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Retorna todas as configurações
    try {
        $stmt = $pdo->query("SELECT setting_key, setting_value FROM settings");
        $settings = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
        echo json_encode($settings);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
} 
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Atualiza configurações específicas
    $input = file_get_contents('php://input');
    $settings = json_decode($input, true);
    
    if (is_array($settings)) {
        try {
            $pdo->beginTransaction();
            
            $stmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?");
            
            foreach ($settings as $key => $value) {
                // value precisa ser string no banco, então se for array/object encoda em json
                $valStr = is_string($value) ? $value : json_encode($value);
                $stmt->execute([$key, $valStr, $valStr]);
            }
            
            $pdo->commit();
            echo json_encode(['status' => 'success', 'message' => 'Configurações salvas!']);
            
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
