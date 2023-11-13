<?php

namespace Tests\Http\Controllers;

use App\Models\Place;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class PlaceControllerTest extends TestCase
{
    use DatabaseMigrations;

    const URL = '/api/places';

    static private $dummyAName = 'a123';
    static private $dummyBName = 'bcde';

    protected function setUp(): void {
        parent::setUp();

        Place::create([
            'name' => self::$dummyAName,
        ])->save();

        Place::create([
            'name' => self::$dummyBName,
        ])->save();
    }

    public function test_index_ok(): void {
        $response = $this->get(self::URL,);

        $response
            ->assertStatus(Response::HTTP_OK)
            ->assertJson([
                'data' => [
                    [
                        'name' => self::$dummyAName,
                    ],
                    [
                        'name' => self::$dummyBName,
                    ],

                ],
            ]);
    }

    public function test_index_ok_order(): void {
        $response = $this->call(
            Request::METHOD_GET, self::URL,
            [
                'orderBy' => 'name|1',
            ]
        );

        $response
            ->assertStatus(Response::HTTP_OK)
            ->assertJson([
                'data' => [
                    [
                        'name' => self::$dummyBName,
                    ],
                    [
                        'name' => self::$dummyAName,
                    ],

                ],
            ]);
    }

    public function test_index_ok_search(): void {
        $response = $this->call(
            Request::METHOD_GET, self::URL,
            [
                'search' => 'cd',
            ]
        );

        $response
            ->assertStatus(Response::HTTP_OK)
            ->assertJson([
                'data' => [
                    [
                        'name' => self::$dummyBName,
                    ],
                ],
            ]);
    }

    public function test_store_ok(): void {
        $response = $this->post(
            self::URL,
            [
                'name' => 'dummyName',
            ],
        );

        $response
            ->assertStatus(Response::HTTP_CREATED)
            ->assertJson([
                'data' => [
                    'name' => 'dummyName',
                ],
            ]);
    }

    public function test_store_validation_fail(): void {
        $response = $this->post(self::URL, [],);

        $response
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJson([
                'errors' => [
                    'The name field is required.',
                ],
            ]);
    }
}
