import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const req = await axios.get('/api/current_user')
                if (req.data) setUser(req.data)
            } catch (err) {
                console.error(err)
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