import React, { useContext } from 'react'
import { UserContext } from '../../context/user.context'
import { Toolbar, AppBar, Typography, Button, makeStyles } from '@material-ui/core'
import { BugReport as BugReportIcon } from '@material-ui/icons'
import Login from './Login'

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        color: theme.palette.text.light
    }
}))

const Navbar = () => {

    const classes = useStyles()
    const { user } = useContext(UserContext)
    return (
         <AppBar className={classes.root}>
             <Toolbar variant='dense' className={classes.toolbar}>
                <Button className={classes.button}>
                    <BugReportIcon color='inherit' /> <Typography variant='h6' component='h1' color='inherit'>SQUISHED</Typography>
                </Button>
                <Login />
             </Toolbar>
        </AppBar>
    )
}

export default Navbar