import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // yoki siz tokenni qayerda saqlasangiz

    if (!token) {
        // Agar token bo'lmasa, login sahifasiga otib yuboradi
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;