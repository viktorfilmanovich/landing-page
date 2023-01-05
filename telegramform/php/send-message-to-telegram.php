<?
// ОТПРАВКА НА ПОЧТУ
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $admin_email = "veelfeel8888@gmail.com";
  $form_subject = $_POST['form_subject'];
  $headers= "MIME-Version: 1.0\r\n";
  $headers .= "Content-type: text/html; charset=utf-8\r\n"; 
  $headers .= "From: test.ru <test.ru>\r\n"; 

  if (!empty($_POST['name']) && !empty($_POST['phone']) && !empty($_POST['address'])){

    $name = "Имя: " . $_POST['name'];
    $phone = "Телефон: " . $_POST['phone'];
    $address = "Адрес: " . $_POST['address'];

    $txt .= "
		<tr style='display: grid;'>
			<td style='padding: 15px; border: #e9e9e9 1px solid; border-radius: 5px;'>$name</td>
			<td style='padding: 15px; border: #e9e9e9 1px solid; border-radius: 5px;'>$phone</td>
			<td style='padding: 15px; border: #e9e9e9 1px solid; border-radius: 5px;'>$address</td>
		</tr>
		";

    mail($admin_email, $form_subject, $txt, $headers);
  }
} else {
  header ("Location: /");
}
// КОНЕЦ ОТПРАВКИ НА ПОЧТУ

//ОТПРАВКА В ТЕЛЕГРАМ
if ($_SERVER["REQUEST_METHOD"] == "POST") {
 
    $token = "1967400244:AAHYAKUCzZ2ubt5tYFpKXz-eNLwl2owMEL8";
    $chat_id = "-508647053";

    if (!empty($_POST['name']) && !empty($_POST['phone']) && !empty($_POST['address'])){

        $name = "Имя: " . $_POST['name'] . "%0A" . "%0A";
        $phone = "Телефон: " . "%2B" . $_POST['phone'] . "%0A" . "%0A";
        $address = "Адрес: " . $_POST['address'] . "%0A" . "%0A";
        $theme = "Тема: " . strip_tags($_POST['form_subject']);

        // Формируем текст сообщения
        $txt = $name . $phone . $address . $theme;
 
        $sendTextToTelegram = file_get_contents("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}");
 
    } 
   
} else {
  header ("Location: /");
}
//КОНЕЦ ОТПРАВКИ В ТЕЛЕГРАМ
?>