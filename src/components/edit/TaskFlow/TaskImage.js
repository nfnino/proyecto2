import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Card, CardContent, Typography, Button } from "@material-ui/core";

class TaskImage extends Component {

    continue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = (e) => {
        this.props.prevStep();
    }

    render () {
        const { values, handleChange } = this.props;

        let filled = false;
        if(values.file!==""){
            filled = true;
        }

        return (
            <Fragment>
                <Card variant="elevation">
                    <CardContent>
                        <Typography variant="h4" color="primary" align="center" gutterBottom>Desarrollo Tarea Mantenimiento </Typography>
                        <Typography variant="h5" color="primary"> Paso 1:</Typography>
                        <Typography variant="h6" color="textPrimary" gutterBottom>Cargar la imagen del activo previo a la realización de la tarea de mantenimiento.</Typography>
                        <br/>
                        <form encType="multipart/form-data"> 
                            <div className="custom-file mb-4">
                                <input type="file" className="custom-file-input" id="customFile" onChange={handleChange('')}/>
                                <label className="custom-file-label" htmlFor="customFile">
                                    {values.filename}
                                </label>
                            </div>
                            {filled ? <Button variant="contained" onClick={this.continue} color="primary">Siguiente</Button>
                            : <Button variant="contained" onClick={this.continue} color="primary" disabled={true} >Siguiente</Button>}
                            
                        </form>
                        {values.uploadedFile? <div className="row mt-5">
                            <div className="col-md-6 m-auto">
                                <h3 className="text-center">{ values.uploadedFile.filename}</h3>
                                <img src={values.uploadedFile.filepath} alt=""></img>
                            </div>
                        </div> : null}
                    </CardContent>
                </Card>
            </Fragment>
        )
    }
}

TaskImage.propTypes = {
};

const mapStateToProps = (state) => {
    return{
        /* id: state.id */
    }
};

export default connect(
    mapStateToProps,
    { }
)(TaskImage);