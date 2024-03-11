<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

$app = new App();

$app->get('/', function (Request $request, Response $response) {
    try {
        return $response->withJson(["message" => "ya estas en la api"]);
    } catch (Exception $e) {
        return $response->withStatus(500)
            ->withJson(["error" => "Se produjo un error al procesar la solicitud: " . $e->getMessage()]);
    }
});

$app->post('/createclient', function (Request $request, Response $response) {
    try {
        $data = $request->getParsedBody();
        $client = new Client();
        $client->nombre = $data['nombre'];
        $client->apellido = $data['apellido'];
        $client->edad = $data['edad'];
        $client->fecha_nacimiento = $data['fecha_nacimiento'];
        $client->dni = $data['dni'];
        $client->save();

        return $response->withJson($client, 201);
    } catch (Exception $e) {
        return $response->withStatus(500)
            ->withJson(["error" => "Se produjo un error al crear el cliente: " . $e->getMessage()]);
    }
});

$app->get('/listclients', function (Request $request, Response $response) {
    try {
        $clients = Client::all();
        return $response->withJson($clients);
    } catch (Exception $e) {
        return $response->withStatus(500)
            ->withJson(["error" => "Se produjo un error al obtener la lista de clientes: " . $e->getMessage()]);
    }
});

$app->put('/updateclient/{dni}', function (Request $request, Response $response, $args) {
    try {
        $data = $request->getParsedBody();
        $client = Client::where('dni', $args['dni'])->first();
        $client->nombre = $data['nombre'];
        $client->apellido = $data['apellido'];
        $client->edad = $data['edad'];
        $client->fecha_nacimiento = $data['fecha_nacimiento'];
        $client->save();
        return $response->withJson($client);
    } catch (Exception $e) {
        return $response->withStatus(500)
            ->withJson(["error" => "Se produjo un error al actualizar el cliente: " . $e->getMessage()]);
    }
});

$app->delete('/deleteclient/{dni}', function (Request $request, Response $response, $args) {
    try {
        $client = Client::where('dni', $args['dni'])->first();
        $client->delete();
        return $response->withJson(['message' => 'Cliente eliminado']);
    } catch (Exception $e) {
        return $response->withStatus(500)
            ->withJson(["error" => "Se produjo un error al eliminar el cliente: " . $e->getMessage()]);
    }
});
