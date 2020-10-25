import React, { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'

export const OrganisationsContext = createContext()

export const OrganisationsContextProvider = ({ children }) => {
    const initState = []

    const organisationsReducer = (state, action) => {
        switch(action.type) {
            case 'FETCH_SUCCESS':
                return [...state, ...action.payload]
            case 'FETCH_ERROR':
                return [...state]
            default:
                return state
        }   
    }

    useEffect(() => {
        const initFetch = async () => {
            try {
                const req = await axios.get('/api/fetch_organisations')
                organisationsDispatch({type: 'FETCH_SUCCESS', payload: req.data})
            } catch (err) {
                organisationsDispatch({type: 'FETCH_ERROR', payload: err})
            }
        }
        initFetch()
    }, [])

    const [organisations, organisationsDispatch] = useReducer(organisationsReducer, initState)

    return (
        <OrganisationsContext.Provider value={{organisations, organisationsDispatch}}>
            {children}
        </OrganisationsContext.Provider>
    )
}