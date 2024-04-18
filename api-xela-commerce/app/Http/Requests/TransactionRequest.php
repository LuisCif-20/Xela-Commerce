<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "amount"            => "required|integer|min:0|max:9999",
            "category_id"       => "required|exists:categories,id",
            "receiving_user_id" => "required|exists:users,user_name",
            "issuing_user_id"   => "required|exists:users,id",
        ];
    }
}
