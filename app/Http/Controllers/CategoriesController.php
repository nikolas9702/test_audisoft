<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CategoryStore;
use App\Http\Requests\Category\CategoryUpdate;
use App\Models\categories;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryStore $request)
    {
        try {
            if($categories = Categories::create($request->getData()) ) {
                return response()->json(['message' => 'Category created','id'=>$categories->id], 201);
            }
        }
        catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryUpdate $request, categories $categories)
    {
        try {
            $categories->fill($request->getData());

            if( $categories->save() ) {
                return response()->json(['message' => 'Category Updated'], 201);
            }
        }
        catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categories $categories): \Illuminate\Http\JsonResponse
    {
        try {
            if ( !$categories->sites()->exists() && $categories->delete() ) {
                return response()->json(['message' => 'Category Delete'], 200);
            }
            else {
                return response()->json(['message' => 'Category Don\'t it\'s possible '], 409);
            }
        }
        catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
