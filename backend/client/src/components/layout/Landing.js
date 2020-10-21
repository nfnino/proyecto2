
import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import logo02 from "../../logo2.png";

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Divider, Grid } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ContactsRoundedIcon from '@material-ui/icons/ContactsRounded';
import UnarchiveRoundedIcon from '@material-ui/icons/UnarchiveRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import ViewListRoundedIcon from '@material-ui/icons/ViewListRounded';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import DevicesOtherRoundedIcon from '@material-ui/icons/DevicesOtherRounded';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { withStyles } from "@material-ui/core/styles";

import { logoutUser } from "../../actions/authActions";

const drawerWidth = 200;

  const useStyles = theme => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  });

class Landing extends Component {

  state = {
    mobileOpen: false
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  handleDrawerToggle = () => {
    this.setState({mobileOpen: !this.state.mobileOpen});
  }

  render() {

    const { classes, children } = this.props;

  const { user } = this.props.auth;

  const isAuth = this.props.auth.isAuthenticated;

  const isSuper = (
    user.role === "Superusuario"
  );

  const { mobileOpen } = this.state

  const emptyDrawer = (
    <div>
       <Hidden smDown>
        <div className={classes.toolbar} />
      </Hidden>
      <Divider />
      <Divider />
      <List>
        <ListItem button key="Home" component={Link} to="/">
              <ListItemIcon><HomeRoundedIcon color="secondary"/></ListItemIcon>
              <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem button key="Login" component={Link} to="/login">
              <ListItemIcon><VpnKeyIcon color="secondary"/></ListItemIcon>
              <ListItemText primary="Iniciar Sesión" />
        </ListItem>
      </List>
    </div>
  )

  const superDrawer = (
    <div>
      <Hidden smDown>
        <div className={classes.toolbar} />
      </Hidden>
      <Divider />
      <List>
        <ListItem button key="Home" component={Link} to="/dashboard">
              <ListItemIcon><HomeRoundedIcon color="secondary"/></ListItemIcon>
              <ListItemText primary="Tablero" />
        </ListItem>
        <ListItem button key="Activos" component={Link} to="/assets">
            <ListItemIcon><DevicesOtherRoundedIcon color="secondary"/></ListItemIcon>
            <ListItemText primary="Activos" />
        </ListItem>
        <ListItem button key="Actividades" component={Link} to="/tasks">
            <ListItemIcon><BuildRoundedIcon color="secondary"/></ListItemIcon>
            <ListItemText primary="Actividades" />
        </ListItem>
        <ListItem button key="Rutinas" component={Link} to="/routines">
            <ListItemIcon><ViewListRoundedIcon color="secondary"/></ListItemIcon>
            <ListItemText primary="Rutinas" />
        </ListItem>
        <ListItem button key="Recintos" component={Link} to="/venues">
            <ListItemIcon><BusinessRoundedIcon color="secondary"/></ListItemIcon>
            <ListItemText primary="Recintos" />
        </ListItem>
        <ListItem button key="Usuarios" component={Link} to="/users">
            <ListItemIcon><ContactsRoundedIcon color="secondary"/></ListItemIcon>
            <ListItemText primary="Usuarios" />
        </ListItem>
        <ListItem button key="Auditorias" component={Link} to="/audits">
            <ListItemIcon><UnarchiveRoundedIcon color="secondary"/></ListItemIcon>
            <ListItemText primary="Auditorías" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="Mi Perfil" component={Link} to="/profile">
            <ListItemIcon><AccountCircleRoundedIcon color="secondary"/></ListItemIcon>
            <ListItemText primary="Mi Perfil" />
        </ListItem>
        <ListItem button key="Cerrar Sesión" onClick={this.onLogoutClick}>
            <ListItemIcon><ExitToAppRoundedIcon color="secondary"/></ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </div>
  );

  const drawer = (
    <div>
      <Hidden smDown>
        <div className={classes.toolbar} />
      </Hidden>
      <Divider />
      <List>
      <ListItem button key="Home" component={Link} to="/dashboard">
              <ListItemIcon><HomeRoundedIcon color="secondary" /></ListItemIcon>
              <ListItemText primary="Tablero" />
      </ListItem>
      <ListItem button key="Activos" component={Link} to="/assets">
            <ListItemIcon><DevicesOtherRoundedIcon color="secondary" /></ListItemIcon>
            <ListItemText primary="Activos" />
        </ListItem>
        <ListItem button key="Actividades" component={Link} to="/tasks">
            <ListItemIcon><BuildRoundedIcon color="secondary"/></ListItemIcon>
            <ListItemText primary="Actividades" />
        </ListItem>
        <ListItem button key="Rutinas" component={Link} to="/routines">
            <ListItemIcon><ViewListRoundedIcon color="secondary"/></ListItemIcon>
            <ListItemText primary="Rutinas" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="Mi Perfil" component={Link} to="/profile">
            <ListItemIcon><AccountCircleRoundedIcon color="secondary" /></ListItemIcon>
            <ListItemText primary="Mi Perfil" />
        </ListItem>
        <ListItem button key="Cerrar Sesión" onClick={this.onLogoutClick}>
            <ListItemIcon><ExitToAppRoundedIcon color="secondary" /></ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </div>
  );

    return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={this.handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
                <img src={logo02} alt="logo" style={{left:"2px", top:"2px", position:"absolute"}}></img>
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="flex-end" alignItems="center" spacing={1}>
                <Grid item xs={6} style={{height:65}}>
                  <Grid container direction="row" justify="flex-end" alignItems="stretch" spacing={2} style={{height:65}}>
                    <Grid item xs={3}>
                      <Divider orientation="vertical" variant="fullWidth" ></Divider>
                    </Grid>
                    <Grid item xs={3}>
                          <AccountCircleIcon style={{marginTop:14, marginRight:0, marginLeft:-15, fontSize:26}} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container direction="column" justify="center" alignItems="flex-start" style={{width:200}}>
                    <Grid item xs={12}>
                      <Typography variant="h6" style={{fontSize:14}} > {user.name} </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" style={{fontSize:14}} > {user.role} </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>{/**  <div style={{position: "fixed", right: "0"}}> */}
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            color="#EEE"
            open={mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {isAuth? ( isSuper? superDrawer : drawer ): emptyDrawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            color="#EEE"
            open
          >
            {isAuth? ( isSuper? superDrawer : drawer ): emptyDrawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
      </div>
    );
  }
}
Landing.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default withStyles(useStyles)(withRouter(connect(
  mapStateToProps,
  { logoutUser }
)(Landing)));