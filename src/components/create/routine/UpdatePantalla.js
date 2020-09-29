import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUsers } from "../../../actions/userActions";
import { getPantallas, updatePantalla } from "../../../actions/routines/pantallaActions";

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

class UpdatePantalla extends Component {

  constructor(ownProps) {
    super(ownProps);
    console.log(ownProps)
    this.state = {
      own: ownProps.pantallas.pantallas.data.find(pantalla => pantalla._id === ownProps.id),
      observacion: "",
    };
  }

  componentDidMount() {
    this.props.getPantallas();
  }

  onClick = nombre => e => {
    e.preventDefault();
    const rutina = this.state.own._id;
    this.props.history.push(`/newDetPantalla/${rutina}/${nombre}`)
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
    this.props.updatePantalla(this.props.id, data, this.props.history);
  }
  
  render() {
    const { classes } = this.props;
    const pantalla = this.state.own;
    let terminada = false;

    if(pantalla.estado==="Terminada") {
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
      createData('tablero_principal', pantalla.tablero_principal),
      createData('tablero_1', pantalla.tablero_1),
      createData('tablero_2', pantalla.tablero_2),
      createData('tablero_3', pantalla.tablero_3),
      createData('tablero_4', pantalla.tablero_4),
      createData('tablero_5', pantalla.tablero_5),
      createData('tablero_6', pantalla.tablero_6),
      createData('tablero_7', pantalla.tablero_7)
    ];

return (
  <div> {terminada ? <Typography style={{color:"#F59C00"}} variant="h4">Esta rutina ya no se puede modificar</Typography>
      :<Card container className={classes.root} variant="outlined">
          <Link to="/pantallas" className="btn-flat waves-effect">
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

UpdatePantalla.propTypes = {
    getUsers: PropTypes.func.isRequired,
    updatePantalla: PropTypes.func.isRequired,
    getPantallas: PropTypes.func.isRequired,
    pantallas: PropTypes.func.isRequired,
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
      pantallas: state.pantallas
  }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getUsers, getPantallas, updatePantalla }
)(UpdatePantalla));