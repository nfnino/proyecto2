import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUsers } from "../../../actions/userActions";
import { getLocales, updateLocal } from "../../../actions/routines/localActions";

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

class UpdateLocal extends Component {

  constructor(ownProps) {
    super(ownProps);
    console.log(ownProps)
    this.state = {
      own: ownProps.locals.locals.data.find(local => local._id === ownProps.id)
    };
  }

  componentDidMount() {
    this.props.getLocales();
  }

  onClick = nombre => e => {
    e.preventDefault();
    const rutina = this.state.own._id;
    this.props.history.push(`/newDetLocal/${rutina}/${nombre}`)
  }

  onSubmit = e => {
    e.preventDefault();
    const data = {
      estado: "Terminada"
    }
    this.props.updateLocal(this.props.id, data, this.props.history);
  }
  
  render() {
    const { classes } = this.props;
    const local = this.state.own;
    let terminada = false;

    if(local.estado==="Terminada") {
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
        createData('ab101', local.ab101),
        createData('ab102', local.ab102),
        createData('ab103', local.ab103),
        createData('ab104', local.ab104),
        createData('ab201', local.ab201),
        createData('ab202', local.ab202),
        createData('ab203', local.ab203),
        createData('ab204', local.ab204),
        createData('ab301', local.ab301),
        createData('ab302', local.ab302),
        createData('ab303', local.ab303),
        createData('ab304', local.ab304),
        createData('indigo_norte', local.indigo_norte),
        createData('indigo_sur', local.indigo_sur),
        createData('crepes', local.crepes),
        createData('tostao_101', local.tostao_101),
        createData('homeburger_102', local.homeburger_102),
        createData('buffalowings_103', local.buffalowings_103),
        createData('local_104', local.local_104),
        createData('tuboleta', local.tuboleta),
        createData('exp_1', local.exp_1),
        createData('exp_2', local.exp_2),
        createData('exp_3', local.exp_3),
        createData('exp_4', local.exp_4),
        createData('exp_5', local.exp_5),
        createData('exp_6', local.exp_6),
        createData('exp_7', local.exp_7),
        createData('exp_8', local.exp_8),
        createData('exp_9', local.exp_9),
        createData('exp_10', local.exp_10),
        createData('exp_11', local.exp_11),
        createData('exp_12', local.exp_12),
        createData('exp_13', local.exp_13),
    ];

return (
  <div> {terminada ? <Typography color="primary" variant="h4">Esta rutina ya no se puede modificar</Typography>
      :<Card container className={classes.root} variant="outlined">
          <Link to="/locales" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Regresar
          </Link>
          <CardContent align="center">
              <Typography variant="h4" color="primary" gutterBottom>Diligenciar formularios :</Typography>
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
                      <TableCell align="right">{row.a ? <Button color="primary" size="small" variant="contained" onClick={this.onClick(`${row.nombre}`)}> Llenar </Button> 
                                                      : null }</TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <br/>
              <Button variant="contained" color="primary" onClick={this.onSubmit}> Terminar Rutina </Button>
          </CardContent>
          <br/>
      </Card>}
  </div>
    );
  }
}

UpdateLocal.propTypes = {
    getUsers: PropTypes.func.isRequired,
    updateLocal: PropTypes.func.isRequired,
    getLocales: PropTypes.func.isRequired,
    locals: PropTypes.object.isRequired,
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
      locals: state.locals
  }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getUsers, getLocales, updateLocal }
)(UpdateLocal));