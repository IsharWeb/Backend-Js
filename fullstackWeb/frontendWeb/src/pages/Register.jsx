// src/pages/Register.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Register = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      // Check if user exists (your backend should handle this and respond accordingly)
      const res = await axios.post('/api/v1/register', data);

      if (res.status === 201) {
        alert('Registration successful!');
        // navigate to login or homepage
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        // Example: backend returns { message: "User already exists" }
        setError('email', {
          type: 'manual',
          message: error.response.data.message,
        });
      } else {
        alert('Registration failed. Try again.');
      }
    }
  };

  return (
    <div className="register-form max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <input
            {...register('name')}
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div className="mb-3">
          <input
            {...register('email')}
            type="email"
            placeholder="Email Address"
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div className="mb-3">
          <input
            {...register('password')}
            type="password"
            placeholder="Create Password"
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
