import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const ProjectsContext = createContext()

export const ProjectsContextProvider = ({ children }) => {

    return (
        <ProjectsContext.Provider>
            {children}
        </ProjectsContext.Provider>
    )
}