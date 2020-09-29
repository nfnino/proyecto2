import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUsers } from "../../../actions/userActions";
import { getvips, updatevip } from "../../../actions/routines/vipActions";

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

class Updatevip extends Component {

  constructor(ownProps) {
    super(ownProps);
    console.log(ownProps)
    this.state = {
      own: ownProps.vips.vips.data.find(vip => vip._id === ownProps.id),
    };
  }

  componentDidMount() {
    this.props.getvips();
  }

  onClick = nombre => e => {
    e.preventDefault();
    const rutina = this.state.own._id;
    this.props.history.push(`/newSuite/${rutina}/${nombre}`)
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
    this.props.updatevip(this.props.id, data, this.props.history);
  }
  
  render() {
    const { classes } = this.props;
    const vip = this.state.own;
    let terminada = false;

    if(vip.estado==="Terminada") {
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
      createData('s101', vip.s101),
      createData('s102', vip.s102),
      createData('s103', vip.s103),
      createData('s104', vip.s104),
      createData('s105', vip.s105),
      createData('s106', vip.s106),
      createData('s107', vip.s107),
      createData('s108', vip.s108),
      createData('s109', vip.s109),
      createData('s110', vip.s110),
      createData('s111', vip.s111),
      createData('s112', vip.s112),
      createData('s113', vip.s113),
      createData('s114', vip.s114),
      createData('s115', vip.s115),
      createData('s116', vip.s116),
      createData('s117', vip.s117),
      createData('s118', vip.s118),
      createData('s119', vip.s119),
      createData('s120', vip.s120),
      createData('s_party', vip.s_party),
      createData('tribuna_norte', vip.tribuna_norte),
      createData('tribuna_sur', vip.tribuna_sur),
      createData('platea', vip.platea),
      createData('graderia_piso2', vip.graderia_piso2),
      createData('graderia_piso3', vip.graderia_piso3),
      createData('box1', vip.box1),
      createData('box2', vip.box2),
      createData('box3', vip.box3),
      createData('box4', vip.box4),
      createData('box5', vip.box5),
      createData('box6', vip.box6),
      createData('box7', vip.box7),
      createData('box8', vip.box8),
      createData('box9', vip.box9),
      createData('box10', vip.box10),
      createData('box11', vip.box11),
      createData('box12', vip.box12),
      createData('box13', vip.box13),
      createData('box14', vip.box14),
      createData('box15', vip.box15),
      createData('box16', vip.box16),
      createData('box17', vip.box17),
      createData('box18', vip.box18),
      
    ];

return (
  <div> {terminada ? <Typography style={{color:"#F59C00"}} variant="h4">Esta rutina ya no se puede modificar</Typography>
      :<Card container className={classes.root} variant="outlined">
          <Link to="/vips" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Regresar
          </Link>
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom>Diligenciar formularios :</Typography>
              <br/>
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Suites</TableCell>
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

Updatevip.propTypes = {
    getUsers: PropTypes.func.isRequired,
    updatevip: PropTypes.func.isRequired,
    getvips: PropTypes.func.isRequired,
    vips: PropTypes.func.isRequired,
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
      vips: state.vips
  }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getUsers, getvips, updatevip }
)(Updatevip));