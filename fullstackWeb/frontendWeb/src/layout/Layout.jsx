// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../components/Index';

const Layout = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 container mx-auto px-4 py-6">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
