import React, { JSXElementConstructor, ReactElement } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Account from './pages/Account'
import Comments from './pages/Comments'
import Feed from './pages/Feed'
import CreatePost from './pages/Feed/CreatePost'
import Games, { GameRoutes } from './pages/Games'
import Gyckel from './pages/Gyckel'

export type Route = {
    label: string
    path: string
    component: ReactElement<any, string | JSXElementConstructor<any>>
    inSidebar?: boolean
}

const baseRoutes: Route[] = [
    {
        label: 'Home',
        path: '/',
        component: <Main />,
        inSidebar: true,
        // icon: HomeIcon,
    },
]

export const routes: Route[] = baseRoutes.concat(GameRoutes)

const Router = () =>
{
    document.title = 'D-sek Hoodieutdelning'
    return (
        <Routes>
            {routes.map((route) => (
                <Route
                    path={route.path}
                    element={route.component}
                    key={route.path}
                />
            ))}
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    )
}

export default Router
