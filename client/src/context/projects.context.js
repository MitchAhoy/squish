import React, { createContext, useState, useReducer, useEffect } from 'react'
import axios from 'axios'

export const ProjectsContext = createContext()

export const ProjectsContextProvider = ({ children }) => {
    const initState = []

    const projectsReducer = (state, action) => {
        switch(action.type) {
            case 'FETCH_SUCCESS':
                return [...state, ...action.payload]
            case 'FETCH_ERROR':
                throw new Error(action.payload)
            default: 
                return state
        }
    }

    const [projects, projectsDispatch] = useReducer(projectsReducer, initState)

    useEffect(() => {
        const initFetch = async () => {
            try {
                const req = await axios.get('/api/fetch_projects')
                projectsDispatch({type: 'FETCH_SUCCESS', payload: req.data})
            } catch (err) {
                projectsDispatch({type: 'FETCH_ERROR', payload: err})
            }
        }
        initFetch()
    }, [])

    return (
        <ProjectsContext.Provider value={{projects, projectsDispatch}}>
            {children}
        </ProjectsContext.Provider>
    )
}