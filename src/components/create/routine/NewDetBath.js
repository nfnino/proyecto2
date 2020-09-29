import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Typography, Button, Grid, TextField} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { getDetail, newDetBath } from "../../../actions/routines/bathActions";

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

class NewDetBath extends Component {

  constructor() {
    super();
    this.state = {
      sanitarios: null,
      orinales: null,
      lavamanos: null,
      secamanos: null,
      panaleras: null,
      duchas: null,
      luminarias: null,
      errors: {}
    }
  }

  componentDidMount() {
    this.props.getDetail(this.props.id);
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
      sanitarios: this.state.sanitarios,
      orinales: this.state.orinales,
      lavamanos: this.state.lavamanos,
      secamanos: this.state.secamanos,
      panaleras: this.state.panaleras,
      duchas: this.state.duchas,
      luminarias: this.state.luminarias,
    }
    console.log(data)
    this.props.newDetBath(data, this.props.history);
  }
  
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    console.log(this.props)
    const {sanitarios, orinales, lavamanos, secamanos, panaleras, duchas, luminarias} = this.state;

return (
  <div>
      <Card container className={classes.root} variant="outlined">
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom> Baño {this.props.id} :</Typography>
              <br/>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                id="sanitarios"
                label="Sanitarios"
                defaultValue={sanitarios}
                onChange={this.handleChange('sanitarios')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: 350
                }}>
                </TextField>
                <span className="red-text">{errors.sanitarios}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="orinales"
                label="Orinales"
                defaultValue={orinales}
                onChange={this.handleChange('orinales')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: 350
                }}>
                </TextField>
                <span className="red-text">{errors.orinales}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="lavamanos"
                label="Lavamanos"
                defaultValue={lavamanos}
                onChange={this.handleChange('lavamanos')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: 350
                }}>
                </TextField>
                <span className="red-text">{errors.lavamanos}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="secamanos"
                label="Secamanos"
                defaultValue={secamanos}
                onChange={this.handleChange('secamanos')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: 350
                }}>
                </TextField>
                <span className="red-text">{errors.secamanos}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="panaleras"
                label="Pañaleras"
                defaultValue={panaleras}
                onChange={this.handleChange('panaleras')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: 350
                }}>
                </TextField>
                <span className="red-text">{errors.panaleras}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="duchas"
                label="Duchas"
                defaultValue={duchas}
                onChange={this.handleChange('duchas')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: 350
                }}>
                </TextField>
                <span className="red-text">{errors.duchas}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="luminarias"
                label="Luminarias"
                defaultValue={luminarias}
                onChange={this.handleChange('luminarias')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: 350
                }}>
                </TextField>
                <span className="red-text">{errors.luminarias}</span>
              </Grid>  
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

NewDetBath.propTypes = {
    getDetail: PropTypes.func.isRequired,
    newDetBath: PropTypes.func.isRequired,
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
    { getDetail, newDetBath }
)(NewDetBath));