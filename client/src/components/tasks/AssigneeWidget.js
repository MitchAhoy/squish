import React from 'react'
import { FormControl, Select, MenuItem, InputLabel, makeStyles, Avatar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	formInput: {
		width: '10rem'
	}
}))

const AssigneeWidget = ({ currentUser, organisationalUsers }) => {
    const classes = useStyles()

    
    return (
        <FormControl
        variant='outlined'
        className={classes.formInput}
    >
        <InputLabel id='assignee'>Assignee</InputLabel>
        <Select
            labelId='assignee-label'
            id='assignee-id'
            label='assignee-select-label'
        >
            
        <MenuItem><Avatar>N</Avatar>nghfh@gmail.com</MenuItem>
        <MenuItem><Avatar>M</Avatar>mifdfhjs@gmail.com</MenuItem>
        <MenuItem><Avatar>M</Avatar>msjufsidf@gmail.com</MenuItem>
        <MenuItem><Avatar>T</Avatar>tjikonf@gmail.com</MenuItem>
        </Select>
    </FormControl>
    )
}

export default AssigneeWidget
