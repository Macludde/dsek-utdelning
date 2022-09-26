import { initializeApp } from 'firebase/app'
import { initializeFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 'dsek-utdelning.firebaseapp.com',
    projectId: 'dsek-utdelning',
    storageBucket: 'dsek-utdelning.appspot.com',
    messagingSenderId: '863464375149',
    appId: '1:863464375149:web:3928c9277bd56b1b741064',
    measurementId: 'G-9WQ482M4EX',
}

const app = initializeApp(firebaseConfig)

export default app

export const db = initializeFirestore(app, { ignoreUndefinedProperties: true })
