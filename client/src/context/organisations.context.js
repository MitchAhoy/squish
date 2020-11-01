import React, { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'

export const OrganisationsContext = createContext()

export const OrganisationsContextProvider = ({ children }) => {
    const initState = []

    const organisationsReducer = (state, action) => {
        const updatedState = state.filter(org => org?._id !== action.payload?._id)
        switch (action.type) {
            case 'CREATE_SUCCESS':
                return [...state, action.payload]
            case 'CREATE_ERROR':
                console.error(action.payload)
            case 'FETCH_SUCCESS':
                return [...state, ...action.payload]
            case 'FETCH_ERROR':
                return [...state]
            case 'UPDATE_SUCCESS':
                return [...updatedState, action.payload]
            case 'UPDATE_ERROR':
                console.error(action.payload)
                return [...state]
            case 'DELETE_SUCCESS':
                return [...updatedState]
            case 'DELETE_ERROR':
                console.error(action.payload)
                return [...state]
            default:
                return state
        }
    }

    useEffect(() => {
        const initFetch = async () => {
            try {
                const req = await axios.get('/api/organisations')
                organisationsDispatch({ type: 'FETCH_SUCCESS', payload: req.data })
            } catch (err) {
                organisationsDispatch({ type: 'FETCH_ERROR', payload: err })
            }
        }
        initFetch()
    }, [])

    const createOrganisation = async (formData) => {
            try {
                const req = await axios.post('/api/organisations', formData)
                organisationsDispatch({type: 'CREATE_SUCCESS', payload: req.data})
            } catch (err) {
                organisationsDispatch({type: 'CREATE_ERROR', payload: err})
            }
    }

    const updateOrganisation = async (id, content) => {
        try {
            const req = await axios.patch(`/api/organisations/${id}`, content)
            organisationsDispatch({type: 'UPDATE_SUCCESS', payload: req.data})
        } catch (err) {
            organisationsDispatch({type: 'UPDATE_ERROR', payload: err})
        }
    }

    const editOrganisationUser = async (id, user, action) => {
        try {
            const req = await axios.patch(`/api/organisation/${id}/user/${user}`, {action})
            organisationsDispatch({type: 'UPDATE_SUCCESS', payload: req.data})
        } catch (err) {
            organisationsDispatch({type: 'UPDATE_ERROR', payload: err})
        }
    }

    const deleteOrganisation = async (id) => {
        try {
            const req = await axios.delete(`/api/organisation/${id}`)
            organisationsDispatch({type: 'DELETE_SUCCESS', payload: req.data})
        } catch (err) {
            organisationsDispatch({type: 'DELETE_ERROR', payload: err})
        }
    }

    const [organisations, organisationsDispatch] = useReducer(organisationsReducer, initState)

    return (
        <OrganisationsContext.Provider value={{ organisations, updateOrganisation, editOrganisationUser, createOrganisation, deleteOrganisation }}>
            {children}
        </OrganisationsContext.Provider>
    )
}