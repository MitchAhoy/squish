import React from 'react'
import { Add as AddIcon } from '@material-ui/icons'
import { Fab, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        right: theme.spacing(2),
        bottom: theme.spacing(2),
    }
}))

const CreateButton = () => {
    const classes = useStyles()
    return (
        <Fab
            className={classes.fab}
            aria-label='create-button'
            color='primary'
        >
            <AddIcon />
        </Fab>
    )
}

export default CreateButton
