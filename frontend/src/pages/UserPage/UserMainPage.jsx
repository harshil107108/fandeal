import React from 'react'
import UserHeader from './UserHeader'
import { Outlet } from 'react-router-dom'

const UserMainPage = () => {
    return (
        <>
            <UserHeader />

            <main>
                <Outlet />
            </main>
        </>
    )
}

export default UserMainPage