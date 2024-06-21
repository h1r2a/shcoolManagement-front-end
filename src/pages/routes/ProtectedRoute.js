// ProtectedRoute.js

import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';

const ProtectedRoute = ({ path, element }) => {
    const { user } = useContext(authContext); // Obtenez l'état d'authentification à partir du contexte

    return (
        user ? (
            <Route path={path} element={element} />
        ) : (
            <Navigate to="/login" replace />
        )
    );
};

export default ProtectedRoute;
