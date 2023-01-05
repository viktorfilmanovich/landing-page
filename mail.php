<?
// ОТПРАВКА НА ПОЧТУ
require_once 'PHPMailer/PHPMailerAutoload.php';

$admin_email = ["veelfeel8888@gmail.com"];
foreach ( $admin_email as $key => $value ) {
	array_push($admin_email, $value);
}

$form_subject = trim($_POST["form_subject"]);

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';

$jsonText = $_POST['Товары'];
$myArray = json_decode($jsonText, true);

$prod = '';

foreach ($myArray as $key => $value) {
	$cat = $value["category"];
	$title = $value["title"];
	$price = $value["price"];
	$counter = $value["counter"];
	$totalprice = $value["totalprice"];
	$prod .= "
		<tr>
			<td style='padding: 15px; border: #e9e9e9 1px solid; border-radius: 5px;'>$title</td>
			<td style='padding: 15px; border: #e9e9e9 1px solid; border-radius: 5px;'>$price</td>
			<td style='padding: 15px; border: #e9e9e9 1px solid; border-radius: 5px;'>$counter</td>
		</tr>
	";
}

$c = true;
$message = '';
foreach ( $_POST as $key => $value ) {
	if ( $value != ""  && $key != "admin_email" && $key != "form_subject"  && $key != "Товары") {
		if (is_array($value)) {
			$val_text = '';
			foreach ($value as $val) {
				if ($val && $val != '') {
					$val_text .= ($val_text==''?'':', ').$val;
				}
			}
			$value = $val_text;
		}
		$message .= "
		" . ( ($c = !$c) ? '<tr>':'<tr>' ) . "
		<tr>
			<td style='padding: 0 0 10px; font-size: 15px;'>$key:</td>
			<td style='padding: 0 0 10px; font-size: 15px;'>$value</td>
		</tr>
		";
	}
}

$totalpricevariable = "
	<tr>
		<td style='padding: 18px 0 0; font-size: 16px;'><span style='text-transform: uppercase; font-weight: 600;'>Итого: </span>$totalprice</td>
	</tr>
	";

$message = "<table>$message $prod $totalpricevariable</table>";


// От кого
$mail->setFrom('adm@' . $_SERVER['HTTP_HOST'], 'Your best site');

// Кому
foreach ( $admin_email as $key => $value ) {
	$mail->addAddress($value);
}
// Тема письма
$mail->Subject = $form_subject;

// Тело письма
$body = $message;
// $mail->isHTML(true);  это если прям верстка
$mail->msgHTML($body);


// Приложения
if ($_FILES){
	foreach ( $_FILES['file']['tmp_name'] as $key => $value ) {
		$mail->addAttachment($value, $_FILES['file']['name'][$key]);
	}
}

$mail->send();
// КОНЕЦ ОТПРАВКИ НА ПОЧТУ

//ОТПРАВКА В ТЕЛЕГРАМ
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
//КОНЕЦ ОТПРАВКИ В ТЕЛЕГРАМ
?>