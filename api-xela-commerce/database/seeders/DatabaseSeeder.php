<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Category;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Roles
        Role::create([
            'name' => 'Admin',
            'description' => 'Usuario encargado de gestionar la informacion de los clientes asi como de supervisar su actividad en la plataforma.'
        ]);
        
        Role::create([
            'name' => 'Comun',
            'description' => 'Usuario registrado en la plataforma con permisos para comprar, vender o intercambiar cualquiera de sus bienes o servicios.'
        ]);

        Category::create([
            'name'=> 'Compra',
            'description'=> 'En esta categoria puedes publicar bienes o servicios que deseas adquirir, indicando un precio razonable.'
        ]);

        Category::create([
            'name'=> 'Venta',
            'description'=> 'En esta categoria puedes publicar bienes o servicios que deseas vender.'
        ]);

        Category::create([
            'name'=> 'Voluntariado',
            'description'=> 'En esta categoria puedes publicar cuando necesites ayuda para realizar una accion benefica para la comunidad.'
        ]);

    }
}
