<?php
$msgs = [];
if ($_SERVER["REQUEST_METHOD"] == "POST") {
 
    $token = "1967400244:AAHYAKUCzZ2ubt5tYFpKXz-eNLwl2owMEL8";
    $chat_id = "-508647053";

    // ТОВАРЫ
    $jsonText = $_POST['Товары'];
    $myArray = json_decode($jsonText, true);

    $prod = '';

    foreach ($myArray as $key => $value) {
            $cat = $value["category"];
            $title = $value["title"];
            $price = $value["price"];
            $counter = $value["counter"];
            $totalprice = $value["totalprice"];

            $prod .= "$title " . "$price " . "$counter " . "%0A";
    }

    $totalpricevariable = $totalprice;
    // КОНЕЦ ТОВАРОВ
 
    if (!empty($_POST['Телефон']) && !empty($_POST['Адрес'])){

        $bot_url = "https://api.telegram.org/bot{$token}/";
        $urlForPhoto = $bot_url . "sendPhoto?chat_id=" . $chat_id;
 
        if(!empty($_FILES['file']['tmp_name'])) {
             
            // Путь загрузки файлов
            $path = $_SERVER['DOCUMENT_ROOT'] . '/telegramform/tmp/';
 
            // Массив допустимых значений типа файла
            $types = array('image/gif', 'image/png', 'image/jpeg');
 
            // Максимальный размер файла
            $size = 1024000;
 
            // Проверяем тип файла
             if (!in_array($_FILES['file']['type'], $types)) {
                 $msgs['err'] = 'Запрещённый тип файла.';
                echo json_encode($msgs);
                die();
             }
              
             // Проверяем размер файла
             if ($_FILES['file']['size'] > $size) {
                 $msgs['err'] = 'Слишком большой размер файла.';
                echo json_encode($msgs);
                die('Слишком большой размер файла.');
             }
              
             // Загрузка файла и вывод сообщения
             if (!@copy($_FILES['file']['tmp_name'], $path . $_FILES['file']['name'])) {
                 $msgs['err'] = 'Что-то пошло не так. Файл не отправлен!';
                 echo json_encode($msgs);
             } else {
                $filePath = $path . $_FILES['file']['name'];
                $post_fields = array('chat_id' => $chat_id, 'photo' => new CURLFile(realpath($filePath)) );
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_HTTPHEADER, array( "Content-Type:multipart/form-data" ));
                curl_setopt($ch, CURLOPT_URL, $urlForPhoto);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
                $output = curl_exec($ch);
                unlink($filePath);
             }
        }
 
        if (isset($_POST['Телефон'])) {
          if (!empty($_POST['Телефон'])){
            $phone = "Телефон: " . "%2B" . strip_tags($_POST['Телефон']) . "%0A" . "%0A";
          }
        }
 
        if (isset($_POST['Адрес'])) {
          if (!empty($_POST['Адрес'])){
            $address = "Адрес: " . strip_tags($_POST['Адрес']) . "%0A" . "%0A";
          }
        }

        if (isset($prod)) {
            if (!empty($prod)){
              $prod = "Товары: " . strip_tags($prod) . "%0A";
            }
        }

        if (isset($totalpricevariable)) {
            if (!empty($totalpricevariable)){
              $totalpricevariable = "Итого: " . strip_tags($totalpricevariable) . "%0A" . "%0A";
            }
        }
 
        if (isset($_POST['form_subject'])) {
          if (!empty($_POST['form_subject'])){
            $theme = "Тема: " . strip_tags($_POST['form_subject']);
          }
        }

        // Формируем текст сообщения
        $txt = $phone . $address . $prod . $totalpricevariable . $theme;
 
        $sendTextToTelegram = file_get_contents("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}");
        if ($output && $sendTextToTelegram) {
            $msgs['okSend'] = 'Спасибо! Ожидайте звонка.';
            echo json_encode($msgs);
        } elseif ($sendTextToTelegram) {
            $msgs['okSend'] = 'Спасибо! Ожидайте звонка.';
            echo json_encode($msgs);
          return true;
        } else {
            $msgs['err'] = 'Ошибка. Сообщение не отправлено!';
            echo json_encode($msgs);
            die('Ошибка. Сообщение не отправлено!');
        }
 
    } else {
        $msgs['err'] = 'Пожалуйста, заполните все поля';
        echo json_encode($msgs);;
    }
} else {
  header ("Location: /");
}
?>