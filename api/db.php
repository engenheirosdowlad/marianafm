<?php
require_once 'config.php';

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8", DB_USER, DB_PASS);
    // Configura o PDO para lançar exceções em caso de erros
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Configura o PDO para retornar arrays associativos por padrão
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    // Se falhar a conexão, retorna o erro em JSON
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Erro na conexao com o banco de dados. Verifique o config.php!',
        'details' => $e->getMessage()
    ]);
    exit();
}
?>
