<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PublicationRequest;
use App\Models\Publication;
use App\Utilities\ImageManager;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;


class PublicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $publications = Publication::all();
        return $this->respondSuccessfully([
            'publications' => $publications
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PublicationRequest $request)
    {
        $data = Arr::except($request->validated(), ['image']);
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $data['image'] = ImageManager::saveImage($image, 'publications');
        }
        $user = auth()->user();
        $data['user_id'] = $user->id;
        Publication::create($data);
        $publications = Publication::all();
        return $this->respondSuccessfully([
            'publications' => $publications
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Publication $pub)
    {
        return $this->respondSuccessfully([
            'publication' => $pub
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PublicationRequest $request, Publication $pub)
    {
        $data = Arr::except($request->validated(), ['image']);
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $data['image'] = ImageManager::updateImage($image, 'publications', $pub->image);
        }
        $pub->update($data);
        $publications = Publication::all();
        return $this->respondSuccessfully([
            'publications' => $publications
        ]);
    }

    public function setState(PublicationRequest $request, Publication $pub) {
        $data = $request->validated();
        $pub->update(['state' => $data['state']]);
        $publications = Publication::all();
        return $this->respondSuccessfully([
            'publications'=> $publications
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Publication $pub)
    {
        ImageManager::deleteImage('publications', $pub->image);
        $pub->delete();
        $publications = Publication::all();
        return $this->respondSuccessfully([
            'publications'=> $publications
        ]);
    }
}
