import React, { useEffect, useState } from 'react';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleLikeToggle = async (postId) => {
    try {
      // Optional: call your like API here
      setPosts(posts.map(post =>
        post._id === postId
          ? {
            ...post,
            liked: !post.liked,
            likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1,
          }
          : post
      ));
    } catch (error) {
      console.error('Failed to update like:', error);
    }
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">All Posts</h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No posts available.
          </p>
        )}

        {posts.map(post => (
          <div
            key={post._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Post Image */}
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="h-48 w-full object-cover"
              />
            ) : (
              <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg font-medium">
                {post.title.slice(0, 2).toUpperCase()}
              </div>
            )}


            {/* Content */}
            <div className="p-5">
              <h2 className="text-xl font-semibold text-center">{post.title}</h2>
              <p className="mt-2 text-gray-600 text-sm text-center">
                {post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-center gap-6 mt-4 text-gray-600">
                {/* Like Button */}
                <button
                  onClick={() => handleLikeToggle(post._id)}
                  className={`flex items-center gap-1 text-sm font-medium transition
                    ${post.liked ? 'text-blue-600' : 'hover:text-blue-600'}
                  `}
                >
                  <ThumbsUp
                    className="w-5 h-5"
                    fill={post.liked ? '#2563eb' : 'none'}
                  />
                  {post.liked ? 'Liked' : 'Like'} · {post.likeCount || 0}
                </button>

                {/* Comment Count */}
                <div className="flex items-center gap-1 text-sm">
                  <MessageCircle className="w-5 h-5" />
                  {post.commentCount || 0}
                </div>
              </div>

              {/* Read more */}
              <div className="text-center mt-4">
                <Link
                  to={`/posts/${post._id}`}
                  className="text-blue-600 font-medium text-sm hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
