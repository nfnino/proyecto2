import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Typography, Button, Grid, TextField} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { newPiso } from "../../../actions/routines/silleteriaActions";

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
    marginBottom: 20
  },
});

class NewPiso extends Component {

  constructor() {
    super();
    this.state = {
      p_01: null, p_02: null, p_03: null,
      p_04: null, p_05: null, p_06: null, 
      p_07: null, p_08: null, p_09: null,
      p_10: null, p_11: null, p_12: null,
      p_13: null, p_14: null, p_15: null,
      p_16: null, p_17: null, p_18: null,
      p_19: null,
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
      p_01: this.state.p_01, p_02: this.state.p_02, p_03: this.state.p_03,
      p_04: this.state.p_04, p_05: this.state.p_05, p_06: this.state.p_06, 
      p_07: this.state.p_07, p_08: this.state.p_08, p_09: this.state.p_09,
      p_10: this.state.p_10, p_11: this.state.p_11, p_12: this.state.p_12,
      p_13: this.state.p_13, p_14: this.state.p_14, p_15: this.state.p_15,
      p_16: this.state.p_16, p_17: this.state.p_17, p_18: this.state.p_18,
      p_19: this.state.p_19,
    }
    console.log(data)
    this.props.newPiso(data, this.props.history);
  }
  
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    console.log(this.props)
    const {p_01, p_02, p_03, p_04, p_05, p_06, p_07, p_08, p_09, p_10, p_11, p_12,
            p_13, p_14, p_15, p_16, p_17, p_18, p_19} = this.state;
return (
  <div>
      <Card container className={classes.root} variant="outlined">
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom> Silleterías {this.props.id} :</Typography>
              <br/>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_01"
                label="01"
                defaultValue={p_01}
                onChange={this.handleChange('p_01')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_01}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_02"
                label="02"
                defaultValue={p_02}
                onChange={this.handleChange('p_02')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_02}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_03"
                label="03"
                defaultValue={p_03}
                onChange={this.handleChange('p_03')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_03}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_04"
                label="04"
                defaultValue={p_04}
                onChange={this.handleChange('p_04')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_04}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_05"
                label="05"
                defaultValue={p_05}
                onChange={this.handleChange('p_05')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_05}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_06"
                label="06"
                defaultValue={p_06}
                onChange={this.handleChange('p_06')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_06}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_07"
                label="07"
                defaultValue={p_07}
                onChange={this.handleChange('p_07')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_07}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_08"
                label="08"
                defaultValue={p_08}
                onChange={this.handleChange('p_08')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_08}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_09"
                label="09"
                defaultValue={p_09}
                onChange={this.handleChange('p_09')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_09}</span>
              </Grid>  
              {this.props.id !== "piso_1" 
              ?<Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_10"
                label="10"
                defaultValue={p_10}
                onChange={this.handleChange('p_10')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_10}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_11"
                label="11"
                defaultValue={p_11}
                onChange={this.handleChange('p_11')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_11}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_12"
                label="12"
                defaultValue={p_12}
                onChange={this.handleChange('p_12')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_12}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_13"
                label="13"
                defaultValue={p_13}
                onChange={this.handleChange('p_13')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_13}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_14"
                label="14"
                defaultValue={p_14}
                onChange={this.handleChange('p_14')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_14}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_15"
                label="15"
                defaultValue={p_15}
                onChange={this.handleChange('p_15')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_15}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_16"
                label="16"
                defaultValue={p_16}
                onChange={this.handleChange('p_16')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_16}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_17"
                label="17"
                defaultValue={p_17}
                onChange={this.handleChange('p_17')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_17}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_18"
                label="18"
                defaultValue={p_18}
                onChange={this.handleChange('p_18')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_18}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="p_19"
                label="19"
                defaultValue={p_19}
                onChange={this.handleChange('p_19')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.p_19}</span>
              </Grid></Grid>
              : null
              }
              <Grid item xs={12}>
                <Button variant="outlined" style={{color:"#F59C00"}} onClick={this.onSubmit}> Agregar </Button>
              </Grid>
            </Grid>
          </CardContent>
          <br/>
      </Card>
  </div>
    );
  }
}

NewPiso.propTypes = {
    newPiso: PropTypes.func.isRequired,
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
    { newPiso }
)(NewPiso));