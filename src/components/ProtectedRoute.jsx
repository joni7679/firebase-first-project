import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children  }) {
    const user = JSON.parse(localStorage.getItem('users'))
    if (user) {
        return children 
    }
    else{
        return <Navigate to={`/`} />
    }

}

export default ProtectedRoute