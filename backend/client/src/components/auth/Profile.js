import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changePassword } from "../../actions/authActions";

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { Grid, Button, ListItem, List, ListItemText } from '@material-ui/core';
import { withRouter } from "react-router-dom";

const useStyles = theme => ({
    root: {
      minWidth: 200,
      maxWidth: 500
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 18,
    },
    pos: {
      marginBottom: 12,
    },
  });

class Profile extends Component {

    constructor (){
        super();
        this.state = {
            id: "",
            oldPass: "",
            newPass: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) { 
            this.setState({
              errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const profileData = {
            id: this.props.auth.user.id,
            oldPass: this.state.oldPass,
            newPass: this.state.newPass
        };
        this.props.changePassword(profileData, this.props.history)
    }

    render() {

        const { classes } = this.props;
        const { errors } = this.props;

        console.log("props",this.props)

        const profile = this.props.auth.user

        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                        <Grid item xs={12}>
                            <Card className={classes.root} variant="elevation">
                                <CardContent>
                                    <Grid container justify="center" spacing={0}>
                                        <Grid item xs={12}>
                                            <Typography classname={classes.title} component="h5" variant="h5" color="primary" gutterBottom> Información Personal:</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                        <List>
                                            <ListItem>
                                                <ListItemText primary="Nombre:" secondary={profile.name}></ListItemText>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Rol:" secondary={profile.role}></ListItemText>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Documento:" secondary={profile.documento}></ListItemText>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Email:" secondary={profile.email}></ListItemText>
                                            </ListItem>
                                        </List>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card className={classes.root} variant="elevation">
                                <CardContent>
                                    <Typography classname={classes.title} component="h5" variant="h5" color="primary" gutterBottom>Cambiar Contraseña:</Typography>
                                    <Typography variant="subtitle2" color="#00FFFF" gutterBottom>*La contraseña debe ser mínimo de 8 caracteres y debe contener al menos un número, una mayúscula y un símbolo*</Typography>
                                    <br/>
                                    <form className={classes.root} noValidate autoComplete="off">
                                        <Grid container spacing={1}>
                                            <Grid item xs={4}>
                                                <TextField
                                                    id="oldPass"
                                                    label="Contraseña"
                                                    type="password"
                                                    value={this.state.oldPass}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    variant="outlined"
                                                    onChange={this.onChange}
                                                    />
                                                <span className="red-text">{errors.oldPass}</span>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField
                                                    id="newPass"
                                                    label="Nueva contraseña"
                                                    type="Password"
                                                    value={this.state.newPass}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    variant="outlined"
                                                    onChange={this.onChange}
                                                    />
                                                <span className="red-text">{errors.newPass}</span>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={this.onSubmit}>Actualizar</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
           /*  <div>
                <div className="row"> 
                    <div className="col s12 center-align">
                        <h5>
                            <b>Perfil</b>
                        </h5>
                        <br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        Nombre: <input type="text" readOnly value={profile.name} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        Rol: <input type="text" readOnly value={profile.role} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        Documento: <input type="text" readOnly value={profile.documento} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        Email: <input type="text" readOnly value={profile.email} />
                    </div>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="row">
                        <br/>
                        <h5><b>Cambiar Contraseña</b></h5>
                        <br/>
                        <div className="input-field col s6">
                            <input
                                required
                                onChange={this.onChange}
                                value={this.state.oldPass}
                                error={errors.oldPass}
                                id="oldPass"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.oldPass || errors.passwordIncorrect
                                })}
                            />
                            <label htmlFor="password">Contraseña:</label>
                            <span className="red-text">{errors.oldPass || errors.passwordIncorrect}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6  ">
                            <input
                                required
                                onChange={this.onChange}
                                value={this.state.newPass}
                                error={errors.newPass}
                                id="newPass"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.newPass || errors.passwodIncorrect
                                })}
                            />
                            <label htmlFor="password">Nueva contraseña:</label>
                            <span className="red-text">{errors.newPass}</span>
                        </div>
                    </div>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                    Cambiar
                    </button>
                    <br/>
                    </div>
                </form>
        </div> */
        )
    }
}

Profile.propTypes = {
    changePassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { changePassword }
)(withRouter(Profile)));