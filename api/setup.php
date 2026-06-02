<?php
require_once 'db.php';

// Este script cria as tabelas iniciais. Você deve rodá-lo acessando /api/setup.php pelo navegador.

$queries = [
    // Tabela de Banners
    "DROP TABLE IF EXISTS banners",
    "CREATE TABLE banners (
        id VARCHAR(255) PRIMARY KEY,
        imageUrl LONGTEXT NOT NULL,
        mobileImageUrl LONGTEXT,
        linkUrl TEXT,
        position VARCHAR(50) DEFAULT 'center',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",
    
    // Tabela de Configurações Gerais
    "CREATE TABLE IF NOT EXISTS settings (
        setting_key VARCHAR(255) PRIMARY KEY,
        setting_value LONGTEXT NOT NULL
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
        imageUrl LONGTEXT,
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
    )",
    
    // Inserir configurações padrão da Cidade FM 87,9 MHZ
    "INSERT INTO settings (setting_key, setting_value) VALUES 
    ('siteName', 'CIDADE FM 87,9 MHZ'),
    ('audioStreamUrl', 'https://link.radio.br:18630/stream'),
    ('videoStreamUrl', 'https://link.radio.br:18630/video'),
    ('whatsappNumber', '(91) 98273-6292'),
    ('whatsappUrl', 'https://wa.me/5591982736292'),
    ('instagramUrl', 'https://www.instagram.com/marianafmdigital'),
    ('facebookUrl', 'https://www.facebook.com/jpscardoso88'),
    ('youtubeUrl', 'https://www.youtube.com/@LaMarianaFMProgramas'),
    ('headerTitle', 'Seja bem-vindo a Cidade FM'),
    ('headerSubtitle', 'onde nasce o sucesso'),
    ('dividerThickness', '4'),
    ('dividerGlow', '20'),
    ('visualizerIntensity', '100'),
    ('visualizerThickness', '10'),
    ('playImageSize', '200'),
    ('logoSize', '60'),
    ('headerTextSize', '24'),
    ('headerTextEffect', 'fade'),
    ('headerTextFont', 'sans'),
    ('headerTextColor', '#ffffff'),
    ('videoChannelName', 'Mariana FM - TV'),
    ('footerWhatsappColor', '#cbd5e1'),
    ('footerEmailColor', '#cbd5e1'),
    ('footerStreetColor', '#ffffff'),
    ('footerDetailsColor', '#cbd5e1'),
    ('footerCityColor', '#cbd5e1'),
    ('footerCopyrightColor', '#cbd5e1')
    ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)",

    // Inserir Top 5 padrão da Cidade FM 87,9 MHZ
    "INSERT INTO top5 (id, title, artist, youtubeUrl, position) VALUES 
    ('top_1', 'Die With A Smile', 'Lady Gaga & Bruno Mars', 'https://www.youtube.com/watch?v=kPa7bsKwL-c', 1),
    ('top_2', 'Birds of a Feather', 'Billie Eilish', 'https://www.youtube.com/watch?v=V9PVRfjEBTI', 2),
    ('top_3', 'Espresso', 'Sabrina Carpenter', 'https://www.youtube.com/watch?v=eVli-tstM5E', 3),
    ('top_4', 'Si Antes Te Hubiera Conocido', 'Karol G', 'https://www.youtube.com/watch?v=QCZZwZQ4qNs', 4),
    ('top_5', 'A Bar Song (Tipsy)', 'Shaboozey', 'https://www.youtube.com/watch?v=t7bQwwqW-Hc', 5)
    ON DUPLICATE KEY UPDATE title = VALUES(title), artist = VALUES(artist), youtubeUrl = VALUES(youtubeUrl), position = VALUES(position)",
    
    // Atualizar colunas existentes para LONGTEXT para suportar imagens em Base64 grandes enviadas do PC
    "ALTER TABLE settings MODIFY COLUMN setting_value LONGTEXT NOT NULL",
    "ALTER TABLE banners MODIFY COLUMN imageUrl LONGTEXT NOT NULL",
    "ALTER TABLE banners MODIFY COLUMN mobileImageUrl LONGTEXT",
    "ALTER TABLE team MODIFY COLUMN imageUrl LONGTEXT"
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
