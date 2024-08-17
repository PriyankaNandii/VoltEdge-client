


import useAuth from "../hook/useAuth";
import { Navigate, useLocation } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();  

if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>
}

return user ? (
    <div>{children}</div>
) : (
    <Navigate to={'/login'} state={{ from: location }} replace />
) 

   
};

PrivateRoute.PropTypes = {
    children: PropTypes.element,
}

export default PrivateRoute;



// import { Navigate, useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react'; // Import useState and useEffect
// import jwt_decode from "jwt-decode"; // Import jwt_decode library


// const PrivateRoute = ({ children }) => {
//     const [loading, setLoading] = useState(true); // State to track loading status
//     const location = useLocation();
    
//     useEffect(() => {
//         // Check for JWT token in local storage
//         const token = localStorage.getItem('token');
//         if (token) {
//             // Decode the token to extract user data
//             const decodedToken = jwt_decode(token);
//             if (decodedToken.exp * 1000 > Date.now()) {
//                 // Token is valid
//                 setLoading(false);
//             } else {
//                 // Token expired
//                 setLoading(false);
//             }
//         } else {
//             // No token found
//             setLoading(false);
//         }
//     }, []);

//     if (loading) {
//         return <span className="loading loading-spinner loading-lg"></span>;
//     }

//     // Render children if user is authenticated, otherwise redirect to login page
//     return localStorage.getItem('token') ? (
//         <div>{children}</div>
//     ) : (
//         <Navigate to={'/login'} state={{ from: location }} replace />
//     );
// };

// export default PrivateRoute;
