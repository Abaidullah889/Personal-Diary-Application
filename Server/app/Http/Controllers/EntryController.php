<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;

class EntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Entry::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([

            "title" => "required",
            "content" => "required",

        ]);

        $entry = Entry :: create($validatedData);
        return response()->json($entry, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Entry $entry)
    {
        return $entry;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,$id)
    {
        $entry = Entry::findOrFail($id);

        $validatedData = $request->validate([

            "title" => "required",
            "content" => "required",

        ]);
         
        $entry->update($validatedData);
        return response()->json($entry);

    }
    
}
