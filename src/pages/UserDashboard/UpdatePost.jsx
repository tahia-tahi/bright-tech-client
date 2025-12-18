import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "@clerk/clerk-react";

const UpdatePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch existing post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = await getToken();

        const res = await fetch(
          `http://localhost:3000/api/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (data.success) {
          setTitle(data.post.title);
          setContent(data.post.content);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, getToken]);

  // Update post
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = await getToken();

      const res = await fetch(
        `http://localhost:3000/api/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Post updated successfully");
        navigate("/user-dashboard/my-posts");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading post...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-primary">
        Update Post
      </h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          {saving ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
