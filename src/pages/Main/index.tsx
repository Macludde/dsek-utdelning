import React from 'react'
import { Box, Button } from '@mui/material'
import { useHoodies, useMyHoodies } from '../../hooks/useHoodies'
import useAuth from '../../hooks/useAuth'
import { takeHoodie } from '../../api/firebase/firestore'
import { signOut } from '../../api/firebase/auth'

const Main = () => {
    const { hoodies, loading } = useHoodies()
    const { myHoodie: myHoodies, loading: myHoodiesLoading } = useMyHoodies()
    const { uid } = useAuth()
    const hoodiesBySize: {
        [key: string]: typeof hoodies
    } = {
        S: [],
        M: [],
        L: [],
        XL: [],
        XXL: [],
    }
    hoodies.forEach((hoodie) => {
        hoodiesBySize[hoodie.size].push(hoodie)
    })

    if (loading || myHoodiesLoading) return null
    if (myHoodies) {
        return (
            <Box sx={{ textAlign: 'center', m: 4 }}>
                Du har reserverat en hoodie med storlek:
                {myHoodies.map((hoodie: any) => (
                    <Box
                        key={hoodie.id}
                        sx={{ m: 4, fontWeight: 'bold', fontSize: 64 }}
                    >
                        {hoodie.size}
                    </Box>
                ))}
            </Box>
        )
    }

    return (
        <Box
            sx={{
                my: 16,
                textAlign: 'center',
                fontSize: 20,
            }}
        >
            Reservera en hoodie efter storlek, först till kvarn!
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 16,
                    justifyContent: 'center',
                }}
            >
                {Object.keys(hoodiesBySize).map((size) => {
                    const isEmpty = hoodiesBySize[size].length === 0
                    return (
                        <Box key={size}>
                            <h2>{size}</h2>
                            <Box>Kvar: {hoodiesBySize[size].length}</Box>

                            <Button
                                sx={{ mt: 4 }}
                                variant="contained"
                                disabled={isEmpty}
                                onClick={() =>
                                    takeHoodie(uid, hoodiesBySize[size][0].id)
                                }
                            >
                                {isEmpty ? 'Slut' : 'Reservera'}
                            </Button>
                        </Box>
                    )
                })}
            </Box>
            <Button sx={{ mt: 8 }} onClick={() => signOut()}>
                Logga ut
            </Button>
        </Box>
    )
}

export default Main
