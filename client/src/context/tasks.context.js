import React, { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'

export const TasksContext = createContext()

export const TasksContextProvider = ({ children }) => {
    const initState = []

    const tasksReducer = (state, action) => {
        switch(action.type) {
            case 'FETCH_SUCCESS':
                return [...state, ...action.payload]
            case 'FETCH_ERROR':
                throw new Error(action.payload)
            default: 
                return state
        }
    }

    const [tasks, tasksDispatch] = useReducer(tasksReducer, initState)

    useEffect(() => {
        const initFetch = async () => {
            try {
                const req = await axios.get('/api/fetch_tasks')
                tasksDispatch({type: 'FETCH_SUCCESS', payload: req.data})
            } catch (err) {
                tasksDispatch({type: 'FETCH_ERROR', payload: err})
            }
        }
        initFetch()
    }, [])

    return (
        <TasksContext.Provider value={{tasks, tasksDispatch}}>
            {children}
        </TasksContext.Provider>
    )
}