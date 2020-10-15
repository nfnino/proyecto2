import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CardContent, Card, Grid, Button, Typography } from "@material-ui/core";

import { getTasks, addTask } from "../../../actions/taskActions";


class TaskDocument extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    continue = (e) => {
        e.preventDefault();
        console.log(this.props.auth)
        const tarea = {
            user_id: this.props.auth.user.id,
            user_name: this.props.auth.user.name,
            activo: this.props.data.activo,
            tipo_mant: this.props.data.tipo_mant,
            fecha_inicial_tent: this.props.data.fecha_inicial_tent,
            fecha_final_tent: this.props.data.fecha_final_tent,
            desc_falla: this.props.data.desc_falla,
            email_compras: this.props.data.email_compras,
            desc_materiales_compras: this.props.data.desc_materiales_compras,
            ejecutor_interno: this.props.data.ejecutor_interno,
            supervisor: this.props.data.supervisor,
            nit_empresa_externa: this.props.data.nit_empresa_externa,
            nombre_empresa_externa: this.props.data.nombre_empresa_externa,
            valor_externo: this.props.data.valor_externo,
            responsable: this.props.data.responsable,
            estado: this.props.data.estado,

        } 
        //adjuntar foto y manual
        try{
            const formData = new FormData();
            formData.append('user_id', tarea.user_id)
            formData.append('user_name', tarea.user_name)
            formData.append('activo', tarea.activo)
            formData.append('tipo_mant', tarea.tipo_mant)
            formData.append('fecha_inicial_tent', tarea.fecha_inicial_tent)
            formData.append('fecha_final_tent', tarea.fecha_final_tent)
            formData.append('desc_falla', tarea.desc_falla)
            formData.append('email_compras', tarea.email_compras)
            formData.append('desc_materiales_compras', tarea.desc_materiales_compras)
            formData.append('ejecutor_interno', tarea.ejecutor_interno)
            formData.append('supervisor', tarea.supervisor)
            formData.append('nit_empresa_externa', tarea.nit_empresa_externa)
            formData.append('nombre_empresa_externa', tarea.nombre_empresa_externa)
            formData.append('valor_externo', tarea.valor_externo)
            formData.append('responsable', tarea.responsable)
            formData.append('estado', tarea.estado)
            formData.append('file', this.props.values.file)
            this.props.addTask(formData, this.props.history);
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
        this.props.getTasks();
    }
    
    render () {

        const { errors } = this.props;
        const { values, fileChange } = this.props;
        
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Card>
                        <CardContent align="center">
                            <Typography variant="h4" color="primary" align="center" gutterBottom>Documento orden de compra </Typography>
                            <Typography variant="h5" color="primary"> Solo para trabajo externo:</Typography>
                            <Typography variant="h6" color="textPrimary" gutterBottom>Cargar documento de la orden de compra para tarea externa</Typography>
                            <br/>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    {<div className="custom-file mb-4">
                                        <input type="file" className="custom-file-input" id="customFile" onChange={fileChange}/>
                                        <label className="custom-file-label" htmlFor="customFile">
                                            {values.filename}
                                        </label>
                                        <span className="red-text">{errors.file}</span>
                                    </div>}
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

TaskDocument.propTypes = {
    getTasks: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired,
    addTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return{
        id: state.id,
        tasks: state.tasks,
        errors: state.errors,
        auth: state.auth,
    }
};

export default connect(
    mapStateToProps,
    { getTasks, addTask }
)(TaskDocument);