<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Support\Arr;

class PublicationRequest extends FormRequest
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
            "title"         => "string|max:30",
            "price"         => "integer|min:0",
            "description"   => "string|max:255",
            'category_id'   => 'exists:categories,id',
            "image"         => "image|mimes:png,jpg,jpeg",
            'state'         => 'string|in:approved,reported'
        ];
        return $this->classifyRules($rules);
    }

    public function classifyRules(array $rules): array
    {
        $route = $this->route()->getActionMethod();
        if ($route === 'update') {
            return Arr::except($rules, ['category_id', 'state']);
        } else if ($route === 'setState') {
            $rules['state'] .= '|required';
            return Arr::only($rules, ['state']);
        } else {
            foreach ($rules as $field => $value) {
                if ($field !== 'price') {
                    $rules[$field] = 'required|' . $value;
                }
            }
            return Arr::except($rules, ['state']);
        }
    }

}
