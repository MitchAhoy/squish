import React, { useContext, useState } from 'react'
import { OrganisationsContext } from '../../context/organisations.context'
import EditableText from '../utils/EditableText'
import { Container, makeStyles, List, ListItem, Button, Avatar, TextField, IconButton, Typography } from '@material-ui/core'
import {Clear as ClearIcon} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        padding: 0,
        margin: '2rem 0'
    },
    avatarIcon: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
        margin: '0 0.3rem'
    },
    addBtn: {
        margin: '1rem 0'
    },
    addUser: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 360
    },
    listEmail: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}))

const IndividualOrganisation = ({ match: { params: { organisationId } } }) => {
    const classes = useStyles()
    const { organisations, updateOrganisation, editOrganisationUser } = useContext(OrganisationsContext)
    const organisationToRender = organisations?.filter(org => org._id === organisationId)
    const [formEmail, setFormEmail] = useState('')
    const handleEmailChange = (evt) => setFormEmail(evt.target.value)
    const addUser = (_id, formEmail, action) => {
        editOrganisationUser(_id, formEmail, action)
        setFormEmail('')
    }

    return (
        <Container>
        {organisationToRender && (
            organisationToRender.map(({organisationName, organisationUsers, _id}) => (
                <div key={_id}>
                    <EditableText className={classes.content} value={organisationName} name='organisationName' multiline={false} variant='title' id={_id} update={updateOrganisation}>{organisationName}</EditableText>
                    <List className={classes.list}>
                    {organisationUsers.length > 0 ? organisationUsers.map(user => (
                        <>
                        
                        <ListItem className={classes.listItem} key={user}>
                            <div className={classes.listEmail}>
                                <Avatar className={classes.avatarIcon}>{user[0].toUpperCase()}</Avatar>
                                {user}
                            </div>
                            <IconButton onClick={() => editOrganisationUser(_id, user, 'remove')}><ClearIcon /></IconButton>
                        </ListItem>
                        </>
                    )) : (
                        <Typography variant='h3'>Add Users To The Organisation</Typography>
                    )}
                    </List>
                    <form className={classes.addUser} onSubmit={(evt) => {evt.preventDefault();addUser(_id, formEmail, 'add')}}>
                    <TextField 
                        name='email'
                        value={formEmail}
                        onChange={handleEmailChange}
                        required
                        type='email'
                        placeholder='Add User To Organisation'
                        variant='outlined'
                        label='Email'
                    />
                    <Button className={classes.addBtn} variant='contained' color='secondary' type='submit'>Add User</Button>
                    </form>
                </div>
            ))
        )}

           
        </Container>
    )
}

export default IndividualOrganisation
