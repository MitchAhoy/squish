import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { IconButton, Button, Avatar, List, Drawer, AppBar, CssBaseline, Toolbar, ListItemIcon, Typography, Divider, ListItemText, ListItem, Link as MUILink } from '@material-ui/core'
import {
  BugReport as BugReportIcon,
  DashboardRounded as DashboardRoundedIcon,
  AccountTreeRounded as AccountTreeRoundedIcon,
  ExitToAppRounded as ExitToAppRoundedIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon
} from '@material-ui/icons'
import Login from './Login'
import { Link } from 'react-router-dom'

const drawerWidth = 240;

const menuOptions = [
  { label: 'Dashboard', linkTo: '/dashboard', icon: <DashboardRoundedIcon /> },
  { label: 'Organisations', linkTo: '/organisations-overview', icon: <AccountTreeRoundedIcon /> },
  { label: 'Projects', linkTo: '/projects-overview', icon: <AccountTreeRoundedIcon /> }
]

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: 'none'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    color: theme.palette.text.light
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.dark
  }
}));

const NavBar = ({ user }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const isLoggedIn = Object.keys(user).length > 0

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <div>
            {isLoggedIn && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Link to='/' className={classes.link}>
              <Button className={classes.button}>
                <BugReportIcon color='inherit' /> <Typography variant='h6' component='h1' color='inherit'>SQUISH</Typography>
              </Button>
            </Link>
          </div>
          {isLoggedIn ? <Avatar alt={`${user.firstName} ${user.lastName}`} src={user.profileImage} /> : <Login />}
        </Toolbar>
      </AppBar>

      {isLoggedIn && (
        <>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              {menuOptions.map(({ label, linkTo, icon }) => (
                <Link to={linkTo} className={classes.link} key={label}>
                  <ListItem button>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={label} />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
            <List>
              {<MUILink
                underline='none'
                href='/api/logout'
                color='inherit'
                className={classes.link}>
                <ListItem button key='logout'>
                  <ListItemIcon><ExitToAppRoundedIcon /></ListItemIcon>
                  <ListItemText primary='Logout' />
                </ListItem>
              </MUILink>}
            </List>
          </Drawer>

          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />

          </main>
        </>
      )}

    </div>
  );
}

export default NavBar