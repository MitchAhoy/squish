import React from 'react'
import { IconButton, Avatar } from '@material-ui/core'

const NavProfile = ({ img, name }) => {
    return (
        <IconButton>
            <Avatar alt={name} src={img}/>
        </IconButton>
    )
}

export default NavProfile
