<?php

use App\Http\Controllers\EntryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route :: get('/Diary' , [EntryController::class , "index"]);
Route :: get('/Diary/{entry}' , [EntryController::class , "show"]);
Route :: post('/Diary' , [EntryController::class , "store"]);
Route::put('/Diary/{id}', [EntryController::class, "update"]);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
