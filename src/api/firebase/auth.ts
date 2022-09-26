import {
    getAuth,
    GoogleAuthProvider,
    signInAnonymously as firebaseSignInAnonymously,
    signInWithPopup,
    signOut as fbSignOut,
} from 'firebase/auth'
import './config'

const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
const auth = getAuth()

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider)

        const credential = GoogleAuthProvider.credentialFromResult(result)
        if (credential === null) {
            throw new Error('Error with Google Sign in')
        }
    } catch (error: any) {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorCode, errorMessage)
    }
}

export const signInAnonymously = async () => {
    try {
        await firebaseSignInAnonymously(auth)
    } catch (error: any) {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorCode, errorMessage)
    }
}

export const signOut = async () => {
    try {
        await fbSignOut(auth)
    } catch (error: any) {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorCode, errorMessage)
    }
}
