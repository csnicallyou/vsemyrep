<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $colors = [];
      foreach($_POST as $key => $value){
        $colors[] = "{$key}={$value}";
      }
    $data = implode("\n", $colors);

    $file = 'colors.txt'; // Путь к вашему файлу colors.txt

    if(file_put_contents($file, $data) !== false){
        echo "success";
    }
    else{
        echo "error";
    }

} else{
  echo "invalid_request";
}
?>