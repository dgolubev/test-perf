<?php

namespace Database\Seeders;

use App\Models\Accounts;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        $i = 0;
        while ($i < 100) {
            $account = Accounts::create();
            $account->firstName = $faker->word;
            $account->lastName = $faker->word;

            $i++;
        }
        //
    }
}
