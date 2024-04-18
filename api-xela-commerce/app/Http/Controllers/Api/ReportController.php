<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReportRequest;
use App\Models\Publication;
use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReportRequest $request, Publication $pub)
    {
        $data = $request->validated();
        $report = Report::where("user_id", $data["user_id"])->where("publication_id", $pub->id)->first();
        if ($report) {
            $report->update(["reason" => $data["reason"]]);
            return $this->respondSuccessfully();
        } else {
            $data["publication_id"] = $pub->id;
            if (Report::where("user_id", $data["user_id"])->where("publication_id", $pub->id)) {

            }
            Report::create($data);
            if (Report::where('publication_id', $pub->id)->count() >= 3 && $pub->state !== 'reported') {
                $pub->update(["state" => "reported"]);
                $publications = Publication::all();
                return $this->respondSuccessfully(["publications" => $publications]);
            }
            return $this->respondSuccessfully();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Publication $pub)
    {
        $reasons = Report::where("publication_id", $pub->id)->with("user")->get();
        return $this->respondSuccessfully([
            "reasons" => $reasons,
        ]);
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
