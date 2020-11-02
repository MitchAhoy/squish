import React, { useContext } from 'react'
import { makeStyles, Container, Typography } from '@material-ui/core'
import ProjectCard from './ProjectCard'
import { ProjectsContext } from '../../context/projects.context'

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

const ProjectsOverview = () => {
    const classes = useStyles()
    const { projects } = useContext(ProjectsContext)



    return (
        <Container>
            <Typography variant='h2' gutterBottom>Projects</Typography>
            <div className={classes.cardsContainer}>
                {projects.length > 0 && projects.map((project) => <ProjectCard key={project._id}  project={project} />)}
            </div>
        </Container>
    )
}

export default ProjectsOverview
