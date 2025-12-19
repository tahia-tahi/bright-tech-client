import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ThumbsUp } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

const PostDetails = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = await getToken({ template: "default" });
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setPost(data.post);
          setLiked(data.post.liked || false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/comments/${id}`);
        const data = await res.json();
        if (data.success) setComments(data.comments);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
    fetchComments();
  }, [id, getToken]);

  const handleLike = async () => {
    if (!isSignedIn) return alert("Login required");
    const token = await getToken({ template: "default" });
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/like/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setLiked(data.liked);
      setPost(prev => ({ ...prev, likeCount: data.likeCount }));
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const token = await getToken({ template: "default" });
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/comment/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text: newComment }),
      });
      const data = await res.json();
      if (data.success) {
        setComments([{ _id: data.commentId, text: newComment }, ...comments]);
        setPost(prev => ({ ...prev, commentCount: prev.commentCount + 1 }));
        setNewComment("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
        {/* Image */}
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full md:w-1/3 h-64 md:h-auto object-cover rounded-xl"
          />
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
            <p className="text-gray-600 mb-1">
              By <span className="font-medium">{post.author?.name}</span>
            </p>
            <p className="text-gray-500 mb-4">
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-800 leading-relaxed">{post.content}</p>
          </div>

          {/* Like button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 mt-4 rounded ${
              liked ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <ThumbsUp className="w-5 h-5" />
            {liked ? "Liked" : "Like"} · {post.likeCount || 0}
          </button>
        </div>
      </div>

      {/* Comments */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">
          Comments ({post.commentCount || 0})
        </h2>

        <form onSubmit={handleCommentSubmit} className="mb-4 flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 p-2 border rounded"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Post
          </button>
        </form>

        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c._id} className="p-3 bg-gray-50 rounded">
              <p className="text-gray-800">
                <span className="font-semibold text-gray-900">
                  {c.user?.name || c.user?.email || "Anonymous"}
                </span>
                : {c.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
