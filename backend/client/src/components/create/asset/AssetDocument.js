import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CardContent, Card, Grid, Button, Typography } from "@material-ui/core";

import { getAssets, addAsset } from "../../../actions/assetActions";


class AssetDocument extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    continue = (e) => {
        e.preventDefault();
        //crear activo
        console.log(this.props.auth)
        const activo = {
            user_id: this.props.auth.user.id,
            user_name: this.props.auth.user.name,
            recinto: this.props.data.recinto,
            ubicacion: this.props.data.ubicacion,
            categoria: this.props.data.categoria,
            area: this.props.data.area,
            nombre: this.props.data.nombre,
            fecha_compra: this.props.data.fecha_compra,
            valor: this.props.data.valor,
            dias_garantia: this.props.data.dias_garantia,
            fecha_fin_garantia: this.props.data.fecha_fin_garantia,
            dias_frec_mant_preventivo: this.props.data.dias_frec_mant_preventivo,
            observacion: this.props.data.observacion,
            estado: "Creado",
        } 
        //adjuntar foto y manual
        try{
            const formData = new FormData();
            formData.append('user_id', activo.user_id)
            formData.append('user_name', activo.user_name)
            formData.append('recinto', activo.recinto)
            formData.append('ubicacion', activo.ubicacion)
            formData.append('categoria', activo.categoria)
            formData.append('area', activo.area)
            formData.append('nombre', activo.nombre)
            formData.append('fecha_compra', activo.fecha_compra)
            formData.append('valor', activo.valor)
            formData.append('dias_garantia', activo.dias_garantia)
            formData.append('fecha_fin_garantia', activo.fecha_fin_garantia)
            formData.append('dias_frec_mant_preventivo', activo.dias_frec_mant_preventivo)
            formData.append('observacion', activo.observacion)
            formData.append('file', this.props.values.file)
            formData.append('manual', this.props.values.manual)
            this.props.addAsset(formData, this.props.history);
        }
        catch (err) {
            console.log(err)
            return
        }
        this.props.nextStep()
    }

    back = (e) => {
        this.props.prevStep();
    }

    componentWillMount() {
        this.props.getAssets();
    }
    
    render () {

        const { errors } = this.props;
        const { values, docChange } = this.props;
        
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Card>
                        <CardContent align="center">
                            <Typography variant="h4" color="primary" align="center" gutterBottom>Creación Activo </Typography>
                            <Typography variant="h5" color="primary"> Paso 3:</Typography>
                            <Typography variant="h6" color="textPrimary" gutterBottom>Cargar documento manual del activo.</Typography>
                            <br/>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div className="custom-file mb-4">
                                        <input type="file" className="custom-file-input" id="customFile" onChange={docChange}/>
                                        <label className="custom-file-label" htmlFor="customFile">
                                            {values.manualname}
                                        </label>
                                        <span className="red-text">{errors.manual}</span>
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
    }
}

AssetDocument.propTypes = {
    getAssets: PropTypes.func.isRequired,
    assets: PropTypes.object.isRequired,
    addAsset: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return{
        id: state.id,
        assets: state.assets,
        errors: state.errors,
        auth: state.auth,
    }
};

export default connect(
    mapStateToProps,
    { getAssets, addAsset }
)(AssetDocument);