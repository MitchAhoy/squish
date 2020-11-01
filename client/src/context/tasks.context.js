import React, { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'

export const TasksContext = createContext()

export const TasksContextProvider = ({ children }) => {
    const initState = []

    const tasksReducer = (state, action) => {
        const updatedState = state.filter(task => task?._id !== action.payload?._id) || []
        switch(action.type) {
            case 'CREATE_SUCCESS':
                return [...state, action.payload]
            case 'CREATE_ERROR':
                console.error(action.payload)
                return [...state]
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

    const createTask = async (formData) => {
            try {
                const req = await axios.post('/api/tasks', formData)
                tasksDispatch({type: 'CREATE_SUCCESS', payload: req.data})
            } catch (err) {
                tasksDispatch({type: 'CREATE_ERROR', payload: err})
            }
    }

    const updateTask = async (id, content) => {
        try {
            const req = await axios.patch(`/api/tasks/${id}`, content)
            tasksDispatch({type: 'UPDATE_SUCCESS', payload: req.data})
        } catch (err) {
            tasksDispatch({type: 'UPDATE_ERROR', payload: err})
        }
    }

    const deleteTask = async (id) => {
        try {
            const req = await axios.delete(`/api/tasks/${id}`)
            console.log(req)
            tasksDispatch({type: 'DELETE_SUCCESS', payload: req.data})
        } catch (err) {
            tasksDispatch({type: 'DELETE_ERROR', payload: err})
        }
    }


    return (
        <TasksContext.Provider value={{tasks, updateTask, deleteTask, createTask}}>
            {children}
        </TasksContext.Provider>
    )
}