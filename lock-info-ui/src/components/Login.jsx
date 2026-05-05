import React, { useState, useEffect } from 'react';
import { loginUser } from '../api/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [creds, setCreds] = useState({ login: '', password: '' });
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState(''); // Muvaffaqiyat xabari uchun
    const navigate = useNavigate();

    // Xabarlarni avtomatik o'chirish
    useEffect(() => {
        if (error || successMsg) {
            const timer = setTimeout(() => {
                setError('');
                setSuccessMsg('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, successMsg]);

    // Frontend Validatsiya funksiyasi
    const validate = () => {
        if (creds.login.length < 4) {
            setError("Login kamida 4 ta belgi bo'lishi kerak!");
            return false;
        }
        if (creds.password.length < 6) {
            setError("Parol kamida 6 ta belgi bo'lishi kerak!");
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // 1. So'rovdan oldin frontend validatsiya
        if (!validate()) return;

        try {
            const res = await loginUser(creds);

            // 2. Muvaffaqiyatli holat
            localStorage.setItem('token', res.data.accessToken);
            setSuccessMsg("Tizimga kirildi! 3 soniyadan keyin yo'naltirilasiz...");

            setTimeout(() => {
                navigate('/very-secret');
            }, 3000);

        } catch (err) {
            // 3. Xatolik holati (Backend'dan kelgan obyektni emas, faqat message stringini olamiz)
            const errorMsg = err.response?.data?.message || "Login yoki parol xato!";
            setError(errorMsg);

            // Xatolikdan keyin 3 soniya o'tib open-page'ga (yoki boshiga) redirect
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    };

    return (
        <div className="auth-card" style={{ position: 'relative' }}>
            {/* Xatolik Alerti */}
            {error && (
                <p className="alert" style={{
                    background: '#fee2e2',
                    color: '#991b1b',
                    position: 'absolute',
                    top: '-70px', left: 0, right: 0,
                    border: '1px solid #fecaca', padding: '10px', borderRadius: '5px'
                }}>
                    ⚠️ {error}
                </p>
            )}

            {/* Muvaffaqiyat Alerti */}
            {successMsg && (
                <p className="alert" style={{
                    background: '#dcfce7',
                    color: '#166534',
                    position: 'absolute',
                    top: '-70px', left: 0, right: 0,
                    border: '1px solid #bbf7d0', padding: '10px', borderRadius: '5px'
                }}>
                    ✅ {successMsg}
                </p>
            )}

            <h2>Tizimga kirish</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Login"
                    value={creds.login}
                    onChange={e => setCreds({...creds, login: e.target.value})}
                    required
                />
                <input
                    type="password"
                    placeholder="Parol"
                    value={creds.password}
                    onChange={e => setCreds({...creds, password: e.target.value})}
                    required
                />
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                    Kirish
                </button>
            </form>
        </div>
    );
};

export default Login;