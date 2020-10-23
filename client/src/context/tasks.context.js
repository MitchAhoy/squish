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
            case 'UPDATE_SUCCESS':
                const updatedState = state.filter(task => task._id !== action.payload._id)
                return [...updatedState, action.payload]
            case 'UPDATE_ERROR': 
                console.log(action.payload)
                return [...state]
            default: 
                return state
        }
    }

    const [tasks, tasksDispatch] = useReducer(tasksReducer, initState)

    useEffect(() => {
        const initFetch = async () => {
            try {
                const req = await axios.get('/api/tasks')
                tasksDispatch({type: 'FETCH_SUCCESS', payload: req.data})
            } catch (err) {
                tasksDispatch({type: 'FETCH_ERROR', payload: err})
            }
        }
        initFetch()
    }, [])

    const updateTask = async (id, content) => {
        try {
            const req = await axios.patch(`/api/tasks/${id}`, content)
            tasksDispatch({type: 'UPDATE_SUCCESS', payload: req.data})
            console.log(req)
        } catch (err) {
            tasksDispatch({type: 'UPDATE_ERROR', payload: err})
        }
    }

    return (
        <TasksContext.Provider value={{tasks, updateTask}}>
            {children}
        </TasksContext.Provider>
    )
}