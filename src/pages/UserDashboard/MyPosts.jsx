import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router";
import DeletePostButton from "./DeletePostButton";

const MyPosts = () => {
  const { getToken } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      const token = await getToken();
      const res = await fetch("http://localhost:3000/api/posts/my-posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) setPosts(data.posts);
      setLoading(false);
    };

    fetchMyPosts();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (posts.length === 0)
    return <p className="text-gray-500">You haven’t created any posts yet.</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-xl font-semibold mb-4 text-primary">My Posts</h2>

      <ul className="space-y-4">
        {posts.map(post => (
          <li
            key={post._id}
            className="flex items-center justify-between border border-primary p-4 rounded-lg"
          >
            <div>
              <p className="font-medium text-primary">{post.title}</p>
              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-2">
              <Link
                to={`/user-dashboard/update-post/${post._id}`}
                className="px-3 py-1 text-xs rounded bg-blue-500 text-white"
              >
                Edit
              </Link>

              <DeletePostButton postId={post._id} setPosts={setPosts} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPosts;
