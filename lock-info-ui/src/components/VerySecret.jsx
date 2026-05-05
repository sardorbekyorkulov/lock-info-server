import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerySecret = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            // Token yo'qmi? Darrov Open Data sahifasiga!
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '80px', padding: '40px', background: '#1e1e2d', color: '#ffd700', borderRadius: '12px' }}>
            <h1>🔒 VERY SECRET</h1>
            <p>Bu yerdagi ma'lumotlar faqat backend muhandislari uchun.</p>
            <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }} className="btn-primary" style={{ background: '#e11d48' }}>Chiqish</button>
        </div>
    );
};

export default VerySecret;