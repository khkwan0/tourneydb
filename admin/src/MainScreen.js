import HomeScreen from './HomeScreen'
import LocationScreen from './LocationScreen'
import TournamentsScreen from './TournamentsScreen'
import PreferencesScreen from './PreferencesScreen'

import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import LocationIcon from '@material-ui/icons/LocationOn'
import SettingsIcon from '@material-ui/icons/Settings'
import LogoutIcon from '@material-ui/icons/ExitToApp'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MainScreen(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false)
	const [activeScreen, setScreen] = React.useState('Home')

	const screens = {
    "Home": <HomeScreen />,
    "Location": <LocationScreen />,
    "Tournaments": <TournamentsScreen />,
    "Preferences": <PreferencesScreen />
	}

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    return () => {
//      console.log('component will unmount')
    }
  }, [])

  const handleLogout = () => {
    props.handleLogout()
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
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Home', 'Location'].map((text, index) => (
            <ListItem button key={text}>
              {text === "Home" && <ListItemIcon onClick={() => setScreen(text)}><HomeIcon /></ListItemIcon>}
              {text === "Location" && <ListItemIcon onClick={() => setScreen(text)}><LocationIcon /></ListItemIcon>}
              <ListItemText primary={text} onClick={() => setScreen(text)} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
            <ListItem button key="Preferences">
              <ListItemIcon onClick={() => setScreen("Preferences")}><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Preferences"  onClick={()=> setScreen("Preferences")} />
            </ListItem>
            <ListItem button key="Logout">
              <ListItemIcon onClick={() => handleLogout()}><LogoutIcon /></ListItemIcon>
              <ListItemText primary={"Logout"} onClick={() => handleLogout()} />
            </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
				{screens[activeScreen]}
      </main>
    </div>
  );
}

