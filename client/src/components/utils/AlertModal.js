import React from 'react'
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

const AlertModal = ({ state, confirmedAction, Icon, title, setModalState }) => {
  const handleClickOpen = () => setModalState(true)
  const handleConfirmation = () => {
    confirmedAction()
    setModalState(false)
  }
  const handleClose = () => setModalState(false)

  return (
    <div>
      <IconButton onClick={handleClickOpen} variant='contained' color='secondary'>
        <Icon />
      </IconButton>
      <Dialog
        open={state}
        onClose={handleClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This can not be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmation} color="primary" autoFocus variant='contained'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AlertModal