# Backend CRUD con Slim y Eloquent

Este proyecto implementa un backend CRUD (Crear, Leer, Actualizar, Eliminar) utilizando el framework PHP Slim 3 y el ORM Eloquent. Proporciona una API RESTful para gestionar clientes en una base de datos MySQL.

## Requisitos

- PHP 7.0 o superior.
- MySQL Server.
- Composer para gestionar las dependencias de PHP.

## Instalación

1. Clona este repositorio en tu máquina local:

    ```
    git clone <URL_DEL_REPOSITORIO>
    ```

2. Instala las dependencias de PHP utilizando Composer:

    ```
    composer install
    ```

## Configuración de la Base de Datos

1. Crea una base de datos MySQL con el nombre "api".
2. Abre el archivo `config/db.php` y actualiza la configuración de la base de datos según tu entorno.

## Uso

1. Inicia el servidor PHP integrado ejecutando el siguiente comando en la raíz del proyecto:

    ```
    php -S localhost:8080 -t public
    ```

2. Accede a la API RESTful utilizando el siguiente endpoint base:

    ```
    http://localhost:8080/project/crud/src/index.php
    ```

## Estructura del Proyecto

- `config/`: Contiene la configuración de la base de datos.
- `public/`: Directorio público donde se encuentra el archivo `index.php` como punto de entrada de la aplicación.
- `routes/`: Contiene las definiciones de las rutas y la lógica del CRUD.
- `src/model/`: Directorio donde se encuentra el modelo de datos para los clientes.
- Otros archivos y carpetas: Dependencias y archivos de configuración adicionales.

## Contribución

Si encuentras algún error o tienes alguna sugerencia de mejora, por favor abre un issue o envía un pull request. ¡Tus contribuciones son bienvenidas!

