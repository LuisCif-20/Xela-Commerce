<?php

namespace App\Http\Requests;

use Illuminate\Support\Arr;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
        $rules = [
            'user_name'         => 'required|string|max:25',
            'password'          => 'required|string',
            'old_password'      => 'required|string',
            'full_name'         => 'required|string|max:50',
            'birthdate'         => 'required|date',
            'profile_picture'   => 'required|image|mimes:png,jpg,jpeg|max:4096',
            'role_id'           => 'required|integer|exists:roles,id',
        ];
        return $this->classifyRules($rules);
    }

    public function classifyRules(array $rules): array {
        $route = $this->route()->getActionMethod();
        switch ($route) {
            case 'setPfp':
                return Arr::only($rules, ['profile_picture']);
            case 'index':
                return Arr::only($rules, ['user_name', 'password']);
            case 'setPwd':
                return Arr::only($rules, ['password', 'old_password']);
            case 'store' || 'storeAdmin':
                $rules['user_name'] .= '|unique:users,user_name';
                return Arr::except($rules, ['old_password', 'profile_picture']);
            default: // $route === 'update'
                $rules['user_name'] .= '|unique:users,user_name,'.$this->route('user')->id;
                return Arr::except($rules, ['password', 'old_password', 'role_id', 'profile_picture']);
        }
    }

}
