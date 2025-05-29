import React, { useState } from 'react';
import axios from 'axios';

const RegisterUser = () => {
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        bio: '',
        password: '',
    });

    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'avatar') setAvatar(files[0]);
        else if (name === 'coverImage') setCoverImage(files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        if (avatar) data.append('avatar', avatar);
        if (coverImage) data.append('coverImage', coverImage);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/v1/user/register',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('Success:', response.data);
        } catch (err) {
            console.error('Error:', err.response?.data || err.message);
        }
    };

    return (
        <>
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-white rounded-xl shadow-md max-w-xl mx-auto mt-0 space-y-4"
        >
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">Register</h2>

            <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
            <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />

            {/* Avatar Upload with label */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                </label>
                <input
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border p-2 rounded"
                    required
                />

            </div>

            {/* Cover Image Upload with label */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Image
                </label>
                <input
                    name="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <input
                name="bio"
                type="text"
                placeholder="Bio"
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />

            <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
            >
                Register
            </button>
        </form>
        </>
    );
};

export default RegisterUser;
