import initializeAuthentication from '../firebase/firebase.initialize'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from 'react';

initializeAuthentication()

const useFirebase = () => {

    const [user, setUser] = useState({});

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoogle = () => {
       return signInWithPopup(auth, googleProvider)
           
    }

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser({})
            })
    }

    useEffect(() => {
      const unsubscribe =  onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            }
        })

        return unsubscribe;
    }, []);

    return {
        user,
        signInUsingGoogle,
        logOut
    }

}

export default useFirebase;