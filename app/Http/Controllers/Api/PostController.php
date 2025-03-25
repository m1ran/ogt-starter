<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->input('page', 1);
        $search = $request->input('search', '');
        $perPage = $request->input('per_page', 10);

        $query = Post::query();

        if ($search) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        }

        $posts = $query->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'posts' => $posts->items(),
            'total' => $posts->total(),
            'per_page' => $posts->perPage(),
            'page' => $posts->currentPage(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|min:5',
            'description' => 'required|string|min:10',
        ]);

        return response()->json(
            Post::create($request->only(['title', 'description'])),
            201
        );
    }
}
