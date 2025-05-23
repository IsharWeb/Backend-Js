import React from 'react';
import { Home, About, Contact } from '../pages/Index';
import { Routes, Route } from "react-router-dom";

function routes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    )
}

export default routes