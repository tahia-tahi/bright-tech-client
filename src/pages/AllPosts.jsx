import React, { useEffect, useState } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { Link } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";


const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();


  const fetchPosts = async () => {
    try {
      const params = new URLSearchParams({
        search,
        sort,
        page,
        limit: 9,
      });

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts?${params.toString()}`
      );
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleReadMore = (postId) => {
    if (!isLoaded) return;

    if (user) {
      navigate(`/posts/${postId}`);
    } else {
      navigate("/auth/sign-up");
    }
  };


  useEffect(() => {
    fetchPosts();
  }, [search, sort, page]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12 bg-gray-50 min-h-screen">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          All Posts
        </h1>

        {/* 🔍 Search + Sort */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full md:w-80 px-4 py-2.5 rounded-lg
               border border-gray-300 bg-white text-gray-900
               focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-300
               bg-white text-gray-900
               focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          >
            <option value="latest">Latest</option>
            <option value="popular">Popular</option>
          </select>
        </div>


        {/* Posts */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          {posts.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              No posts found.
            </p>
          )}

          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-indigo-600 rounded-2xl shadow-lg
               hover:shadow-xl transition overflow-hidden"
            >
              {/* Image */}
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="h-48 bg-indigo-500 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {post.title.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="p-5 text-white">
                <h2 className="text-lg font-semibold text-center">
                  {post.title}
                </h2>

                <p className="mt-2 text-sm text-indigo-100 text-center leading-relaxed">
                  {post.content.length > 100
                    ? post.content.slice(0, 100) + "..."
                    : post.content}
                </p>

                {/* Stats */}
                <div className="flex justify-center gap-6 mt-4 text-indigo-200">
                  <div className="flex items-center gap-1 text-sm">
                    <ThumbsUp className="w-4 h-4" />
                    {post.likeCount || 0}
                  </div>

                  <div className="flex items-center gap-1 text-sm">
                    <MessageCircle className="w-4 h-4" />
                    {post.commentCount || 0}
                  </div>
                </div>

                {/* Read more */}
                <div className="text-center">
                <button
                  onClick={() => handleReadMore(post._id)}
                  className="inline-block text-white text-cen font-medium hover:underline"
                >
                  Read more →
                </button>
                </div>


              </div>
            </div>
          ))}

        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-12">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-5 py-2 border rounded-lg
                     text-primary bg-white
                     disabled:opacity-50 hover:bg-gray-100"
          >
            Prev
          </button>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-5 py-2 border rounded-lg
                     text-primary bg-white hover:bg-gray-100"
          >
            Next
          </button>
        </div>


      </div>

    </div>
  );
};

export default AllPosts;
