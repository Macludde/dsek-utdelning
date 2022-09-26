import { User } from 'firebase/auth'

export interface Hoodie {
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL'
    takenBy: User['uid']
}
