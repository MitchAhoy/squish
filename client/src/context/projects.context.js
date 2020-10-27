import React, { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'

export const ProjectsContext = createContext()

export const ProjectsContextProvider = ({ children }) => {
    const initState = []

    const projectsReducer = (state, action) => {
        switch(action.type) {
            case 'FETCH_SUCCESS':
                return [...state, ...action.payload]
            case 'FETCH_ERROR':
                return [...state]
            case 'CREATE_SUCCESS':
                return [...state, action.payload]
            case 'CREATE_ERROR':
                console.error(action.payload)
                return [...state]
            default: 
                return state
        }
    }

    const [projects, projectsDispatch] = useReducer(projectsReducer, initState)

    useEffect(() => {
        const initFetch = async () => {
            try {
                const req = await axios.get('/api/projects')
                projectsDispatch({type: 'FETCH_SUCCESS', payload: req.data})
            } catch (err) {
                projectsDispatch({type: 'FETCH_ERROR', payload: err})
            }
        }
        initFetch()
    }, [])

    const createProject = async (content) => {
        try {
            const req = await axios.post('/api/projects', content)
            projectsDispatch({type: 'CREATE_SUCCESS', payload: req.data})
        } catch (err) {
            projectsDispatch({type: 'CREATE_ERROR', payload: err})
        }
    }

    return (
        <ProjectsContext.Provider value={{projects, createProject}}>
            {children}
        </ProjectsContext.Provider>
    )
}