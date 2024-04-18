<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TransactionRequest;
use App\Models\Category;
use App\Models\Currency;
use App\Models\Publication;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user) {
        $transactions = Transaction::where("issuing_user_id", $user->id)->orWhere("receiving_user_id", $user->id)->get();
        return $this->respondSuccessfully(["transactions" => $transactions]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TransactionRequest $request, Publication $pub) {
        $data = $request->validated();
        $data["publication_id"] = $pub->id;
        $r_user = User::where("user_name", $data["receiving_user_id"])->first();
        $i_user = User::find($data['issuing_user_id']);
        $data["receiving_user_id"] = $r_user->id;
        Transaction::create($data);
        $r_curr = Currency::where("user_id", $r_user->id)->first();
        $i_curr = Currency::where("user_id", $i_user->id)->first();
        if (Category::find($data["category_id"])->name === "Voluntariado") {
            $r_curr->update(["ceibas" => $r_curr->ceibas + 50, "penalization" => $r_curr->penalization + 50]);
            $i_curr->update(["ceibas" => $i_curr->ceibas + 50, "penalization" => $i_curr->penalization + 50]);
        } else {
            $r_curr->update(["ceibas" => $r_curr->ceibas + $data['amount']]);
            $i_curr->update(["ceibas" => $i_curr->ceibas - $data['amount']]);
        }
        $transactions = Transaction::where("issuing_user_id", $i_user->id)->orWhere("receiving_user_id", $i_user->id)->get();
        return $this->respondSuccessfully(["transactions" => $transactions]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
