<?php
// Configurações do Banco de Dados (Hostinger)
// Substitua as informações abaixo pelos dados que você criou na Hostinger

define('DB_HOST', 'localhost'); // Na Hostinger, geralmente é localhost
define('DB_USER', 'u348586155_radio'); // Seu Usuário do Banco
define('DB_PASS', 'R@dio2026*'); // A senha que você criou
define('DB_NAME', 'u348586155_radio'); // O Nome do Banco

// Evita erros de CORS (Permite que o React faça requisições para a API)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
