import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Grid, Button } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
  root: {
    minWidth: 200,
    maxWidth: 600
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    minWidth: 100,
  },
});

class DashRoutines extends Component {
    
    onClick = type => e => {
      e.preventDefault();
      this.props.history.push(`/${type}`);
    }

    render() {

        const { classes } = this.props;

        console.log(this.props)

        return (
            <Card container className={classes.root} variant="outlined">
              <CardContent align="center">
                <Typography variant="h3" color="primary" gutterBottom>Rutinas :</Typography>
                <br/>
                <Grid container justify="center" spacing={2}>
                  <Grid item xs={12} className={classes.pos}>
                    <Button variant="outlined" color="primary" fullWidth={true} onClick={this.onClick("vips")} > VIP's </Button>
                  </Grid>
                  <Grid item xs={12} className={classes.pos}>
                    <Button variant="outlined" color="primary" fullWidth={true} onClick={this.onClick("locales")}> Locales </Button>
                  </Grid>
                  <Grid item xs={12} className={classes.pos}>
                    <Button variant="outlined" color="primary" fullWidth={true} onClick={this.onClick("baths")}> Baños </Button>
                  </Grid>
                  <Grid item xs={12} className={classes.pos}>
                    <Button variant="outlined" color="primary" fullWidth={true} onClick={this.onClick("parkings")}> Parking </Button>
                  </Grid>
                  <Grid item xs={12} className={classes.pos}>
                    <Button variant="outlined" color="primary" fullWidth={true} onClick={this.onClick("silleterias")}> Silletería </Button>
                  </Grid>
                  <Grid item xs={12} className={classes.pos}>
                    <Button variant="outlined" color="primary" fullWidth={true} onClick={this.onClick("fachadas")}> Fachada </Button>
                  </Grid>
                  <Grid item xs={12} className={classes.pos}>
                    <Button variant="outlined" color="primary" fullWidth={true} onClick={this.onClick("pantallas")}> Pantalla </Button>
                  </Grid>
                  <Grid item xs={12} className={classes.pos}>
                    <Button variant="outlined" color="primary" fullWidth={true} onClick={this.onClick("rcis")}> Gabinetes RCI </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
        )
    }
}

DashRoutines.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    {  }
) (DashRoutines));