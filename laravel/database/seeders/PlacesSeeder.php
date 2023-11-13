<?php

namespace Database\Seeders;

use App\Models\Place;
use Illuminate\Database\Seeder;

class PlacesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        $i = 0;
        while ($i < 10) {
            Place::create([
                'name' => $faker->sentence(),
            ]);

            $i++;
        }
    }
}
