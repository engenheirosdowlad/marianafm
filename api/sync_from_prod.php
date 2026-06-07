<?php
require_once 'db.php';

// Aumenta o limite de tempo e memória caso as imagens em base64 sejam pesadas
ini_set('memory_limit', '256M');
set_time_limit(180);

$prodUrl = 'https://forestgreen-ape-477390.hostingersite.com/api';

echo "<h1>Sincronizando Banco de Dados Local com a Produção...</h1>";

$endpoints = [
    'settings' => '/settings.php',
    'banners' => '/banners.php',
    'top5' => '/top5.php',
    'team' => '/team.php',
    'schedule' => '/schedule.php'
];

foreach ($endpoints as $table => $path) {
    echo "<h2>Sincronizando tabela: $table...</h2>";
    $json = @file_get_contents($prodUrl . $path);
    if ($json === false) {
        echo "<p style='color:red;'>Erro ao obter dados de " . $prodUrl . $path . "</p>";
        continue;
    }
    
    $data = json_decode($json, true);
    if (!is_array($data)) {
        echo "<p style='color:red;'>JSON inválido retornado para $table</p>";
        continue;
    }

    try {
        if ($table === 'settings') {
            $stmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?");
            foreach ($data as $key => $value) {
                $valStr = is_string($value) ? $value : json_encode($value);
                $stmt->execute([$key, $valStr, $valStr]);
            }
            echo "<p style='color:green;'>✓ Tabela settings sincronizada com sucesso! (" . count($data) . " chaves)</p>";
        } 
        elseif ($table === 'banners') {
            $pdo->exec("DELETE FROM banners");
            $stmt = $pdo->prepare("INSERT INTO banners (id, imageUrl, mobileImageUrl, linkUrl, position) VALUES (?, ?, ?, ?, ?)");
            foreach ($data as $row) {
                $stmt->execute([
                    $row['id'],
                    $row['imageUrl'],
                    $row['mobileImageUrl'] ?? null,
                    $row['linkUrl'] ?? null,
                    $row['position'] ?? 'center'
                ]);
            }
            echo "<p style='color:green;'>✓ Tabela banners sincronizada com sucesso! (" . count($data) . " banners)</p>";
        }
        elseif ($table === 'top5') {
            $pdo->exec("DELETE FROM top5");
            $stmt = $pdo->prepare("INSERT INTO top5 (id, title, artist, youtubeUrl, position) VALUES (?, ?, ?, ?, ?)");
            foreach ($data as $row) {
                $stmt->execute([
                    $row['id'],
                    $row['title'],
                    $row['artist'],
                    $row['youtubeUrl'] ?? null,
                    $row['position']
                ]);
            }
            echo "<p style='color:green;'>✓ Tabela top5 sincronizada com sucesso! (" . count($data) . " itens)</p>";
        }
        elseif ($table === 'team') {
            $pdo->exec("DELETE FROM team");
            $stmt = $pdo->prepare("INSERT INTO team (id, name, role, imageUrl, facebook, instagram, twitter) VALUES (?, ?, ?, ?, ?, ?, ?)");
            foreach ($data as $row) {
                $stmt->execute([
                    $row['id'],
                    $row['name'],
                    $row['role'],
                    $row['imageUrl'] ?? $row['photo'] ?? null,
                    $row['facebook'] ?? null,
                    $row['instagram'] ?? null,
                    $row['twitter'] ?? null
                ]);
            }
            echo "<p style='color:green;'>✓ Tabela team sincronizada com sucesso! (" . count($data) . " membros)</p>";
        }
        elseif ($table === 'schedule') {
            $pdo->exec("DELETE FROM schedule");
            $stmt = $pdo->prepare("INSERT INTO schedule (id, time, title, description, presenterId, days) VALUES (?, ?, ?, ?, ?, ?)");
            foreach ($data as $row) {
                $daysVal = is_array($row['days']) ? json_encode($row['days']) : $row['days'];
                $stmt->execute([
                    $row['id'],
                    $row['time'],
                    $row['title'],
                    $row['description'] ?? null,
                    $row['presenterId'] ?? null,
                    $daysVal
                ]);
            }
            echo "<p style='color:green;'>✓ Tabela schedule sincronizada com sucesso! (" . count($data) . " programas)</p>";
        }
    } catch (PDOException $e) {
        echo "<p style='color:red;'>Erro no banco de dados ao salvar $table: " . $e->getMessage() . "</p>";
    }
}

echo "<h3>Sincronização concluída!</h3>";
?>
