import React from 'react'
import { makeStyles, Container, Typography, Button } from '@material-ui/core'
import Login from '../nav/Login'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        height: '80vh',
        marginTop: '10rem'
    },
    ctaBtn: {
        maxWidth: '10rem',
    }
}))

const Home = () => {
    const classes = useStyles()
    return (
        <Container className={classes.root}>
                <Typography variant='h1' className={classes.heading}>SQUISH</Typography>
                <Typography variant='h3' gutterBottom>Squish your bugs!</Typography>
                <Typography variant='body1' gutterBottom>Invite your team members to begin working more efficiently in a collaborative environment!</Typography>

            <Login />
        </Container>
    )
}

export default Home
