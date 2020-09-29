import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Typography, Button, Grid, TextField} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { newDetPantalla } from "../../../actions/routines/pantallaActions";

import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    maxWidth: 800,
  },
  table: {
    minWidth: 500
  },
  pos: {
    left: "40%",
    width: 170,
  },
});

class NewDetPantalla extends Component {

  constructor() {
    super();
    this.state = {
      brak1: null,
      brak2: null,
      brak3: null,
      brak4: null,
      brak5: null,
      brak6: null,
      brak7: null,
      brak8: null,
      brak9: null,
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleChange = input => e => {
    this.setState({[input]: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();
    const data = {
        rutina: this.props.rutina,
        nombre: this.props.id,
        brak1: this.state.brak1,
        brak2: this.state.brak2,
        brak3: this.state.brak3,
        brak4: this.state.brak4,
        brak5: this.state.brak5,
        brak6: this.state.brak6,
        brak7: this.state.brak7,
        brak8: this.state.brak8,
        brak9: this.state.brak9,
    }
    console.log(data)
    this.props.newDetPantalla(data, this.props.history);
  }
  
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    const {brak1, brak2, brak3, brak4, brak5, brak6, brak7, brak8, brak9} = this.state;

return (
  <div>
      <Card container className={classes.root} variant="outlined">
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom> Pantalla {this.props.id} :</Typography>
              <br/>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                id="brak1"
                label="Brak 1 (AMP)"
                defaultValue={brak1}
                onChange={this.handleChange('brak1')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.brak1}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="brak2"
                label="Brak 2 (AMP)"
                defaultValue={brak2}
                onChange={this.handleChange('brak2')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.brak2}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="brak3"
                label="Brak 3 (AMP)"
                defaultValue={brak3}
                onChange={this.handleChange('brak3')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.brak3}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="brak4"
                label="Brak 4 (AMP)"
                defaultValue={brak4}
                onChange={this.handleChange('brak4')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.brak4}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="brak5"
                label="Brak 5 (AMP)"
                defaultValue={brak5}
                onChange={this.handleChange('brak5')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.brak5}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                id="brak6"
                label="Brak 6 (AMP)"
                defaultValue={brak6}
                onChange={this.handleChange('brak6')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.brak6}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                id="brak7"
                label="Brak 7 (AMP)"
                defaultValue={brak7}
                onChange={this.handleChange('brak7')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.brak7}</span>
              </Grid>  
              { this.props.id == "tablero_principal" ? null 
              : <div><Grid item xs={12} sm={6}>
                    <TextField
                    id="brak8"
                    label="Brak 8 (AMP)"
                    defaultValue={brak8}
                    onChange={this.handleChange('brak8')}
                    margin="normal"
                    variant="standard"
                    size="small"
                    multiline={true}
                    style={{
                        width: "100%"
                    }}>
                    </TextField>
                    <span className="red-text">{errors.brak8}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    id="brak9"
                    label="Brak 9 (AMP)"
                    defaultValue={brak9}
                    onChange={this.handleChange('brak9')}
                    margin="normal"
                    variant="standard"
                    size="small"
                    multiline={true}
                    style={{
                        width: "100%"
                    }}>
                    </TextField>
                    <span className="red-text">{errors.brak9}</span>
                </Grid></div>
               }
              <Grid item xs={12}>
                <Button variant="outlined" style={{backgroundColor:"#F59C00"}} onClick={this.onSubmit}> Agregar </Button>
              </Grid>
            </Grid>
          </CardContent>
          <br/>
      </Card>
  </div>
    );
  }
}

NewDetPantalla.propTypes = {
    newDetPantalla: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    id: ownProps.match.params.id,
    rutina: ownProps.match.params.rutina,
    errors: state.errors
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { newDetPantalla }
)(NewDetPantalla));