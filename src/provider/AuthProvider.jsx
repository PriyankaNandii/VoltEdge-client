// import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// import { createContext, useEffect, useState } from "react";
// import auth from '../firebase/firebaseConfig';
// import axios from 'axios';

// export const AuthContext = createContext()

// const googleProvider = new GoogleAuthProvider();
// const githubProvider = new GithubAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); 

//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   }

//   const updateUserProfile = (name, image) => {
//     return updateProfile(auth.currentUser, {
//       displayName: name, 
//       photoURL: image
//     });
//   }

//   const signInUser = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   }
  
//   const googleLogin = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   }

//   const githubLogin = () => {
//     setLoading(true);
//     return signInWithPopup(auth, githubProvider);
//   }

//   const logOut = () => {
//     setLoading(true);
//     signOut(auth).finally(() => setLoading(false));
//   }

  

//   const saveUser = async (user) => {
//     const currentUser = {
//       name: user?.displayName,
//       image: user?.photoURL,
//       email: user?.email,
//       role: "guest",
//       status: "Verified",
//     };
//     const { data } = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/user`, currentUser);
//     return data;
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUser(user);
//         await saveUser(user);
//         const loggedUser = { email: user.email };
//         axios.post(`${import.meta.env.VITE_API_URL}/jwt`, loggedUser, {
//           withCredentials: true
//         }).then(response => {
//           console.log("JWT token:", response.data); 
//         }).catch(error => {
//           console.error("Error:", error); 
//         });
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const allValues = {
//     createUser,
//     signInUser,
//     googleLogin,
//     githubLogin,
//     logOut,
//     user,
//     updateUserProfile,
//     loading
//   }

//   return (
//     <AuthContext.Provider value={allValues}>
//       {children} 
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;


import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from '../firebase/firebaseConfig';
import axios from 'axios';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const updateUserProfile = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image
    });
  }

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  }

  const logOut = async () => {
    setLoading(true);
    try {
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
        withCredentials: true,
      });
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const getToken = async email => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/jwt`,
      { email },
      { withCredentials: true }
    );
    return data;
  }

  const saveUser = async user => {
    const currentUser = {
      email: user?.email,
      role: 'guest',
      status: 'Verified',
    };
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/user`,
      currentUser
    );
    return data;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          await getToken(user.email);
          await saveUser(user);
          const loggedUser = { email: user.email };
          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/jwt`, loggedUser, {
            withCredentials: true
          });
          // console.log("JWT token:", response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const allValues = {
    createUser,
    signInUser,
    googleLogin,
    githubLogin,
    logOut,
    user,
    updateUserProfile,
    loading
  }

  return (
    <AuthContext.Provider value={allValues}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
