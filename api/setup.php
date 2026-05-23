<?php
require_once 'db.php';

// Este script cria as tabelas iniciais. Você deve rodá-lo acessando /api/setup.php pelo navegador.

$queries = [
    // Tabela de Banners
    "CREATE TABLE IF NOT EXISTS banners (
        id VARCHAR(255) PRIMARY KEY,
        imageUrl TEXT NOT NULL,
        linkUrl TEXT,
        position VARCHAR(50) DEFAULT 'center',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",
    
    // Tabela de Configurações Gerais
    "CREATE TABLE IF NOT EXISTS settings (
        setting_key VARCHAR(255) PRIMARY KEY,
        setting_value TEXT NOT NULL
    )",
    
    // Tabela Top 5
    "DROP TABLE IF EXISTS top5",
    "CREATE TABLE top5 (
        id VARCHAR(255) PRIMARY KEY,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        youtubeUrl TEXT,
        position INT NOT NULL
    )",

    // Tabela Equipe
    "CREATE TABLE IF NOT EXISTS team (
        id VARCHAR(255) PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        imageUrl TEXT,
        facebook TEXT,
        instagram TEXT,
        twitter TEXT
    )",

    // Tabela Programação (Schedule)
    "DROP TABLE IF EXISTS schedule",
    "CREATE TABLE schedule (
        id VARCHAR(255) PRIMARY KEY,
        time TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        presenterId TEXT,
        days TEXT NOT NULL
    )"
];

$success = true;
$messages = [];

foreach ($queries as $query) {
    try {
        $pdo->exec($query);
        $messages[] = "Tabela verificada/criada com sucesso!";
    } catch (PDOException $e) {
        $success = false;
        $messages[] = "Erro ao executar query: " . $e->getMessage();
    }
}

if ($success) {
    echo "<h1>Instalação Concluída!</h1>";
    echo "<p>As tabelas do banco de dados foram criadas com sucesso na Hostinger.</p>";
    echo "<p><strong>Por questões de segurança, você pode deletar este arquivo (setup.php) agora.</strong></p>";
} else {
    echo "<h1>Erro na Instalação</h1>";
    echo implode("<br>", $messages);
}
?>
