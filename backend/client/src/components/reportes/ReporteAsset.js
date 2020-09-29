import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import MaterialTable from 'material-table';
import { Grid, Card, CardContent } from "@material-ui/core";

class ReportAsset extends Component {
    
    constructor(props){
        super(props);

        this.state={
            columns: [
                {title: 'Nombre', field: 'nombre'},
                {title: 'Categoría', field: 'categoria'},
                {title: 'Área', field: 'area'},
                {title: 'Ubicación', field: 'ubicacion'},
                {title: 'Fecha Compra', field: 'fecha_compra'},
                {title: 'Valor', field: 'valor'},
                {title: 'Dias Final Garantía', field: 'dias_garantia'},
                {title: 'Fin Garantía', field: 'fecha_fin_garantia'},
                {title: 'Frecuencia Mantenimiento', field: 'dias_frec_mant_preventivo'},
                {title: 'Observaciones', field: 'observacion'},
                {title: 'Tareas activas', field: 'tareas_activas'},
                {title: 'Reemplazo del Activo', field: 'activo_reemp'},
                {title: 'Estado', field: 'estado'}
            ],
            data: props.assets.assets.data,
        };
    }

    render() {
        const res = this.props.assets.assets;
        const assets = res.data;
        
        const assetItems = [];

        function createData(id, nombre, categoria, area, estado, ubicacion, fecha_compra, valor, dias_garantia,
            fecha_fin_garantia ,dias_frec_mant_preventivo, observacion, tareas_activas, activo_reemp) {
            let array = {"nombre": nombre,
                        "categoria": categoria, 
                        "area": area, 
                        "ubicacion": ubicacion,
                        "fecha_compra": fecha_compra, 
                        "valor": valor, 
                        "dias_garantia": dias_garantia,
                        "fecha_fin_garantia": fecha_fin_garantia,
                        "dias_frec_mant_preventivo": dias_frec_mant_preventivo, 
                        "observacion": observacion, 
                        "tareas_activas": tareas_activas,
                        "activo_reemp": activo_reemp,
                        "estado": estado,
                        "id": id
                    }
            assetItems.push(array)
        }

        assets.forEach(element => {
            createData(element._id, element.nombre, element.categoria, element.area, element.estado, element.ubicacion,
                element.fecha_compra, element.valor, element.dias_garantia, element.fecha_fin_garantia, element.dias_frec_mant_preventivo,
                element.observacion, element.tareas_activas, element.activo_reemp)
        });

        return (
            <div style={{maxWidth:"1000px"}}>
            <Grid container>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <MaterialTable
                            title="Activos"
                            columns={this.state.columns}
                            data={assetItems}
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

ReportAsset.propTypes = {
    assets: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return{
        assets: state.assets,
        auth: state.auth
    }
  };

export default connect(
    mapStateToProps,
    { }
)(withRouter(ReportAsset));