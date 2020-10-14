import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {

    // Giving each group of data their own state so individual components don't need to pull in context for information they don't need
    const [user, setUser] = useState({})
    const [projects, setProjects] = useState({})


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const req = await axios.get('/api/init_session')
                if (req.data) {
                    setUser(req.data.user)
                    setProjects(req.data.projects)
                }

            } catch (err) {
                console.log(err)
            }

        }
        fetchUser()
    }, [])



    return (
        <UserContext.Provider value={{user, projects}}>
            {children}
        </UserContext.Provider>
    )
}