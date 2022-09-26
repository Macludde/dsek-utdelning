import React, { JSXElementConstructor, ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'

export type Route = {
    label: string
    path: string
    component: ReactElement<any, string | JSXElementConstructor<any>>
    inSidebar?: boolean
}

const routes: Route[] = [
    {
        label: 'Home',
        path: '/',
        component: <Main />,
        inSidebar: true,
        // icon: HomeIcon,
    },
]

const Router = () => {
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
