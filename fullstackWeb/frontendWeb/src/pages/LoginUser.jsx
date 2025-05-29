import React from "react";
const LoginUser = () => {
    return (
        <>

            <form className=" bg-white rounded-xl shadow-md max-w-xl mx-auto mt-10 space-y-4"
            >
                <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">Login</h2>
                <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
                <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
                <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded">Login</button>
            </form>
        </>
    );
};

export default LoginUser;
