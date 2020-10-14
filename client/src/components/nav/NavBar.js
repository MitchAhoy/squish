import React from 'react'
import { Toolbar, AppBar, Typography, Button, makeStyles } from '@material-ui/core'
import { BugReport as BugReportIcon } from '@material-ui/icons'
import Login from './Login'
import NavProfile from './NavProfile'

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

const Navbar = ({ user }) => {

    const classes = useStyles()

    return (
         <AppBar className={classes.root}>
             <Toolbar variant='dense' className={classes.toolbar}>
                <Button className={classes.button}>
                    <BugReportIcon color='inherit' /> <Typography variant='h6' component='h1' color='inherit'>SQUISH</Typography>
                </Button>
                {user ? <NavProfile img={user.profileImage} name={`${user.firstName} ${user.lastName}`} /> : <Login />}
             </Toolbar>
        </AppBar>
    )
}

export default Navbar