import React, { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'

export const OrganisationsContext = createContext()

export const OrganisationsContextProvider = ( { children }) => {
    const initState = []

    const organisationsReducer = (state, action) => {
        switch(action.type) {
            case 'FETCH_SUCCESS':
                return [...state, ...action.payload]
            case 'FETCH_ERROR':
                throw new Error(action.payload)
            default:
                return state
        }   
    }

    useEffect(() => {
        const initFetch = async () => {
            try {
                const req = await axios.get('api/fetch_organisations')
                organisationsDispatch({action: 'FETCH_SUCCESS', payload: req.data})
                console.log(req)
            } catch (err) {
                organisationsDispatch({action: 'FETCH_ERROR', payload: err})
            }
        }
        initFetch()
    })

    const [organisations, organisationsDispatch] = useReducer(organisationsReducer, initState)
    

    return (
        <OrganisationsContext.Provider value={{organisations, organisationsDispatch}}>
            {children}
        </OrganisationsContext.Provider>
    )
}