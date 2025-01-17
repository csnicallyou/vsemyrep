<?php
$directory = 'gifs';
$gifs = [];

if (is_dir($directory)) {
    $files = scandir($directory);
    foreach ($files as $file) {
        // Проверяем, что это файл, а не папка (для безопасности)
        if (is_file($directory . '/' . $file)) {
           $gifs[] = $file;
        }
    }
}
header('Content-Type: application/json');
echo json_encode($gifs);
?>