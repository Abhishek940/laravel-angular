<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $responseData = [];
                    
        try {
            $queryData = DB::table("categories as cat")
            ->select('cat.id','cat.categoryName');
                   
           $data = $queryData->get()->toArray();
        
            $page = request()->get('page', 1);
            $perPage = 10;
            $offset = ($page - 1) * $perPage;
            $total = count($data);
        
             $paginationData = array_slice($data, $offset, $perPage);
        
            if (empty($paginationData)) {
                $msg = 'No record found.';
                $success = false;
                $statusCode = 404;
            } else {
                $msg = "Data Retrieved Successfully";
                $success = true;
                $statusCode = 200;
            }
        
            $responseData = $paginationData;
        } catch (\Throwable $t) {
            Log::error("Error", [
                'Controller' => 'CategoryController',
                'Method' => 'index',
                'Error'  => $t->getMessage(),
                'Line'   => $t->getLine()
            ]);
            $success = false;
            $msg = 'Something went wrong';
            $statusCode = 500;
        }
        
        return response()->json([
            "success" => $success,
            "statusCode" => $statusCode,
            "msg" => $msg,
            "data" => $responseData,
            "pagination" => [
                "total" => $total,
                "per_page" => $perPage,
                "current_page" => $page,
                "last_page" => ceil($total / $perPage)
            ]
        ], $statusCode);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCategoryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $status = "ERROR";
         try {

            if (!empty(request()->all())) {
                $validator = Validator::make($request->all(), [
                    'categoryName' => 'bail|required|regex:/^[A-Za-z ]+$/|min:2|max:25|unique:categories,categoryName',
                ], [
                    'categoryName.required'     => 'Please enter cateory name.',
                    'categoryName.min'          => 'Category name length should not be less than 2 characters.',
                    'categoryName.max'          => 'Category name length should not be greater than 25 characters.',
                    'categoryName.unique'       => 'The category name already exists.',
                    'categoryName.regex'        => 'Invalid input for district name.',
                   
                ]);

                if ($validator->fails()) {
                    $errors = $validator->errors();
                    $msg = '';
                    foreach ($errors->all() as $message) {
                        $msg = $message;
                    }
                    $statusCode = 402;
                } else {
                    $obj = new Category();
                    $obj->categoryName = $request->input("categoryName");
                    if ($obj->save()) {
                       $status = "SUCCESS";
                        $statusCode = 200;
                        $msg = "Category added successfully";
                    }
                }
            } else {
                $statusCode = 500;
                $msg = "Something went wrong, Please try later.";
            }
         
        } catch (\Throwable $t) {
            Log::error("Error", [
                'Controller' => 'CategoryController',
                'Method'     => 'store',
                'Error'      => $t->getMessage()
            ]);
                   
        }
       
        return response()->json([
            "status" => $status,
            "statusCode" => $statusCode,
            "msg" => $msg
        ], $statusCode);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCategoryRequest  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        //
    }
}
