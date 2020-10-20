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
      sanitarios: 0,
      orinales: 0,
      lavamanos: 0,
      secamanos: 0,
      panaleras: 0,
      duchas: 0,
      luminarias: 0,
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

    let sanit_disp = 0;
    let orins_disp = 0;
    let lavam_disp = 0;
    let secam_disp = 0;
    let panal_disp = 0;
    let duchs_disp = 0;
    let lumin_disp = 0;

    const ids_banos = ["N1_P1_E13","N2_P1_E12","ENF_P1_E10","N3_P1_E10","N4_P1_E10","N5_P1_E9",
                      "N6_P1_E6", "N7_P1_E6", "N8_P1_E3", "N9_P1_E3", "N10_P1_E4", "N11_P1_E23",
                    "N12_P1_E21", "N13_P1_E21", "N14_P1_E19", "N15_P1_E17", "N16_P1_E17", "N17_P1_E17", 
                    "N18_P1_E17", "N19_P2_E15", "CAM1_P2_E16", "CAM2_P2_E15", "N20_P2_E15", "N21_P2_E14",
                    "N22_P2_E13", "N23_P2_E14", "N24_P2_E11", "N25_P2_E10", "N26_P2_E9"]

    for(let i=0;i<ids_banos.length;i++) {
      if(this.props.id=="N1_P1_E13") {
        sanit_disp = 4; orins_disp = 0; lavam_disp = 5; secam_disp = 2;
        panal_disp = 0; duchs_disp = 3; lumin_disp = 6;
      }
      else if(this.props.id=="N2_P1_E12") {
        sanit_disp = 2; orins_disp = 2; lavam_disp = 5; secam_disp = 2;
        panal_disp = 0; duchs_disp = 4; lumin_disp = 6;
      }
      else if(this.props.id=="ENF_P1_E10") {
        sanit_disp = 1; orins_disp = 0; lavam_disp = 1; secam_disp = 1;
        panal_disp = 0; duchs_disp = 0; lumin_disp = 1;
      }
      else if(this.props.id=="N3_P1_E10") {
        sanit_disp = 1; orins_disp = 0; lavam_disp = 1; secam_disp = 1;
        panal_disp = 0; duchs_disp = 0; lumin_disp = 1;
      }
      else if(this.props.id=="N4_P1_E10") {
        sanit_disp = 14; orins_disp = 0; lavam_disp = 13; secam_disp = 3;
        panal_disp = 0; duchs_disp = 0; lumin_disp = 10;
      }
      else if(this.props.id=="N5_P1_E9") {
        sanit_disp = 4; orins_disp = 6; lavam_disp = 5; secam_disp = 2;
        panal_disp = 0; duchs_disp = 0; lumin_disp = 5;
      }
      else if(this.props.id=="N6_P1_E6") {
        sanit_disp = 4; orins_disp = 5; lavam_disp = 8; secam_disp = 2;
        panal_disp = 1; duchs_disp = 0; lumin_disp = 5;
      }
      else if(this.props.id=="N7_P1_E6") {
        sanit_disp = 9; orins_disp = 0; lavam_disp = 8; secam_disp = 2;
        panal_disp = 1; duchs_disp = 0; lumin_disp = 6;
      }
      else if(this.props.id=="N8_P1_E3") {
        sanit_disp = 1; orins_disp = 0; lavam_disp = 1; secam_disp = 1;
        panal_disp = 0; duchs_disp = 0; lumin_disp = 1;
      }
      else if(this.props.id=="N9_P1_E3") {
        sanit_disp = 1; orins_disp = 0; lavam_disp = 1; secam_disp = 1;
        panal_disp = 0; duchs_disp = 0; lumin_disp = 1;
      }
      else if(this.props.id=="N10_P1_E4") {
        sanit_disp = 10; orins_disp = 24; lavam_disp = 14; secam_disp = 3;
        panal_disp = 0; duchs_disp = 0; lumin_disp = 14;
      }
      else if(this.props.id=="N11_P1_E23") {
        sanit_disp = 22; orins_disp = 0; lavam_disp = 17; secam_disp = 3;
        panal_disp = 3; duchs_disp = 0; lumin_disp = 16;
      }
      else if(this.props.id=="N12_P1_E21") {
        sanit_disp = 4; orins_disp = 4; lavam_disp = 7; secam_disp = 2;
        panal_disp = 0; duchs_disp = 0; lumin_disp = 6;
      }
      else if(this.props.id=="N13_P1_E21") {
        sanit_disp = 9; orins_disp = 0; lavam_disp = 6; secam_disp = 2;
        panal_disp = 1; duchs_disp = 0; lumin_disp = 6;
      }
      else if(this.props.id=="N14_P1_E19") {
        sanit_disp = 14; orins_disp = 0; lavam_disp = 12; secam_disp = 3;
        panal_disp = 1; duchs_disp = 0; lumin_disp = 10;
      }
      else if(this.props.id=="N15_P1_E17") {
        sanit_disp = 1; orins_disp = 0; lavam_disp = 1; secam_disp = 1;
        panal_disp = 0; duchs_disp = 0; lumin_disp = 1;
      }
      else if(this.props.id=="N16_P1_E17") {
        sanit_disp = 1; orins_disp = 0; lavam_disp = 1; secam_disp = 1;
        panal_disp = 0; duchs_disp = 0; lumin_disp = 1;
      }
      else if(this.props.id=="N17_P1_E17") {
        sanit_disp = 1; orins_disp = 0; lavam_disp = 1; secam_disp = 1;
        panal_disp = 0; duchs_disp = 0; lumin_disp = 1;
      }
      else if(this.props.id=="N18_P1_E17") {
        sanit_disp = 4; orins_disp = 6; lavam_disp = 5; secam_disp = 2;
        panal_disp = 0; duchs_disp = 0; lumin_disp = 5;
      }
      else if(this.props.id=="N19_P2_E15") {
        sanit_disp = 5; orins_disp = 0; lavam_disp = 5; secam_disp = 1;
        panal_disp = 0; duchs_disp = 3; lumin_disp = 10;
      }
      else if(this.props.id=="CAM1_P2_E16") {
        sanit_disp = 1; orins_disp = 0; lavam_disp = 1; secam_disp = 0;
        panal_disp = 0; duchs_disp = 1; lumin_disp = 3;
      }
      else if(this.props.id=="CAM2_P2_E15") {
        sanit_disp = 1; orins_disp = 0; lavam_disp = 1; secam_disp = 0;
        panal_disp = 0; duchs_disp = 1; lumin_disp = 3;
      }
      else if(this.props.id=="N20_P2_E15") {
        sanit_disp = 4; orins_disp = 0; lavam_disp = 4; secam_disp = 1;
        panal_disp = 0; duchs_disp = 4; lumin_disp = 7;
      }
      else if(this.props.id=="N21_P2_E14") {
        sanit_disp = 4; orins_disp = 0; lavam_disp = 4; secam_disp = 0;
        panal_disp = 0; duchs_disp = 0; lumin_disp = 6;
      }
      else if(this.props.id=="N22_P2_E13") {
        sanit_disp = 4; orins_disp = 0; lavam_disp = 4; secam_disp = 0;
        panal_disp = 0; duchs_disp = 0; lumin_disp = 6;
      }
      else if(this.props.id=="N23_P2_E14") {
        sanit_disp = 1; orins_disp = 0; lavam_disp = 1; secam_disp = 1;
        panal_disp = 0; duchs_disp = 0; lumin_disp = 1;
      }
      else if(this.props.id=="N24_P2_E11") {
        sanit_disp = 3; orins_disp = 0; lavam_disp = 3; secam_disp = 1;
        panal_disp = 0; duchs_disp = 0; lumin_disp = 3;
      }
      else if(this.props.id=="N25_P2_E10") {
        sanit_disp = 17; orins_disp = 0; lavam_disp = 12; secam_disp = 3;
        panal_disp = 1; duchs_disp = 0; lumin_disp = 12;
      }
      else if(this.props.id=="N26_P2_E9") {
        sanit_disp = 7; orins_disp = 6; lavam_disp = 8; secam_disp = 2;
        panal_disp = 0; duchs_disp = 0; lumin_disp = 7;
      }
    }

return (
  <div>
      <Card container className={classes.root} variant="outlined">
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom> Baño {this.props.id} :</Typography>
              <br/>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Sanitarios"
                  defaultValue={sanit_disp}
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
                    width: 350
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="sanitarios"
                label="Sanitarios faltantes"
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
              <Grid item xs={6}>
                <TextField
                  label="Orinales"
                  defaultValue={orins_disp}
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
                    width: 350
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="orinales"
                label="Orinales faltantes"
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
              <Grid item xs={6}>
                <TextField
                  label="Lavamanos"
                  defaultValue={lavam_disp}
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
                    width: 350
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="lavamanos"
                label="Lavamanos faltantes"
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
              <Grid item xs={6}>
                <TextField
                  label="Secamanos"
                  defaultValue={secam_disp}
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
                    width: 350
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="secamanos"
                label="Secamanos faltantes"
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
              <Grid item xs={6}>
                <TextField
                  label="Pañaleras"
                  defaultValue={panal_disp}
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
                    width: 350
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="panaleras"
                label="Pañaleras faltantes"
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
              <Grid item xs={6}>
                <TextField
                  label="Duchas"
                  defaultValue={duchs_disp}
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
                    width: 350
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="duchas"
                label="Duchas faltantes"
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
              <Grid item xs={6}>
                <TextField
                  label="Luminarias"
                  defaultValue={lumin_disp}
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
                    width: 350
                  }}
                />
              </Grid> 
              <Grid item xs={6}>
                <TextField
                id="luminarias"
                label="Luminarias faltantes"
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