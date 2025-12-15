import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ThumbsUp, MessageCircle } from "lucide-react";

const PostDetails = () => {
  const { id } = useParams(); // post id from route
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/posts/${id}`);
        const data = await res.json();
        if (data.success) {
          setPost(data.post);
          setLiked(data.post.liked || false); // optional liked info
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/posts/comments/${id}`);
        const data = await res.json();
        if (data.success) setComments(data.comments);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  // Handle like/unlike
  const handleLike = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/posts/like/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // token from login
        },
      });
      const data = await res.json();
      if (data.success) setLiked(data.liked);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle comment submit
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`http://localhost:3000/api/posts/comment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ text: newComment }),
      });
      const data = await res.json();
      if (data.success) {
        setComments([{ _id: data.commentId, text: newComment }, ...comments]);
        setNewComment("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">By {post.author?.email}</p>
      <p className="text-gray-500 mb-6">{new Date(post.createdAt).toLocaleString()}</p>
      <p className="mb-6">{post.content}</p>

      {/* Like button */}
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-4 py-2 rounded ${
          liked ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        <ThumbsUp className="w-5 h-5" />
        {liked ? "Liked" : "Like"} · {post.likeCount || 0}
      </button>

      {/* Comments section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Comments ({post.commentCount || 0})</h2>
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 border rounded mb-2"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Post Comment
          </button>
        </form>

        {/* List of comments */}
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c._id} className="p-3 bg-gray-100 rounded">
              <p>{c.user?.email || "Anonymous"}: {c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
