import React, { useContext } from 'react'
import { OrganisationsContext } from '../../context/organisations.context'
import { Container, makeStyles, Paper, CssBaseline, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	card: {
		padding: '1rem 2rem',
		display: 'flex',
		justifyContent: 'space-between',
		alignContent: 'center',
		alignItems: 'center',
		margin: '1rem',
		minWidth: 400,
		maxWidth: 500,
		boxShadow: theme.customShadow.lg,
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'flex-start',
			display: 'block'
		}
	},
	cardRight: {
		display: 'flex',
		flexDirection: 'row',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'row-reversed',
			justifyContent: 'space-between',
			alignItems: 'center'
		}
	},
	cardStatus: {
		margin: 'auto',
		padding: '0 12px',
		flexDirection: 'row',
		[theme.breakpoints.down('xs')]: {
			margin: '0.5rem 0rem',
			padding: '0rem'
		}
	},
	moreBtn: {
		textDecoration: 'none'
	}
}))

const OrganisationsOverview = () => {
	const { organisations } = useContext(OrganisationsContext)

	const classes = useStyles()

	return (
		<>

			<Container>
				<Typography variant='h2' gutterBottom>Organisations</Typography>
				<div  className={classes.root}>
					{organisations.map(({ organisationName, _id }) => (
						<Paper className={classes.card} elevation={3}>
							<div>
								<Typography variant='h5' gutterBottom>{organisationName}</Typography>
							</div>
							<div className={classes.cardRight}>
								<div>
									<Link className={classes.moreBtn} to={`organisation/${_id}`}><Button variant='contained' color='secondary'>View More</Button></Link>
								</div>
							</div>
						</Paper>

					))}

				</div>

			</Container>
		</>
	)
}

export default OrganisationsOverview

