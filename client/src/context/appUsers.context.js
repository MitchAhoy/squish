// import React, { createContext, useReducer, useEffect } from 'react'
// import axios from 'axios'

// export const AppUsersContext = createContext()

// export const AppUsersContextProvider = ({ children }) => {
//     const initState = []

//     const appUsersReducer = (state, action) => {
//         switch(action.type) {
//             case 'FETCH_SUCCESS':
//                 return [...state, ...action.payload]
//             case 'FETCH_ERROR':
//                 throw new Error(action.payload)
//             default:
//                 return state
//         }   
//     }

//     useEffect(() => {
//         const initFetch = async () => {
//             try {
//                 const req = await axios.get('/api/fetch_app_users')
//                 appUsersDispatch({type: 'FETCH_SUCCESS', payload: req.data})
//             } catch (err) {
//                 appUsersDispatch({type: 'FETCH_ERROR', payload: err})
//             }
//         }
//         initFetch()
//     }, [])

//     const [appUsers, appUsersDispatch] = useReducer(appUsersReducer, initState)

//     return (
//         <AppUsersContext.Provider value={{appUsers, appUsersDispatch}}>
//             {children}
//         </AppUsersContext.Provider>
//     )
// }