import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { darBajaAsset, updateAsset } from "../../actions/assetActions";
import { withRouter } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MaterialTable from 'material-table';
import { Grid, Typography } from "@material-ui/core";

class Assets extends Component {
    
    constructor(props){
        super(props);

        this.state={
            columns: [
                {title: 'Nombre', field: 'nombre'},
                {title: 'Categoría', field: 'categoria'},
                {title: 'Área', field: 'area'},
                {title: 'Estado', field: 'estado'}
            ],
            data: props.assets.assets.data,
            setOpen: false,
        };
    }

    onUpdateClick = id => {
        const { history } = this.props;
        if(this.props.auth.user.role === "Contador"){
            history.push(`/updateAsset/${id}`);
        } 
        else {
            this.handleClickOpen()
            history.push("/assets")
        }
    }

    onDetailClick = id => {
        const { history } = this.props;
        history.push(`/assets/${id}`);
    }

    onDeleteClick = id => {
        const { history } = this.props;
        const elRol = this.props.auth.user.role;
        if(elRol === "Contador") {
            history.push(`/req-delete/${id}`)
        }
        if(elRol === "Gerente de área") {
            history.push(`/delete/${id}`);
        }
        if(elRol === ("Superusuario" || "Operario" || "Jefe de área")) {
            this.handleClickOpen()
            history.push("/assets")
        }
    }

    handleClickOpen = () => {
        this.setState({setOpen: true})
    };
    
    handleClose = () => {
        this.setState({setOpen: false})
    };

    clear = (e) => {
        e.preventDefault();
        this.props.clear();
    }

    render() {
        const res = this.props.assets.assets;
        const assets = res.data;
        
        const assetItems = [];

        function createData(id, nombre, categoria, area, estado) {
            let array = {"nombre": nombre,
                        "categoria": categoria, 
                        "area": area, 
                        "estado": estado,
                        "id": id
                    }
            assetItems.push(array)
        }

        assets.forEach(element => {
            createData(element._id, element.nombre, element.categoria, element.area, element.estado)
        });

        return (
            <div>
                <Dialog
                open={this.state.setOpen}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Rol no autorizado..."}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Permisos necesarios no cumplidos para realizar esta acción.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            <Grid container alignItems="center" direction="column" spacing={2}>
                <Grid item xs={12}>
                    <Typography color="primary" variant="h4" align="center">Lista de Activos</Typography>
                    <br/>
                    <MaterialTable
                    style={{width:"100%"}}
                    title="Activos"
                    columns={this.state.columns}
                    data={assetItems}
                    localization={{
                        header: {
                            actions: 'Acciones'
                        },
                        body: {
                            emptyDataSourceMessage: 'No hay registros para mostrar',
                            filterRow: 'Filtrar'
                        },
                        pagination: {
                            labelRowsSelect: 'filas'
                        }
                    }}
                    options={{
                        exportButton:true,
                        search: false,
                        headerStyle: {
                            color: '#00A9E0',
                            fontSize: 16
                        },
                        rowStyle: {
                            fontSize: 16,
                        },
                        filtering: true
                    }}
                    actions={[
                        {
                            icon: 'search',
                            tooltip: 'Detalle Activo',
                            onClick: (event, rowData) => this.onDetailClick(rowData.id)
                        },
                        {
                        icon: 'edit',
                        tooltip: 'Editar Activo',
                        onClick: (event, rowData) => this.onUpdateClick(rowData.id)
                        },
                        {
                        icon: 'delete',
                        tooltip: 'Eliminar Activo',
                        onClick: (event, rowData) => this.onDeleteClick(rowData.id)
                        },
                    ]}
                    >
                    </MaterialTable>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" size="large" onClick={this.clear}>Limpiar</Button>
                </Grid>
            </Grid>
            </div>
        );
            }
}

Assets.propTypes = {
    assets: PropTypes.array.isRequired,
    darBajaAsset: PropTypes.func.isRequired,
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
    { darBajaAsset, updateAsset }
)(withRouter(Assets));