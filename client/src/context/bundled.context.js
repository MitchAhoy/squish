import React from 'react'
import { UserContextProvider } from './user.context'
import { ProjectsContextProvider } from './projects.context'
// import { LoadingContextProvider } from './loading.context'

const BundledContext = ({ children }) => {

    return (
        // <LoadingContextProvider>
            <UserContextProvider>
                <ProjectsContextProvider>
                    {children}
                </ProjectsContextProvider>
            </UserContextProvider>
        // </LoadingContextProvider>
    )
}

export default BundledContext
