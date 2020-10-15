import React, { useContext } from 'react'
import { makeStyles, Container } from '@material-ui/core'
import ProjectCard from './ProjectCard'

const useStyles = makeStyles((theme) => ({
    cardsContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: 'auto'
    },
    projectCard: {
        margin: theme.spacing(3)
    }
}))

const Projects = () => {

    const classes = useStyles()

    return (
        <Container>
            <div className={classes.cardsContainer}>
                <ProjectCard className={classes.projectCard} />
                {projects.length > 0 && projects.map((project) => <ProjectCard key={project._id}  project={project} />)}
            </div>
        </Container>
    )
}

export default Projects
