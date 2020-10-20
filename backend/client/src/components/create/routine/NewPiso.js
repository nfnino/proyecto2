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
      p_01: 0, p_02: 0, p_03: 0,
      p_04: 0, p_05: 0, p_06: 0, 
      p_07: 0, p_08: 0, p_09: 0,
      p_10: 0, p_11: 0, p_12: 0,
      p_13: 0, p_14: 0, p_15: 0,
      p_16: 0, p_17: 0, p_18: 0,
      p_19: 0,
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

    let {disp_p_01, disp_p_02, disp_p_03, disp_p_04, disp_p_05, disp_p_06, disp_p_07, disp_p_08, disp_p_09, disp_p_10, disp_p_11, disp_p_12,
      disp_p_13, disp_p_14, disp_p_15, disp_p_16, disp_p_17, disp_p_18, disp_p_19} = 0;
    if(this.props.id === "piso_2") {
      disp_p_01=228; disp_p_02=269; disp_p_03=229; disp_p_04=282; disp_p_05=227; disp_p_06=268; disp_p_07=209; disp_p_08=245; disp_p_09=99; disp_p_10="N/A"
      disp_p_11=102; disp_p_12=245; disp_p_13=211; disp_p_14=264; disp_p_15=234; disp_p_16=283; disp_p_17=226; disp_p_18=266; disp_p_19=229;
    }
    else if(this.props.id === "piso_3") {
      disp_p_01=225; disp_p_02=303; disp_p_03=322; disp_p_04=376; disp_p_05=319; disp_p_06=290; disp_p_07=225; disp_p_08=193; disp_p_09=129;  disp_p_10=132;
      disp_p_11=133; disp_p_12=194; disp_p_13=224; disp_p_14=299; disp_p_15=326; disp_p_16=380; disp_p_17=314; disp_p_18=299; disp_p_19=225;
    }


return (
  <div>
      <Card container className={classes.root} variant="outlined">
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom> Silleterías {this.props.id} :</Typography>
              <br/>
            <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                  label="silletería p_01"
                  defaultValue={disp_p_01}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_01"
                label="No Disponibles 01"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_02"
                  defaultValue={disp_p_02}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_02"
                label="No Disponibles 02"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_03"
                  defaultValue={disp_p_03}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_03"
                label="No Disponibles 03"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_04"
                  defaultValue={disp_p_04}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_04"
                label="No Disponibles 04"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_05"
                  defaultValue={disp_p_05}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_05"
                label="No Disponibles 05"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_06"
                  defaultValue={disp_p_06}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_06"
                label="No Disponibles 06"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_07"
                  defaultValue={disp_p_07}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_07"
                label="No Disponibles 07"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_08"
                  defaultValue={disp_p_08}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_08"
                label="No Disponibles 08"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_09"
                  defaultValue={disp_p_09}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_09"
                label="No Disponibles 09"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_10"
                  defaultValue={disp_p_10}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_10"
                label="No Disponibles 10"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_11"
                  defaultValue={disp_p_11}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_11"
                label="No Disponibles 11"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_12"
                  defaultValue={disp_p_12}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_12"
                label="No Disponibles 12"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_13"
                  defaultValue={disp_p_13}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_13"
                label="No Disponibles 13"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_14"
                  defaultValue={disp_p_14}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_14"
                label="No Disponibles 14"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_15"
                  defaultValue={disp_p_15}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_15"
                label="No Disponibles 15"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_16"
                  defaultValue={disp_p_16}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_16"
                label="No Disponibles 16"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_17"
                  defaultValue={disp_p_17}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid>  
              <Grid item xs={6}>
                <TextField
                id="p_17"
                label="No Disponibles 17"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_18"
                  defaultValue={disp_p_18}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_18"
                label="No Disponibles 18"
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
              <Grid item xs={6}>
                <TextField
                  label="silletería p_19"
                  defaultValue={disp_p_19}
                  margin="normal"
                  variant="filled"
                  size="small"
                  contentEditable="false"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                  multiline={true}
                  style={{
                    width: "100%"
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="p_19"
                label="No Disponibles 19"
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
              </Grid>
              <Grid item>
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