<?php

require '../vendor/autoload.php';
require_once './model/Client.php';
require_once './config/db.php';
require_once './routes/client.php';

$app->add(function ($request, $response, $next) {
    // Permitir solicitudes desde cualquier origen
    $response = $next($request, $response)
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return $response;
});

$app->run();
