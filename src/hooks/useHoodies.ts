import { collection } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../api/firebase/config'
import { Hoodie } from '../api/firebase/schemes'
import useAuth from './useAuth'

export const useHoodies = () => {
    const [value, loading, error] = useCollection(collection(db, 'hoodies'))
    const availableHoodies =
        value?.docs
            .map((doc) => {
                const hoodie = doc.data() as Hoodie
                return {
                    ...hoodie,
                    id: doc.id,
                }
            })
            .filter((hoodie) => hoodie.takenBy === null) ?? []

    return {
        hoodies: availableHoodies,
        loading,
        error,
    }
}

export const useMyHoodies = () => {
    const [value, loading, error] = useCollection(collection(db, 'hoodies'))
    const auth = useAuth()
    const myHoodies =
        value?.docs
            .map((doc) => {
                const hoodie = doc.data() as Hoodie
                return {
                    ...hoodie,
                    id: doc.id,
                }
            })
            .filter((hoodie) => hoodie.takenBy === auth.uid) ?? []

    return {
        myHoodie: myHoodies?.length > 0 ? myHoodies : undefined,
        loading,
        error,
    }
}
