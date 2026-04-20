<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Метод не поддерживается']);
    exit;
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

if (empty($name)) {
    echo json_encode(['success' => false, 'error' => 'Введите ваше имя']);
    exit;
}
if (empty($phone) || strlen($phone) < 10) {
    echo json_encode(['success' => false, 'error' => 'Введите корректный номер телефона']);
    exit;
}
if (empty($message)) {
    echo json_encode(['success' => false, 'error' => 'Опишите вашу задачу']);
    exit;
}

$to = 'help@anti-domate.ru';
$subject = 'Заявка с сайта ANTI-DOMATE';
$body = "Имя: $name\nТелефон: $phone\nСообщение: $message\nДата: " . date('d.m.Y H:i:s');
$headers = "From: no-reply@anti-domate.ru\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Заявка отправлена']);
} else {
    echo json_encode(['success' => false, 'error' => 'Ошибка отправки. Попробуйте позже.']);
}
?>