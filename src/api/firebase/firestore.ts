import {
    doc,
    getFirestore,
    runTransaction,
    Transaction,
} from 'firebase/firestore'
import { db } from './config'
import { Hoodie } from './schemes'

export const takeHoodie = async (userId: string, hoodieId: string) => {
    runTransaction(getFirestore(), async (transaction: Transaction) => {
        const hoodieRef = doc(db, 'hoodies', hoodieId)
        const hoodieDoc = await transaction.get(hoodieRef)
        const hoodie = hoodieDoc.data() as Hoodie
        if (hoodie.takenBy) {
            throw new Error('Hoodie is already taken')
        }
        hoodie.takenBy = userId
        transaction.update(hoodieRef, hoodie as any)
    })
}
