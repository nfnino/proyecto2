import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { updateImage } from "../../../actions/taskActions";
import { Card, CardContent, Typography, Button, Grid } from "@material-ui/core";

class TaskImage2 extends Component {

    continue = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('activo', this.props.values.activo)
        formData.append('file', this.props.values.file)
        formData.append('file2', this.props.values.file2)
        this.props.updateImage(this.props.values.id, this.props.values.date, formData) 
        this.props.nextStep();
        this.props.history("/dashboard")
    }

    back = (e) => {
        this.props.prevStep();
    }

    render () {
        const { values, handleChange } = this.props;

        let filled = false;
        if(values.file2!==""){
            filled = true;
        }

        return (
            <Fragment>
                <Card variant="elevation">
                    <CardContent>
                        <Typography variant="h4" color="primary" align="center" gutterBottom>Desarrollo Tarea Mantenimiento </Typography>
                        <Typography variant="h5" color="primary"> Paso 3: </Typography>
                        <Typography variant="h6" color="textPrimary" gutterBottom>Cargar imagen del activo posterior a la realización de la tarea.</Typography>
                        
                        <br/>
                        <form encType="multipart/form-data"> 
                            <div className="custom-file mb-4">
                                <input type="file" className="custom-file-input" id="customFile" onChange={handleChange('2')}/>
                                <label className="custom-file-label" htmlFor="customFile">
                                    {values.filename2}
                                </label>
                            </div>
                        </form>
                        <Grid container>
                                <Grid item xs={2}>
                                    <Button variant="contained" onClick={this.back} color="secondary" >Atrás</Button>
                                </Grid>
                                <Grid item xs={2}>
                                    {filled ? <Button variant="contained" onClick={this.continue} color="primary" >Finalizar</Button>
                                    : <Button variant="contained" onClick={this.continue} color="primary" disabled={true}>Finalizar</Button>}
                                </Grid>
                            </Grid>
                            <br/>
                        <Typography variant="overline" color="error" gutterBottom>Al continuar, usted afirma que se ha completado la tarea de mantenimiento exitosamente.</Typography>
                    </CardContent>
                </Card>
            </Fragment>
        )
    }
}

TaskImage2.propTypes = {
    updateImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return{
    }
};

export default connect(
    mapStateToProps,
    { updateImage }
)(TaskImage2);