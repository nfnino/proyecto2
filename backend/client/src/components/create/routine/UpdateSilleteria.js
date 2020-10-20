import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUsers } from "../../../actions/userActions";
import { getSilleteria, updateSilleteria } from "../../../actions/routines/silleteriaActions";

import { Grid, Table, TableContainer, TableCell, Typography, Paper, TableHead, TableRow, TableBody, Button, TextField} from "@material-ui/core";
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

class UpdateSilleteria extends Component {

  constructor(ownProps) {
    super(ownProps);
    console.log(ownProps)
    this.state = {
      own: ownProps.silleterias.silleterias.data.find(silleteria => silleteria._id === ownProps.id),
      tribuna_norte: 0,
      tribuna_sur: 0,
      suites_vip: 0,
      boxes: 0,
      platea: 0,
    };
  }

  componentDidMount() {
    this.props.getSilleteria();
  }

  onClick = nombre => e => {
    e.preventDefault();
    const rutina = this.state.own._id;
    this.props.history.push(`/newPiso/${rutina}/${nombre}`)
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
        tribuna_norte: this.state.tribuna_norte,
        tribuna_sur: this.state.tribuna_sur,
        suites_vip: this.state.suites_vip,
        boxes: this.state.boxes,
        platea: this.state.platea,
        estado: "Terminada"
    }
    this.props.updateSilleteria(this.props.id, data, this.props.history);
  }
  
  render() {
    const { classes } = this.props;
    const silleteria = this.state.own;
    let terminada = false;

    if(silleteria.estado==="Terminada") {
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
      createData('piso_2', silleteria.piso_2),
      createData('piso_3', silleteria.piso_3),
    ];

return (
  <div> {terminada ? <Typography style={{color:"#F59C00"}} variant="h4">Esta rutina ya no se puede modificar</Typography>
      :<Card container className={classes.root} variant="outlined">
          <Link to="/silleterias" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Regresar
          </Link>
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom>Diligenciar formularios :</Typography>
              <br/>
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Pisos</TableCell>
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
              <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Silletería Platea"
                      defaultValue={2278}
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
                    <TextField id="platea" label="Sillas No Disponibles en Platea"
                        defaultValue={this.state.platea}
                        onChange={this.handleChange('platea')}
                        margin="normal"
                        variant="standard"
                        size="medium"
                        multiline={true}
                        style={{
                        width: "100%"
                        }}>
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Silletería Tribuna Norte"
                      defaultValue={118}
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
                    <TextField id="tribuna_norte" label="No Disponibles Tribunas Fan Norte"
                        defaultValue={this.state.tribuna_norte}
                        onChange={this.handleChange('tribuna_norte')}
                        margin="normal"
                        variant="standard"
                        size="medium"
                        multiline={true}
                        style={{
                        width: "100%"
                        }}>
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Silletería Tribuna Sur"
                      defaultValue={124}
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
                    <TextField id="tribuna_sur" label="No Disponibles Tribunas Fan Sur"
                        defaultValue={this.state.tribuna_sur}
                        onChange={this.handleChange('tribuna_sur')}
                        margin="normal"
                        variant="standard"
                        size="medium"
                        multiline={true}
                        style={{
                        width: "100%"
                        }}>
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Silletería Suites VIP"
                      defaultValue={417}
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
                    <TextField id="suites_vip" label="No Disponibles Suites V.I.P"
                        defaultValue={this.state.suites_vip}
                        onChange={this.handleChange('suites_vip')}
                        margin="normal"
                        variant="standard"
                        size="medium"
                        multiline={true}
                        style={{
                        width: "100%"
                        }}>
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Silletería Boxes"
                      defaultValue={207}
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
                    <TextField id="boxes" label="No disponibles Boxes"
                        defaultValue={this.state.boxes}
                        onChange={this.handleChange('boxes')}
                        margin="normal"
                        variant="standard"
                        size="medium"
                        multiline={true}
                        style={{
                        width: "100%"
                        }}>
                    </TextField>
                  </Grid>
              </Grid>
              <Button variant="contained" style={{backgroundColor:"#F59C00"}} onClick={this.onSubmit}> Terminar Rutina </Button>
          </CardContent>
          <br/>
      </Card>}
  </div>
    );
  }
}

UpdateSilleteria.propTypes = {
    getUsers: PropTypes.func.isRequired,
    updateSilleteria: PropTypes.func.isRequired,
    getSilleteria: PropTypes.func.isRequired,
    silleterias: PropTypes.func.isRequired,
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
      silleterias: state.silleterias
  }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getUsers, getSilleteria, updateSilleteria }
)(UpdateSilleteria));