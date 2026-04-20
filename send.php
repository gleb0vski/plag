<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Метод не поддерживается']);
    exit;
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Валидация
if (empty($name)) {
    echo json_encode(['success' => false, 'error' => 'Введите ваше имя']);
    exit;
}

$phoneDigits = preg_replace('/\D/', '', $phone);
if (empty($phoneDigits) || strlen($phoneDigits) < 11) {
    echo json_encode(['success' => false, 'error' => 'Введите корректный номер телефона (10 цифр после +7)']);
    exit;
}

if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Введите корректный email']);
    exit;
}

if (empty($message)) {
    echo json_encode(['success' => false, 'error' => 'Опишите вашу задачу']);
    exit;
}

// Кому отправляем
$to = 'help@anti-domate.ru';
$subject = 'Заявка с сайта ANTI-DOMATE';

// Тело письма
$body = "Имя: $name\n";
$body .= "Телефон: $phone\n";
if (!empty($email)) {
    $body .= "Email: $email\n";
}
$body .= "Сообщение: $message\n";
$body .= "Дата: " . date('d.m.Y H:i:s') . "\n";

// Заголовки
$headers = "From: no-reply@anti-domate.ru\r\n";
$headers .= "Reply-To: " . (!empty($email) ? $email : $to) . "\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

// Отправка
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Заявка отправлена']);
} else {
    echo json_encode(['success' => false, 'error' => 'Ошибка отправки. Попробуйте позже.']);
}
?>