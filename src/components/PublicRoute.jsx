import React from 'react'
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
    const user = JSON.parse(localStorage.getItem('users'));
    if (user) {
        return <Navigate to={`/`} />

    }
    else {
        return children
    }

}

export default PublicRoute