<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CurrencyRequest;
use Illuminate\Http\Request;

use App\Models\Currency;
use App\Models\User;

class CurrencyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $user = auth()->user();
        $currency = Currency::where("user_id", $user->id)->first();
        return $this->respondSuccessfully([
            "currency"  => $currency,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CurrencyRequest $request, Currency $currency)
    {
        $values = $request->validated();
        $currency->update($values);
        return $this->respondSuccessfully([
            "currency"  => $currency
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
