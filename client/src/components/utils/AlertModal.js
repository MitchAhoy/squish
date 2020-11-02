import React from 'react'
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

const AlertModal = ({ state, confirmedAction, Icon, title, setModalState, id, position }) => {
  const handleClickOpen = () => setModalState(id)
  const handleConfirmation = () => {
    confirmedAction()
    setModalState(false)
  }
  const handleClose = () => setModalState(false)
  const positioning = position === 'absolute' ? {position: 'absolute', top: 0, left: 0} : {position: 'relative'}

  return (
    <div>
      <IconButton onClick={handleClickOpen} variant='contained' color='secondary' style={positioning}>
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