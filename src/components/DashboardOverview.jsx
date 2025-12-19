import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const DashboardOverview = () => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0,
    postsPerTag: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = await getToken();
        const res = await fetch("http://localhost:3000/api/posts/dashboard/overview", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [getToken]);

  if (loading) return <p className="text-center mt-20">Loading dashboard...</p>;

  const chartData = stats.postsPerTag.map(tag => ({
    tag: tag._id,
    count: tag.count
  }));

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h3 className="text-lg font-medium text-gray-600">Total Posts</h3>
          <p className="text-3xl font-bold text-primary mt-2">{stats.totalPosts}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h3 className="text-lg font-medium text-gray-600">Total Likes</h3>
          <p className="text-3xl font-bold text-primary mt-2">{stats.totalLikes}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h3 className="text-lg font-medium text-gray-600">Total Comments</h3>
          <p className="text-3xl font-bold text-primary mt-2">{stats.totalComments}</p>
        </div>
      </div>

      {/* Posts per Tag Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-medium text-gray-600 mb-4">Posts per Tag</h3>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tag" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#6366F1" name="Posts" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center">No tag data available.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
