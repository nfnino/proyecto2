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
    maxWidth: 700
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
    minWidth: 200,
    maxWidth: 600,
  },
});

class DashRoutines extends Component {

  constructor() {
    super();
    this.state = {
      opacity1: "50%",
      opacity2: "50%",
      opacity3: "50%",
      opacity4: "50%",
      opacity5: "50%",
      opacity6: "50%",
      opacity7: "50%",
      opacity8: "50%",
    }
  }

    changeOpa = type => e => {
      e.preventDefault();
      this.setState({[type]: "100%"});
    }

    returnOpa = type => e => {
      e.preventDefault();
      this.setState({[type]: "50%"});
    }
    
    onClick = type => e => {
      e.preventDefault();
      this.props.history.push(`/${type}`);
    }

    render() {

        const { classes } = this.props;

        console.log(this.props)

        return (
          <div style={{fullWidth:true}}>
            <Card variant="elevation">
              <CardContent>
              <Grid container direction="columns" alignItems="felx-end" justify="center">
                <Grid item >
                  <Card className={classes.root} variant="outlined">
                    <CardContent align="center">
                      <br/>
                      <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom>RUTINAS</Typography>
                      <br/>
                      <Grid container justify="center" spacing={2}>
                        <Grid item xs={4} className={classes.pos}>
                          <Button variant="outlined" style={{color:"#F59C00"}} fullWidth={true} onMouseOver={this.changeOpa('opacity1')} 
                            onMouseLeave={this.returnOpa('opacity1')} style={{height:150, backgroundSize: "cover", backgroundImage:"url(/uploads/misc/vip.jpg)", fontSize:22, fontWeight:"bolder", filter:`brightness(${this.state.opacity1})` }} onClick={this.onClick("vips")} > VIP's </Button>
                        </Grid>
                        <Grid item xs={4} className={classes.pos}>
                          <Button variant="outlined" style={{color:"#F59C00"}} fullWidth={true} onMouseOver={this.changeOpa('opacity2')} 
                          onMouseLeave={this.returnOpa('opacity2')} style={{height:150, backgroundSize: "cover", backgroundImage:"url(/uploads/misc/crepes.jpg)", fontSize:22, fontWeight:"bolder", filter:`brightness(${this.state.opacity2})`}} onClick={this.onClick("locales")}> Locales </Button>
                        </Grid>
                        <Grid item xs={4} className={classes.pos}>
                          <Button variant="outlined" style={{color:"#F59C00"}} fullWidth={true} onMouseOver={this.changeOpa('opacity3')} 
                          onMouseLeave={this.returnOpa('opacity3')} style={{height:150, backgroundSize: "cover", backgroundImage:"url(/uploads/misc/banios.jpg)", fontSize:22, fontWeight:"bolder", filter:`brightness(${this.state.opacity3})`}} onClick={this.onClick("baths")}> Baños </Button>
                        </Grid>
                        <Grid item xs={4} className={classes.pos}>
                          <Button variant="outlined" style={{color:"#F59C00"}} fullWidth={true} onMouseOver={this.changeOpa('opacity4')} 
                          onMouseLeave={this.returnOpa('opacity4')} style={{height:150, backgroundSize: "cover", backgroundImage:"url(/uploads/misc/parking.jpg)", fontSize:22, fontWeight:"bolder", filter:`brightness(${this.state.opacity4})`}} onClick={this.onClick("parkings")}> Parking </Button>
                        </Grid>
                        <Grid item xs={4} className={classes.pos}>
                          <Button variant="outlined" style={{color:"#F59C00"}} fullWidth={true} onMouseOver={this.changeOpa('opacity5')} 
                          onMouseLeave={this.returnOpa('opacity5')} style={{height:150, backgroundSize: "cover", backgroundImage:"url(/uploads/misc/silleteria.jpg)", fontSize:22, fontWeight:"bolder", filter:`brightness(${this.state.opacity5})`}} onClick={this.onClick("silleterias")}> Silletería </Button>
                        </Grid>
                        <Grid item xs={4} className={classes.pos}>
                          <Button variant="outlined" style={{color:"#F59C00"}} fullWidth={true} onMouseOver={this.changeOpa('opacity6')} 
                          onMouseLeave={this.returnOpa('opacity6')} style={{height:150, backgroundSize: "cover", backgroundImage:"url(/uploads/misc/fachada.jpeg)", fontSize:22, fontWeight:"bolder", filter:`brightness(${this.state.opacity6})`}} onClick={this.onClick("fachadas")}> Fachada </Button>
                        </Grid> 
                        <Grid item xs={4} className={classes.pos}>
                          <Button variant="outlined" style={{color:"#F59C00"}} fullWidth={true} onMouseOver={this.changeOpa('opacity7')} 
                          onMouseLeave={this.returnOpa('opacity7')} style={{height:150, backgroundSize: "cover", backgroundImage:"url(/uploads/misc/pantalla.jpeg)", fontSize:22, fontWeight:"bolder", filter:`brightness(${this.state.opacity7})`}} onClick={this.onClick("pantallas")}> Pantalla </Button>
                        </Grid>
                        <Grid item xs={4} className={classes.pos}>
                          <Button variant="outlined" style={{color:"#F59C00"}} fullWidth={true} onMouseOver={this.changeOpa('opacity8')} 
                          onMouseLeave={this.returnOpa('opacity8')} style={{height:150, backgroundSize: "cover", backgroundImage:"url(/uploads/misc/rci.jpg)", fontSize:22, fontWeight:"bolder", filter:`brightness(${this.state.opacity8})`}} onClick={this.onClick("rcis")}> Gabinetes RCI </Button>
                        </Grid>
                        <Grid item xs={4} className={classes.pos}>

                        </Grid>
                      </Grid>
                      <br/>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              </CardContent>
            </Card>
          </div>
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