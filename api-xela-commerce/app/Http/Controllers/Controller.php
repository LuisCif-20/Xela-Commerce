<?php

namespace App\Http\Controllers;

abstract class Controller
{

    public function respondSuccessfully(array $data = null, bool $isCreated = false) {
        $response = [
            'success' => true,
            'message' => 'Request successfully completed.',
        ];
        if (isset($data)) {
            foreach ($data as $key => $value) {
                $response[$key] = $value;
            }
        }
        return response()->json($response, $isCreated ? 201 : 200);
    }

}
