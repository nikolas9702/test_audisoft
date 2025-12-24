<?php

namespace App\Http\Controllers;

use App\Http\Requests\Site\SiteStore;
use App\Http\Requests\Site\SiteUpdate;
use App\Models\Categories;
use App\Models\Sites;
use Inertia\Inertia;

class SitesController extends Controller
{
    public function index()
    {
        return Inertia::render('catalog', [
            'categories' => Categories::all(),
            'sites' => Sites::all(),
        ]);
    }

    public function store(SiteStore $request)
    {
        try {
            $site = Sites::create($request->getData());

            return response()->json([
                'message' => 'Site created',
                'id' => $site->id
            ], 201);

        } catch (\Throwable $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(SiteUpdate $request, Sites $sites)
    {
        try {
            $sites->update($request->getData());

            return response()->json(['message' => 'Site updated'], 200);

        } catch (\Throwable $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Sites $sites)
    {
        try {
            $sites->delete();

            return response()->json(['message' => 'Site deleted'], 200);

        } catch (\Throwable $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
