import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { darBajaAsset } from "../../actions/assetActions";

import { Card, CardContent, Typography } from "@material-ui/core";

import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
      maxWidth: 800,
    },
    pos: {
      left: "40%",
      marginBottom: 12,
      width: 150,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
  });

class AssetDelete extends Component {

    constructor(ownProps) {
        super(ownProps);
        this.state = {
          id: ownProps.asset._id, 
          recinto: ownProps.asset.recinto,
          ubicacion: ownProps.asset.ubicacion,
          categoria: ownProps.asset.categoria,
          nombre: ownProps.asset.nombre,
          valor: ownProps.asset.valor,
          estado: ownProps.asset.estado,
          observacion: ownProps.asset.observacion,
          imagen: ownProps.asset.imagen,

          soporte_delete: '',
          filename: 'Cargar documento',
          uploadedFile: {},

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
        this.setState({soporte_delete: e.target.files[0]});
        this.setState({filename: e.target.files[0].name})
    }

    onSubmit = async e => {
        e.preventDefault();

        const { history } = this.props;

        const id = this.state.id
        
        const formData = new FormData();
        formData.append('file', this.state.soporte_delete)

        this.props.darBajaAsset(id, formData, history)
        history.push("/assets");
    }

    render() {
        
        let paraBorrar = true;

        if(this.state.estado==="De baja") {
            paraBorrar = false;
        } 

        const borrar = 
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

        const whoops =
        <Card>
            <Link to="/assets" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Activos
            </Link>
            <CardContent align="center">
                <Typography variant="h1" gutterBottom>Oops!!</Typography>
                <Typography variant="h4" gutterBottom>Parece que este activo ya se ha eliminado</Typography>
            </CardContent>
        </Card>

    return (
        <div>
            {paraBorrar ? borrar : whoops}
        </div>
      );
    }
}

AssetDelete.propTypes = {
    darBajaAsset: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps)
    let id = ownProps.match.params.id;
    return {
        asset: state.assets.assets.data.find(asset => asset._id === id)
    }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { darBajaAsset }
)(AssetDelete));