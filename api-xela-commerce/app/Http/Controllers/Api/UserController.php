<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Arr;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;

use App\Utilities\ImageManager;

use App\Models\Currency;
use App\Models\User;

use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class UserController extends Controller
{
    
    public function index(UserRequest $request) {
        $credentials = $request->validated();
        if (!$token = auth()->attempt($credentials)) {
            throw new UnauthorizedHttpException('', 'Incorrect credentials');
        }
        $user = auth()->user();
        return $this->respondSuccessfully([
            'user'  => $user,
            'token' => $token
        ]);
    }

    public function store(UserRequest $request) {
        $user_data = $request->validated();
        User::create($user_data);
        $token = auth()->attempt(Arr::only($user_data, ['user_name', 'password']));
        $user = auth()->user();
        $this->createCurrency($user);
        return $this->respondSuccessfully([
            'user'  => $user,
            'token' => $token
        ], true);
    }

    public function storeAdmin(UserRequest $request) {
        $user_data = $request->validated();
        User::create($user_data);
        return $this->respondSuccessfully();
    }

    public function show() {
        $user = auth()->user();
        return $this->respondSuccessfully([
            'user' => $user
        ]);
    }

    public function update(UserRequest $request, User $user) {
        $new_user_data = $request->validated();
        $user->update($new_user_data);
        return $this->respondSuccessfully([
            'user' => $user
        ]);
    }

    public function setPwd(UserRequest $request, User $user) {
        $passwords = $request->validated();
        if (!Hash::check($passwords['old_password'], $user->password)) {
            throw new UnauthorizedHttpException('', 'Incorrect current password');   
        }
        $user->update([
            'password' => $passwords['password']
        ]);
        return $this->respondSuccessfully([
            'user' => $user
        ]);
    }

    public function setPfp(UserRequest $request, User $user) {
        if ($request->hasFile('profile_picture')) {  
            $newImage = $request->file('profile_picture');
            $image = ImageManager::updateImage($newImage, 'profile-pictures', $user->profile_picture);
            $user->update(['profile_picture' => $image]);
        }
        return $this->respondSuccessfully([
            'user' => $user
        ]);
    }

    public function refreshToken() {
        $token = auth()->refresh();
        return $this->respondSuccessfully(['token' => $token]);
    }

    public function logout() {
        auth()->logout();
        return $this->respondSuccessfully();
    }

    public function destroy(User $user) {
        $user->delete();
        return $this->respondSuccessfully();
    }

    private function createCurrency($user) {
        if ($user->role->name === 'Comun') {
            Currency::create(['user_id' => $user->id]);
        }
    }

}
