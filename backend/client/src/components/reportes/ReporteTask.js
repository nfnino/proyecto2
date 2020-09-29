import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import MaterialTable from 'material-table';
import { Grid, Card, CardContent } from "@material-ui/core";

class ReportTask extends Component {
    
    constructor(props){
        super(props);

        this.state={
            columns: [
                {title: 'Activo', field: 'activo'},
                {title: 'Tipo Mantenimiento', field: 'tipo_mant'},
                {title: 'Fecha Inicio', field: 'fecha_inicial_real'},
                {title: 'Fecha Fin', field: 'fecha_final_real'},
                {title: 'Descripción', field: 'desc_falla'},
                {title: 'Compras', field: 'email_compras'},
                {title: 'Materiales Compras', field: 'desc_materiales_compras'},
                {title: 'Ejecutor', field: 'ejecutor_interno'},
                {title: 'Supervisor', field: 'supervisor'},
                {title: 'NIT Empresa', field: 'nit_empresa_externa'},
                {title: 'Nombre empresa', field: 'nom_empresa_externa'},
                {title: 'Valor', field: 'valor_externo'},
                {title: 'Estado', field: 'estado'}
            ],
            data: props.tasks.tasks.data,
        };
    }

    render() {
        const res = this.props.tasks.tasks;
        const tasks = res.data;
        
        const taskItems = [];

        function createData(id, activo, tipo_mant, fecha_inicial_real, estado, fecha_final_real, desc_falla, email_compras, desc_materiales_compras,
            ejecutor_interno ,supervisor, nit_empresa_externa, nom_empresa_externa, valor_externo) {
            let array = {"activo": activo,
                        "tipo_mant": tipo_mant, 
                        "fecha_inicial_real": fecha_inicial_real, 
                        "fecha_final_real": fecha_final_real,
                        "desc_falla": desc_falla, 
                        "email_compras": email_compras, 
                        "desc_materiales-compras": desc_materiales_compras,
                        "ejecutor_interno": ejecutor_interno,
                        "supervisor": supervisor, 
                        "nit_empresa_externa": nit_empresa_externa, 
                        "nom_empresa_externa": nom_empresa_externa,
                        "valor_externo": valor_externo,
                        "estado": estado,
                        "id": id
                    }
            taskItems.push(array)
        }

        tasks.forEach(element => {
            createData(element._id, element.activo, element.tipo_mant, element.fecha_inicial_real, element.estado, element.fecha_final_real,
                element.desc_falla, element.email_compras, element.desc_materiales_compras, element.ejecutor_interno, element.supervisor,
                element.nit_empresa_externa, element.nom_empresa_externa, element.valor_externo)
        });

        return (
            <div style={{maxWidth:"1000px"}}>
            <Grid container>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <MaterialTable
                            title="Tareas"
                            columns={this.state.columns}
                            data={taskItems}
                            options={{
                                exportButton:true,
                                headerStyle: {
                                    color: '#00A9E0',
                                    fontSize: 14
                                },
                                pageSize:5,
                                exportAllData: true
                            }}
                            >
                            </MaterialTable>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            </div>
        );
            }
}

ReportTask.propTypes = {
    tasks: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return{
        tasks: state.tasks,
        auth: state.auth
    }
  };

export default connect(
    mapStateToProps,
    { }
)(withRouter(ReportTask));