import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUsers } from "../../../actions/userActions";
import { getrcis, updaterci } from "../../../actions/routines/rciActions";

import { Table, TableContainer, TableCell, Typography, Paper, TableHead, TableRow, TableBody, Button} from "@material-ui/core";
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

class Updaterci extends Component {

  constructor(ownProps) {
    super(ownProps);
    console.log(ownProps)
    this.state = {
      own: ownProps.rcis.rcis.data.find(rci => rci._id === ownProps.id),
    };
  }

  componentDidMount() {
    this.props.getrcis();
  }

  onClick = nombre => e => {
    e.preventDefault();
    const rutina = this.state.own._id;
    this.props.history.push(`/newGabinete/${rutina}/${nombre}`)
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
      estado: "Terminada"
    }
    this.props.updaterci(this.props.id, data, this.props.history);
  }
  
  render() {
    const { classes } = this.props;
    const rci = this.state.own;
    let terminada = false;

    if(rci.estado==="Terminada") {
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
      createData('g1', rci.g1),
      createData('g2', rci.g2),
      createData('g3', rci.g3),
      createData('g4', rci.g4),
      createData('g5', rci.g5),
      createData('g6', rci.g6),
      createData('g7', rci.g7),
      createData('g8', rci.g8),
      createData('g9', rci.g9),
      createData('g10', rci.g10),
      createData('g11', rci.g11),
      createData('g12', rci.g12),
      createData('g13', rci.g13),
      createData('g14', rci.g14),
      createData('g15', rci.g15),
      createData('g16', rci.g16),
      createData('g17', rci.g17),
      createData('g18', rci.g18),
      createData('g19', rci.g19),
      createData('g20', rci.g20),
      createData('g21', rci.g21),
      createData('g22', rci.g22),
      createData('g23', rci.g23),
      createData('g24', rci.g24),
      createData('g25', rci.g25),
      createData('g26', rci.g26),
      createData('g27', rci.g27),
      createData('g28', rci.g28),
      createData('g29', rci.g29),
      createData('g30', rci.g30),
      createData('g31', rci.g31),
      createData('g32', rci.g32),
      createData('g33', rci.g33),
      createData('g34', rci.g34),
      createData('g35', rci.g35),
      createData('g36', rci.g36),
      createData('g37', rci.g37),
      createData('g38', rci.g38),
      createData('g39', rci.g39),
      createData('g40', rci.g40),
      createData('g41', rci.g41),
      createData('g42', rci.g42),
      createData('g43', rci.g43),
      createData('g44', rci.g44),
      createData('g45', rci.g45),
      createData('g46', rci.g46),
      createData('g47', rci.g47),
      createData('g48', rci.g48),
      createData('g49', rci.g49),
      createData('g50', rci.g50),
      createData('g51', rci.g51),
      createData('g52', rci.g52),
      createData('g53', rci.g53),
      createData('g54', rci.g54),
      createData('g55', rci.g55),
      
      
    ];

return (
  <div> {terminada ? <Typography style={{color:"#F59C00"}} variant="h4">Esta rutina ya no se puede modificar</Typography>
      :<Card container className={classes.root} variant="outlined">
          <Link to="/rcis" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Regresar
          </Link>
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom>Diligenciar formularios :</Typography>
              <br/>
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Gabinetes</TableCell>
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
              <br/>
              <Button variant="contained" style={{backgroundColor:"#F59C00"}} onClick={this.onSubmit}> Terminar Rutina </Button>
          </CardContent>
          <br/>
      </Card>}
  </div>
    );
  }
}

Updaterci.propTypes = {
    getUsers: PropTypes.func.isRequired,
    updaterci: PropTypes.func.isRequired,
    getrcis: PropTypes.func.isRequired,
    rcis: PropTypes.func.isRequired,
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
      rcis: state.rcis
  }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getUsers, getrcis, updaterci }
)(Updaterci));