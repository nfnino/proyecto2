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
import { Grid } from "@material-ui/core";

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

    /* onImageClick = id => {
        const { history } = this.props;
        if(this.props.auth.user.role === "Contador") {
            history.push(`/assetImage/${id}`);
        } else {
            this.handleClickOpen()
            history.push("/assets")
        }
    } */

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


        {/* let assetItems = assets.filter((asset) => {
            if(this.state.search == null)
                return asset
            else if(asset.nombre.toLowerCase().includes(this.state.search.toLowerCase())){
                return asset
            }
        }).map(asset => (
            [
                asset.nombre,
                asset.categoria,
                asset.ubicacion,
                asset.estado
            ]
        )) 
        
        const assetItems = assets.filter((asset) =>{
            if(this.state.search == null)
                return asset
            else if(asset.nombre.toLowerCase().includes(this.state.search.toLowerCase())){
                return asset
            }
        })
        .map(asset => (
            <tr key={asset._id} style={{ marginTop: "1rem" }}>
                <td> <Link to={'/assets/' + asset._id}> {asset.nombre} </Link></td>
                <td> {asset.fecha_fin_garantia} </td>
                <td> {asset.categoria} </td>
                <td> {asset.ubicacion} </td>
                <td> {asset.dias_frec_mant_preventivo} </td>
                <td> {asset.estado} </td>
        <td>
        
        <button
                    style={{ marginRight: "1rem" }}
                    onClick={this.onUpdateClick.bind(this, asset._id)}
                    className="btn btn-small btn-floating waves-effect waves-light hoverable blue accent-3"
                >
                    <i className="material-icons">update</i>
                </button>
                <button
                    style={{ marginRight: "1rem" }}
                    onClick={this.onDeleteClick.bind(this, asset._id)}
                    className="btn btn-small btn-floating waves-effect waves-light hoverable red accent-3">
                    <i className="material-icons">delete</i>
                </button> 
                
                {contador ? <Link to={'/updateAsset/' + asset._id} 
                                className="btn btn-small btn-floating waves-effect waves-light hoverable blue accent-3">
                                <i className="material-icons">update</i>
                            </Link> :
                            <a></a>
                }
                {contador ? <button
                                style={{ marginRight: "1rem" }}
                                onClick={this.onDeleteClick.bind(this, asset._id)}
                                className="btn btn-small btn-floating waves-effect waves-light hoverable red accent-3">
                                <i className="material-icons">delete</i>
                            </button> :
                            <a></a>
                }
                
                </td>
            </tr>
            */}
        //));

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
            <Grid container>
                <Grid item xs={12}>
                <MaterialTable
                  title="Activos"
                  columns={this.state.columns}
                  data={assetItems}
                  options={{
                      exportButton:true,
                      headerStyle: {
                        color: '#00A9E0',
                        fontSize: 16
                    }
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
                    /* {
                        icon: 'add',
                        tooltip: 'Imágenes',
                        onClick: ( event, rowData ) => this.onImageClick(rowData.id)
                    } */
                  ]}
                  >
                </MaterialTable>
                {/* <div className="row s12 center-align">
                    <div className="col s12 ">
                        <h5>
                            <b>Activos</b>
                        </h5>
                        <p className="grey-text text-darken-1">
                            Agregar o modificar activos
                        </p>
                    </div>
                </div>
                <div className="row s12">
                    <div className="col s12 ">
                    <table>
                        <tbody>
                            <tr>
                                <th>Nombre</th>
                                <th>Fin Garantía</th>
                                <th>Categoría</th>
                                <th>Ubicación</th>
                                <th>Frecuencia m/to</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                            <tr>
                                <th><input type="text" placeholder="Buscar por palabra clave" onChange={(e)=>this.searchSpace(e)}/></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                            {assetItems}
                        </tbody>
                    </table>
                    </div>
                </div> */}
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