import React from 'react';

const OpenData = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>🌐 OPEN DATA</h1>
            <p>Ushbu ma'lumotlar hamma uchun ochiq. Maxfiy qismga kirish uchun tizimga kiring.</p>
            <div className="auth-card" style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'left' }}>
                <h3>Bugungi ob-havo va yangiliklar:</h3>
                <ul>
                    <li>Toshkentda havo quyoshli.</li>
                    <li>Docker loyihasi muvaffaqiyatli ishga tushdi!</li>
                </ul>
            </div>
        </div>
    );
};

export default OpenData;