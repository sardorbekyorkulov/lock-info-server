import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import VerySecret from './components/VerySecret';
import OpenData from './components/OpenData';

function App() {
    return (
        <div className="container">
            <nav className="navbar">
                <Link to="/" className="logo">LockInfo</Link>
                <div className="nav-links">
                    <Link to="/">Open Data</Link>
                    <Link to="/login">Kirish</Link>
                    <Link to="/register" className="btn-primary">Ro'yxatdan o'tish</Link>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<OpenData />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/very-secret" element={<VerySecret />} />
            </Routes>
        </div>
    );
}

export default App;