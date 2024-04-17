<?php

use App\Http\Controllers\Api\CurrencyController;
use App\Http\Controllers\Api\PublicationController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('jwt.auth')->prefix('user')
    ->controller(UserController::class)->group(function () {
        Route::get('/my-data', 'show');
        Route::post('/sign-up', 'store')->withoutMiddleware('jwt.auth');
        Route::post('/sign-in', 'index')->withoutMiddleware('jwt.auth');
        Route::post('/log-out', 'logout');
        Route::post('/reg-admin', 'storeAdmin');
        Route::post('/refresh', 'refreshToken')->withoutMiddleware('jwt.auth')->middleware('jwt.refresh');
        Route::post('/set-pfp/{user}', 'setPfp');
        Route::patch('/update/{user}', 'update');
        Route::patch('/set-pwd/{user}', 'setPwd');
        Route::delete('/delete/{user}', 'destroy');
    });

Route::middleware('jwt.auth')->prefix('currency')
    ->controller(CurrencyController::class)->group(function () {
        Route::get('/my-currency','show');
        Route::post('/update/{currency}', 'update');
    });

Route::middleware('jwt.auth')->prefix('publication')
    ->controller(PublicationController::class)->group(function () {
        Route::get('/all', 'index')->withoutMiddleware('jwt.auth');
        Route::get('/show/{pub}', 'show');
        Route::post('/create', 'store');
        Route::post('/update/{pub}', 'update');
        Route::patch('/set-state/{pub}', 'setState');
        Route::delete('/delete/{pub}', 'destroy');
    });
