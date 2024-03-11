<?php

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table = 'clients'; // Nombre de la tabla de clientes en tu base de datos
    protected $fillable = ['nombre', 'apellido', 'edad', 'fecha_nacimiento', 'dni'];

    // Define las reglas de validación para los campos
    public static $rules = [
        'nombre' => 'nullable|string',
        'apellido' => 'nullable|string',
        'edad' => 'nullable|string',
        'fecha_nacimiento' => 'nullable|string',
        'dni' => 'nullable|string'
    ];
    public $timestamps = false;
}
