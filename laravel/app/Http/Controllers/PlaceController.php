<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Mockery\Exception;
use Symfony\Component\HttpFoundation\Response;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $qb = DB::table(Place::TABLE_NAME);

        if ($request->has('orderBy')) {
            [$field, $dir] = explode('|', $request->input('orderBy'));

            $qb->orderBy($field, $dir == '0' ? 'asc' : 'desc');
        }

        if ($request->has('search')) {
            $search = $request->input('search');

            $qb->where('name', 'like', "%{$search}%");
        }

        return response()->json(
            [
                'data' => $qb->get(),
            ],
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages()->all(),
            ],
            Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $place = Place::create([
            'name' => $request->name,
        ]);
        $place->save();

        return response()->json(
            [
                'data' => $place,
            ],
            Response::HTTP_CREATED,
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages()->all(),
            ],
                Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $place = Place::find($id);
        $place->update([
            'name' => $request->input('name'),
        ]);

        return response()->json(
            [
                'data' => $place,
            ],
            Response::HTTP_ACCEPTED,
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Place $place): JsonResponse
    {
        $place->delete();

        return response()->json([], Response::HTTP_ACCEPTED);
    }
}
