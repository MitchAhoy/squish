import React, { useState} from 'react'
import { Button, makeStyles } from '@material-ui/core'
import SignInModal from './SignInModal'

const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.palette.secondary.main
    }
}))

const LoginButton = () => {

    const classes = useStyles()
    const [ open, setOpen] = useState(false)
    const toggleModal = () => setOpen(!open)

    return (
        <div onClick={toggleModal}>
        <Button variant='contained' color='secondary' className={classes.root}>Login</Button>
        {open && <SignInModal open={open} toggleModal={toggleModal}/>}
        </div>
    )
}

export default LoginButton