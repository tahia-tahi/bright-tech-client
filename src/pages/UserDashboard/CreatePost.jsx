import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const CreatePost = () => {
    const { getToken } = useAuth();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tagsInput, setTagsInput] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [fileName, setFileName] = useState("No file chosen");


    // ---------------- IMAGE UPLOAD ----------------
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "frontend_upload");

        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dq14rwsmn/image/upload",
                formData
            );
            setImageUrl(res.data.secure_url);
        } catch (error) {
            console.error(error);
            setMessage("Image upload failed");
        }
    };

    // ---------------- CREATE POST ----------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            setMessage("Title and content are required");
            return;
        }

        const tags = tagsInput
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter(Boolean);

        setLoading(true);

        try {
            const token = await getToken({ template: "default" });

            const res = await axios.post(
                "http://localhost:3000/api/posts",
                {
                    title,
                    content,
                    tags,
                    image: imageUrl,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success) {
                setMessage("Post created successfully!");
                setTitle("");
                setContent("");
                setTagsInput("");
                setImageUrl("");
            }
        } catch (error) {
            console.error(error);
            setMessage("Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full mx-auto mt-10 bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold text-primary mb-6">
                Create New Post
            </h2>

            {message && (
                <div className="mb-4 p-2 rounded bg-blue-100 text-primary">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block mb-1 text-primary font-medium">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded px-4 py-2 text-primary focus:ring-2 focus:ring-primary"
                        placeholder="Enter post title"
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block mb-1 text-primary font-medium">
                        Content
                    </label>
                    <textarea
                        rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border rounded px-4 py-2 text-primary focus:ring-2 focus:ring-primary"
                        placeholder="Write your post content"
                    />
                </div>

                {/* Tags */}
                <div>
                    <label className="block mb-1 text-primary font-medium">
                        Tags
                    </label>
                    <input
                        type="text"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        className="w-full border rounded px-4 py-2 text-primary focus:ring-2 focus:ring-primary"
                        placeholder="react, mern, authentication"
                    />
                </div>

                {/* Image */}
                <div>
                    <label className="block mb-1 text-primary font-medium">
                        Image
                    </label>

                    <div className="flex items-center gap-4">
                        {/* Hidden input */}
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setFileName(file.name);
                                    handleImageUpload(file);
                                }
                            }}
                            className="hidden"
                        />

                        {/* Custom button */}
                        <label
                            htmlFor="imageUpload"
                            className="px-4 py-2 bg-primary text-white rounded cursor-pointer hover:opacity-90"
                        >
                            Choose Image
                        </label>

                        {/* File name */}
                        <span className="text-primary text-sm">
                            {fileName}
                        </span>
                    </div>
                </div>


                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-2 rounded hover:opacity-90 transition"
                >
                    {loading ? "Creating..." : "Create Post"}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
