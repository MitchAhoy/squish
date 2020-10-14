import React, { useState} from 'react'
import { Button, makeStyles, Typography, Modal, Backdrop, Fade } from '@material-ui/core'
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
        <div>
        <Button variant='contained' color='inherit' className={classes.root} onClick={toggleModal}>Login</Button>
        {open && <SignInModal open={open} toggleModal={toggleModal}/>}
        </div>
    )
}

export default LoginButton