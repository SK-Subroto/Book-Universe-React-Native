// import initializeFirebase from "../Pages/Login/Login/Firebase/firebase.init";
import initializeFirebase from '../components/Login/Firebase/firebase.init';
import { useState, useEffect } from 'react';
// import {
//     getAuth, createUserWithEmailAndPassword,
//     signInWithEmailAndPassword, onAuthStateChanged,
//     signOut, updateProfile, getIdToken,
//     signInWithPopup, GoogleAuthProvider
// } from "firebase/auth";
import firebase from 'firebase';
// import axios from "axios";


// initialize firebase app
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('');

    // const auth = getAuth();
    const auth = firebase.auth();
    // const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password, name, navigate) => {
        setIsLoading(true);
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Registered with:', user.email);
                setAuthError('');
                const newUser = { email, displayName: name };
                setUser(newUser);
                // save user to the database
                saveUser(email, name, 'POST');
                // send name to firebase after creation

                // user.updateProfile(auth.currentUser, {
                //     displayName: name
                // }).then(() => {
                // }).catch((error) => {
                // });
                if (user) {
                    user.updateProfile({
                        displayName: name
                    }).then(() => {
                    }).catch((error) => {
                    });
                }
                navigate('/login');
            })
            .catch((error) => {
                setAuthError(error.message);
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }

    const loginUser = (email, password, location, navigate) => {
        setIsLoading(true);
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                const destination = location?.state?.from?.pathname || '/';
                navigate(destination);
                setAuthError('');

            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    // const signInWithGoogle = (location, history) => {
    //     setIsLoading(true);
    //     signInWithPopup(auth, googleProvider)
    //         .then((result) => {
    //             const user = result.user;
    //             // saveUser(user.email, user.displayName, 'PUT');
    //             const destination = location?.state?.from || '/';
    //             history.replace(destination);
    //             setAuthError('');
    //         }).catch((error) => {
    //             setAuthError(error.message);
    //         }).finally(() => setIsLoading(false));
    // }

    // observer user state
    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            // setIsLoading(true);
            if (user) {
                setUser(user);
                // set Admin
                // fetch(`https://sks-watch.herokuapp.com/users/${user.email}`)
                //     .then(res => res.json())
                //     .then(data => setAdmin(data.admin))
                //     .finally(() => setIsLoading(false));
                ///////    
                // user.getIdToken(user)
                //     .then(idToken => {
                //         setToken(idToken);
                //     })
            } else {
                setUser({})
                // setIsLoading(false);
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [])

    // set admin 
    useEffect(() => {
        setIsLoading(true);
        fetch(`https://sk-book-rent.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
            .finally(() => setIsLoading(false))
    }, [user.email])

    const logout = () => {
        setIsLoading(true);
        auth.signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }

    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://sk-book-rent.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    return {
        user,
        isLoading,
        authError,
        setAuthError,
        token,
        admin,
        registerUser,
        loginUser,
        // signInWithGoogle,
        logout,
    }
}

export default useFirebase;