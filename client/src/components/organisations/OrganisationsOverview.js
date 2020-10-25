import React, { useContext } from 'react'
import OrganisationContext from '../../context/organisations.context'

const OrganisationsOverview = () => {
    const { organisations } = useContext(OrganisationContext)
    console.log(organisations)
    return (
        <div>
            
        </div>
    )
}

export default OrganisationsOverview
