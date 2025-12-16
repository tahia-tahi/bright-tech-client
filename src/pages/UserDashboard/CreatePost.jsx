import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

const CreatePost = () => {
    const { getToken } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');


    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'frontend_upload'); // Replace with your preset

        try {
            const res = await axios.post(
                'https://api.cloudinary.com/v1_1/dq14rwsmn/image/upload', // Replace with your cloud name
                formData
            );
            setImageUrl(res.data.secure_url);
        } catch (error) {
            console.error('Image upload failed:', error);
            setMessage('Image upload failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            setMessage('Title and Content are required');
            return;
        }

        setLoading(true);
        try {
            const token = await getToken({ template: "default" }); // ✅ Clerk JWT token
            console.log('Token:', token);

            const res = await axios.post(
                'http://localhost:3000/api/posts',
                { title, content, image: imageUrl },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.success) {
                setMessage('Post created successfully!');
                setTitle('');
                setContent('');
                setImageFile(null);
                setImageUrl('');
            }
        } catch (error) {
            console.error(error);
            setMessage('Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl text-primary font-bold mb-6">Create New Post</h2>

            {message && (
                <div className="mb-4 p-2 bg-blue-100 text-blue-700 rounded">{message}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium text-primary">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded text-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                        placeholder="Enter post title"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-primary">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border border-gray-300 text-gray-900 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                        rows={5}
                        placeholder="Enter post content"
                    />

                </div>

                <div>
                    <label className="block mb-1 font-medium text-primary">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            setImageFile(e.target.files[0]);
                            handleImageUpload(e.target.files[0]);
                        }}
                        className="w-full"
                    />
                </div>

                {imageUrl && (
                    <div className="mt-2">
                        <img src={imageUrl} alt="preview" className="w-32 h-32 object-cover rounded" />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || !imageUrl}
                    className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition"
                >
                    {loading ? 'Creating...' : 'Create Post'}
                </button>
            </form>

        </div>
    );
};

export default CreatePost;
