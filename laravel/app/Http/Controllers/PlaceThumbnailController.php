<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class PlaceThumbnailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function get(string $name): JsonResponse
    {
        $params = http_build_query([
            'q' => $name,
            'ijn' => 0,
            'engine'=> 'google_images',
            'api_key' => 'dd6e585adbf4917b5f73cf25317c810ec3484f94df706b4bdf6f4e9ffd4c8863',
        ]);

        $url = "https://serpapi.com/search.json?{$params}";

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])
            ->get($url);

        $body = $response->json('images_results');

        if (!$body) {
            return response()->json(
                [
                    'errors' => [
                        'The Thumbnail not found',
                    ],
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json([
            'data' => current($body)['thumbnail'],
        ]);
    }
}
