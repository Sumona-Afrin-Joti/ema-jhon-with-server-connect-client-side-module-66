import initializeAuthentication from '../firebase/firebase.initialize'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut,getIdToken } from "firebase/auth";
import { useState, useEffect } from 'react';

initializeAuthentication()

const useFirebase = () => {

    const [user, setUser] = useState({});
    const [isLoading,setIsLoading] = useState(true);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoogle = () => {
        setIsLoading(true)
       return signInWithPopup(auth, googleProvider)
           
    }

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser({})
            })
    }

    useEffect(() => {
        setIsLoading(true)
      const unsubscribe =  onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user)
                .then(idToken=>localStorage.setItem('idToken', idToken))
                setUser(user)
            }
            setIsLoading(false);
        })

        return unsubscribe;
    }, []);

    return {
        user,
        signInUsingGoogle,
        logOut, 
        isLoading,
        setIsLoading
    }

}

export default useFirebase;