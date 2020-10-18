import React from 'react'
import { UserContextProvider } from './user.context'
import { ProjectsContextProvider } from './projects.context'
import { OrganisationsContextProvider } from './organisations.context'
import { TasksContextProvider } from './tasks.context'

const BundledContext = ({ children }) => {

    return (
        <OrganisationsContextProvider>
            <UserContextProvider>
                <ProjectsContextProvider>
                    <TasksContextProvider>
                        {children}
                    </TasksContextProvider>
                </ProjectsContextProvider>
            </UserContextProvider>
        </OrganisationsContextProvider>
    )
}

export default BundledContext
