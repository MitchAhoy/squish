import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const req = await axios.get('/api/init_session')
                if (req.data) setUser(req.data.user)
            } catch (err) {
                console.log(err)
            }
        }
        fetchUser()
    }, [])



    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
}