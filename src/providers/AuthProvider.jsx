
import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth'

import { app } from '../firebase/firebase.config'

import useAxiosCommon from '../hooks/useAxiosCommon'
export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const axiosCommon = useAxiosCommon();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const resetPassword = email => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    //save user 
    const saveUser = async user => {
        const currentUser = {
            email: user?.email,
            role: 'user',
            status: 'Verified'
        }
        const { data } = await axiosCommon.put(`/user`, currentUser)
        return data;
    }
    // Get token from server
    const getToken = async email => {
        const { data } = await axiosCommon.post(`/jwt`,
            { email },
            { withCredentials: true }
        )
        return data
    }

    //onAuthStateChange
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                getToken(currentUser.email)
                saveUser(currentUser);
            }
            setLoading(false)
        })
        return () => {
            return unsubscribe()
        }
    }, [])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosCommon.post(`${import.meta.env.VITE_API_URL}/jwt`, userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    })
            }
            else {
                // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
                localStorage.removeItem('access-token');
                setLoading(false);
            }

        });
        return () => {
            return unsubscribe();
        }
    }, [axiosCommon])

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        resetPassword,
        logOut,
        updateUserProfile,
    }

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    // Array of children.
    children: PropTypes.object,
}

export default AuthProvider
