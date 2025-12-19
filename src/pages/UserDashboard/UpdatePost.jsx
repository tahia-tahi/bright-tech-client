import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "@clerk/clerk-react";

const UpdatePost = () => {
  const { id: postId } = useParams(); // match route param
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = await getToken();
        const res = await fetch(``${import.meta.env.VITE_API_URL}/api/posts`/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setTitle(data.post.title);
          setContent(data.post.content);
          setTags(data.post.tags || []);
          setExistingImage(data.post.image || "");
        } else {
          setError(data.message || "Failed to load post");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId, getToken]);

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => setTags(tags.filter((t) => t !== tag));

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tags", tags.join(","));
      if (image) formData.append("image", image);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setSuccess("Post updated successfully!");
        setTimeout(() => navigate("/user-dashboard/my-posts"), 1000);
      } else {
        setError(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <p className="text-center text-gray-400 mt-20">Loading post...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-16 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-primary">Update Post</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form onSubmit={handleUpdate} className="space-y-5 text-primary">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="7"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-primary resize-none"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
              >
                {tag}{" "}
                <button type="button" onClick={() => handleRemoveTag(tag)}>
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Add new tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-2 bg-primary text-white rounded"
            >
              Add
            </button>
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Post Image</label>
          {existingImage && (
            <img
              src={existingImage}
              alt="Existing"
              className="w-48 h-32 object-cover rounded mb-2"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-primary text-white rounded-lg"
          >
            {saving ? "Updating..." : "Update Post"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 border rounded-lg text-primary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
