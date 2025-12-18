<?php
header('Content-Type: application/json');

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate required fields
$required = ['name', 'phone', 'city', 'size', 'colors'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => "Missing field: $field"]);
        exit;
    }
}

// Prepare payload
$payload = json_encode([
    'name' => $data['name'],
    'phone' => $data['phone'],
    'city' => $data['city'],
    'size' => $data['size'],
    'quantity' => $data['quantity'] ?? 1,
    'colors' => $data['colors'],
    'total' => $data['total'] ?? ''
]);

// Send to webhook using cURL
$ch = curl_init('https://primary-production-b1a51.up.railway.app/webhook/order');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_TIMEOUT => 30
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// Return response
if ($error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Connection failed']);
} elseif ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['success' => true]);
} else {
    http_response_code($httpCode);
    echo json_encode(['success' => false, 'error' => 'Webhook returned error']);
}
