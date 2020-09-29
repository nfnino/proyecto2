import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CardContent, Card, Grid, Button, Typography } from "@material-ui/core";

class AssetImage extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    continue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = (e) => {
        this.props.prevStep();
    }
    
    render () {
        
        const { errors } = this.props;
        const { values, fileChange } = this.props;
        
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Card>
                        <CardContent align="center">
                        <Typography variant="h4" color="primary" align="center" gutterBottom>Creación Activo </Typography>
                            <Typography variant="h5" color="primary"> Paso 2:</Typography>
                            <Typography variant="h6" color="textPrimary" gutterBottom>Cargar imagen del activo</Typography>
                            <br/>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                <div className="custom-file mb-4">
                                    <input type="file" className="custom-file-input" id="customFile" onChange={fileChange}/>
                                    <label className="custom-file-label" htmlFor="customFile">
                                        {values.filename}
                                    </label>
                                    <span className="red-text">{errors.imagen}</span>
                                </div>
                                </Grid>
                            </Grid>
                            <Button variant="contained" onClick={this.back} color="secondary">Anterior</Button>
                            <Button variant="contained" onClick={this.continue} color="primary">Siguiente</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
        /*
            <Fragment>
                <form onSubmit={this.onSubmit} encType="multipart/form-data"> 
                    <div className="custom-file mb-4">
                        <input type="file" className="custom-file-input" id="customFile" onChange={this.onChange}/>
                        <label className="custom-file-label" htmlFor="customFile">
                            {this.state.filename}
                        </label>
                    </div>
                    <input type="submit" value="Upload" className="btn btn-primaty btn-block mt-4"/>
                </form>
                {this.state.uploadedFile? <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <h3 className="text-center">{ this.state.uploadedFile.filename}</h3>
                        <img src={this.state.uploadedFile.filepath} alt=""></img>
                    </div>
                </div> : null}
            </Fragment>
        */
    }
}

AssetImage.propTypes = {
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return{
        id: state.id,
        errors: state.errors,
    }
};

export default connect(
    mapStateToProps,
    {  }
)(AssetImage);