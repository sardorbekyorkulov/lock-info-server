import React, { useState, useEffect } from 'react';
import { registerUser } from '../api/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ login: '', email: '', password: '' });
    const [msg, setMsg] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    // Xabarlarni avtomatik o'chirish
    useEffect(() => {
        if (msg) {
            const timer = setTimeout(() => setMsg(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [msg]);

    // Frontend Validatsiya
    const validate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (formData.login.length < 4) {
            setMsg("Login kamida 4 ta belgi bo'lishi shart!");
            setIsError(true);
            return false;
        }
        if (!emailRegex.test(formData.email)) {
            setMsg("Email formati noto'g'ri!");
            setIsError(true);
            return false;
        }
        if (formData.password.length < 6) {
            setMsg("Parol kamida 6 ta belgi bo'lishi shart!");
            setIsError(true);
            return false;
        }
        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            await registerUser(formData);
            setMsg("Muvaffaqiyatli! Pochtadagi link orqali profilni faollashtiring.");
            setIsError(false);

            // Muvaffaqiyatli ro'yxatdan o'tgach 3 soniyadan keyin login sahifasiga
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err) {
            const errorText = err.response?.data?.message || "Server bilan aloqa yo'q";
            setMsg("Xatolik: " + errorText);
            setIsError(true);

            // Xatolik bo'lsa 3 soniyadan keyin sahifani yangilash yoki boshqa joyga yo'naltirish
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    };

    return (
        <div className="auth-card" style={{ position: 'relative' }}>
            <h2>Ro'yxatdan o'tish</h2>

            {msg && (
                <p className="alert" style={{
                    background: isError ? '#fee2e2' : '#dcfce7',
                    color: isError ? '#991b1b' : '#166534',
                    border: `1px solid ${isError ? '#fecaca' : '#bbf7d0'}`,
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '15px'
                }}>
                    {isError ? '⚠️' : '✅'} {msg}
                </p>
            )}

            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Login"
                    value={formData.login}
                    onChange={e => setFormData({...formData, login: e.target.value})}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    required
                />
                <input
                    type="password"
                    placeholder="Parol"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    required
                />
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                    Yuborish
                </button>
            </form>
        </div>
    );
};

export default Register;