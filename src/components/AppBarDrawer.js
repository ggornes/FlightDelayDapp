import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import DashboardIcon from '@material-ui/icons/Dashboard';
import ViewListIcon from '@material-ui/icons/ViewList';
import AddBoxIcon from '@material-ui/icons/AddBox';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import InfoIcon from '@material-ui/icons/Info';
import FlightIcon from '@material-ui/icons/Flight';
import { Chip } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face'
import LanguageIcon from '@material-ui/icons/Language'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountBoxIcon from '@material-ui/icons/AccountBox';


import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  
}));

export default function ClippedDrawer({Web3ConnectionManager, Fd}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <List>
            <ListItem key={"Icon"}><FlightIcon/></ListItem>
          </List>
          
          <Typography variant="h6" noWrap>
            Flight Delay Dapp Demo
          </Typography>

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <List>
              <ListItem key={"Account"}>
                <Chip
                  label="User Account"
                  clickable
                  icon={<AccountBoxIcon />}
                  color="inherit"
                />        
              </ListItem>
            </List>
            <List>
              <ListItem key={"Balance"}>
                <Chip
                  label="Account Balance"
                  clickable
                  icon={<AccountBalanceWalletIcon />}
                  color="inherit"
                />        
              </ListItem>
            </List>            
            <List>
              <ListItem key={"Network"}>
                <Chip
                  label="Network"
                  clickable
                  icon={<LanguageIcon />}
                  color="inherit"
                />        
              </ListItem>
            </List>             
            
          </div>




        </Toolbar>

      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {/* {['Dashboard', 'View policies', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
            <ListItem button key={"Dashboard"}>
              <ListItemIcon><DashboardIcon/></ListItemIcon>
              <ListItemText primary={"Dashboard"}/>
            </ListItem>
            <ListItem button key={"Policies"}>
              <ListItemIcon><ViewListIcon/></ListItemIcon>
              <ListItemText primary={"Policies"}/>
            </ListItem>            
            <ListItem button key={"New Policy"}>
              <ListItemIcon><AddBoxIcon/></ListItemIcon>
              <ListItemText primary={"New Policy"}/>
            </ListItem>              
          </List>
          <Divider />
          <List>
            {/* {['Help', 'About'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
            <ListItem button key={"Help"}>
              <ListItemIcon><HelpOutlineIcon/></ListItemIcon>
              <ListItemText primary={"Help"}/>
            </ListItem>
            <ListItem button key={"About"}>
              <ListItemIcon><InfoIcon/></ListItemIcon>
              <ListItemText primary={"About"}/>
            </ListItem>                     
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
            {Web3ConnectionManager}
            <Container maxWidth="sm">
              <Box my={4}>
                {Fd}
              </Box>
            </Container>
      </main>
    </div>
  );
}
