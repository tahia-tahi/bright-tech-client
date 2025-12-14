import React, { useState } from 'react';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';

const dummyPosts = [
  {
    id: 1,
    title: 'How React Changed Frontend Development',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    likes: 12,
    comments: 4,
    liked: false,
  },
  {
    id: 2,
    title: 'Understanding MongoDB for Beginners',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
    likes: 25,
    comments: 10,
    liked: false,
  },
  {
    id: 3,
    title: 'Why Full-Stack Developers Are in Demand',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
    likes: 7,
    comments: 2,
    liked: false,
  },
];

const AllPosts = () => {
  const [posts, setPosts] = useState(dummyPosts);

  const handleLikeToggle = (id) => {
    setPosts(posts.map(post =>
      post.id === id
        ? {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          }
        : post
    ));
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      <h1 className="text-2xl font-bold mb-8">All Posts</h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* Image */}
            <img
              src={post.image}
              alt={post.title}
              className="h-48 w-full object-cover"
            />

            {/* Content */}
            <div className="p-5">
              <h2 className="text-lg font-semibold">{post.title}</h2>

              {/* Actions */}
              <div className="flex items-center gap-6 mt-4 text-gray-600">
                
                {/* Like Button */}
                <button
                  onClick={() => handleLikeToggle(post.id)}
                  className={`flex items-center gap-1 text-sm font-medium transition
                    ${post.liked ? 'text-blue-600' : 'hover:text-blue-600'}
                  `}
                >
                  <ThumbsUp
                    className="w-5 h-5"
                    fill={post.liked ? '#2563eb' : 'none'}
                  />
                  {post.liked ? 'Liked' : 'Like'} · {post.likes}
                </button>

                {/* Comment Count */}
                <div className="flex items-center gap-1 text-sm">
                  <MessageCircle className="w-5 h-5" />
                  {post.comments}
                </div>
              </div>

              {/* Read more */}
              <Link
                to={`/posts/${post.id}`}
                className="inline-block mt-4 text-primary font-medium text-sm"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
