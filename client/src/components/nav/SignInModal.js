import React, { useState} from 'react'
import { IconButton, makeStyles, Typography, Modal, Backdrop, Fade, Link } from '@material-ui/core'
import { Clear as ClearIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
},
paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    position: 'relative',
    outline: 'none',
    borderRadius: '5px'
},
signInButton: {
    maxWidth: '15rem',
},
closeBtn: {
    position: 'absolute',
    right: '5px',
    top: '5px'
},



}))

const SignInModal = ({ open, toggleModal}) => {
    const classes = useStyles()

    return (
      <div>
      <Modal
          open={open}
          onClose={toggleModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
          className={classes.modal}
      >
          <Fade in={open}>
              <div className={classes.paper}>
                  <IconButton className={classes.closeBtn}>
                      <ClearIcon onClick={toggleModal} />
                  </IconButton>
                  <div>
                      <Typography variant='h5' gutterBottom>Sign in to Squish</Typography>
                      <Typography variant='body1' gutterBottom>We will only ever use your profile data to save your projects.</Typography>
                      <Link href='/auth/google'>
                          <img src='https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png' className={classes.signInButton} alt='sign in with google button' />
                      </Link>
                  </div>
              </div>
          </Fade>
      </Modal>
  </div>
    )
}

export default SignInModal