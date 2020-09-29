import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUsers } from "../../../actions/userActions";
import { getBaths, updateBath } from "../../../actions/routines/bathActions";

import { Table, TableContainer, TableCell, Typography, Paper, TableHead, TableRow, TableBody, Button, TextField} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    maxWidth: 800,
  },
  table: {
    minWidth: 300
  },
  pos: {
    left: "40%",
    width: 170,
  },
});

class UpdateBath extends Component {

  constructor(ownProps) {
    super(ownProps);
    console.log(ownProps)
    this.state = {
      own: ownProps.baths.baths.data.find(bath => bath._id === ownProps.id),
      observacion: "",
    };
  }

  componentDidMount() {
    this.props.getBaths();
  }

  onClick = nombre => e => {
    e.preventDefault();
    const rutina = this.state.own._id;
    this.props.history.push(`/newDetBath/${rutina}/${nombre}`)
  }

  onClick2 = nombre => e => {
    e.preventDefault();
    const rutina = this.state.own._id;
    this.props.history.push(`/newDetBath/${rutina}/${nombre}`)
  }

  handleChange = input => e => {
    e.preventDefault();
    this.setState({
      [input]: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const data = {
      observacion: this.state.observacion,
      estado: "Terminada"
    }
    this.props.updateBath(this.props.id, data, this.props.history);
  }
  
  render() {
    const { classes } = this.props;
    const bath = this.state.own;
    let terminada = false;

    if(bath.estado==="Terminada") {
      terminada = true;
    }

    function createData(nombre, estado) {
      let e = "Por llenar";
      let a = true;
      if (estado!=="") {
        e = "Completado";
        a = false;
      }
      return { nombre, e, a };
    }
    
    const rows = [
      createData('N1_P1_E13', bath.N1_P1_E13),
      createData('N2_P1_E12', bath.N2_P1_E12),
      createData('ENF_P1_E10', bath.ENF_P1_E10),
      createData('N3_P1_E10', bath.N3_P1_E10),
      createData('N4_P1_E10', bath.N4_P1_E10),
      createData('N5_P1_E9', bath.N5_P1_E9),
      createData('N6_P1_E6', bath.N6_P1_E6),
      createData('N7_P1_E6', bath.N7_P1_E6),
      createData('N8_P1_E3', bath.N8_P1_E3),
      createData('N9_P1_E3', bath.N9_P1_E3),
      createData('N10_P1_E4', bath.N10_P1_E4),
      createData('N11_P1_E23', bath.N11_P1_E23),
      createData('N12_P1_E21', bath.N12_P1_E21),
      createData('N13_P1_E21', bath.N13_P1_E21),
      createData('N14_P1_E19', bath.N14_P1_E19),
      createData('N15_P1_E17', bath.N15_P1_E17),
      createData('N16_P1_E17', bath.N16_P1_E17),
      createData('N17_P1_E17', bath.N17_P1_E17),
      createData('N18_P1_E17', bath.N18_P1_E17),
      createData('N19_P2_E15', bath.N19_P2_E15),
      createData('CAM1_P2_E16', bath.CAM1_P2_E16),
      createData('CAM2_P2_E15', bath.CAM2_P2_E15),
      createData('N20_P2_E15', bath.N20_P2_E15),
      createData('N21_P2_E14', bath.N21_P2_E14),
      createData('N22_P2_E13', bath.N22_P2_E13),
      createData('N23_P2_E14', bath.N23_P2_E14),
      createData('N24_P2_E11', bath.N24_P2_E11),
      createData('N25_P2_E10', bath.N25_P2_E10),
      createData('N26_P2_E9', bath.N26_P2_E9),
    ];

return (
  <div> {terminada ? <Typography style={{color:"#F59C00"}} variant="h4">Esta rutina ya no se puede modificar</Typography>
      :<Card container className={classes.root} variant="outlined">
          <Link to="/baths" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Regresar
          </Link>
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom>Diligenciar formularios :</Typography>
              <br/>
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Identificador</TableCell>
                      <TableCell align="right">Estado</TableCell>
                      <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                    <TableRow key={row.nombre}>
                      <TableCell component="th" scope="row">
                        {row.nombre}
                      </TableCell>
                      <TableCell align="right">{row.e}</TableCell>
                      <TableCell align="right">{row.a ? <Button style={{backgroundColor:"#F59C00"}} size="small" variant="contained" onClick={this.onClick(`${row.nombre}`)}> Llenar </Button> 
                                                      : null }</TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TextField id="observacion" label="Observaciones"
                              defaultValue={this.state.observacion}
                              onChange={this.handleChange('observacion')}
                              margin="normal"
                              variant="standard"
                              size="medium"
                              multiline={true}
                              style={{
                                width: "100%"
                              }}>
                              </TextField>
              <Button variant="contained" style={{backgroundColor:"#F59C00"}} onClick={this.onSubmit}> Terminar Rutina </Button>
          </CardContent>
          <br/>
      </Card>}
  </div>
    );
  }
}

UpdateBath.propTypes = {
    getUsers: PropTypes.func.isRequired,
    updateBath: PropTypes.func.isRequired,
    getBaths: PropTypes.func.isRequired,
    baths: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  console.log(state)
  console.log(ownProps)
  return {
      id,
      baths: state.baths
  }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getUsers, getBaths, updateBath }
)(UpdateBath));