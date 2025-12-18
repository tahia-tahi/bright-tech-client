import { useAuth } from "@clerk/clerk-react";

const DeletePostButton = ({ postId, setPosts }) => {
  const { getToken } = useAuth();

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    const token = await getToken();

    const res = await fetch(
      `http://localhost:3000/api/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (data.success) {
      setPosts(prev => prev.filter(p => p._id !== postId));
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 text-xs rounded bg-red-500 text-white"
    >
      Delete
    </button>
  );
};

export default DeletePostButton;
