import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { getUsers } from "../../../actions/userActions";
import { getvips } from "../../../actions/routines/vipActions";

import MaterialTable from 'material-table';
import { CardContent, Grid, Card, Button } from "@material-ui/core";

class vips extends Component {

    constructor(){
        super();

        this.state={
            columns: [
                {title: 'Fecha', field: 'fecha'},
                {title: 'Ejecutor', field: 'ejecutor'},
                {title: 'Estado', field: 'estado'}
            ]
        };
    }

    componentDidMount () {
        this.props.getUsers()
        this.props.getvips()
    }

    onDetailClick = id => {
        const { history } = this.props;
        history.push(`/detallevip/${id}`);
    }

    onUpdateClick = id => {
        const { history } = this.props;
        history.push(`/updatevip/${id}`);
    }

    render() {
        console.log(this.props)
        const res = this.props.vips.vips;
        console.log(res)
        const vips = res.data;
        console.log(vips)

        const routineItems = [];
        
        function createData(id, fecha, ejecutor, estado) {
            let array = {"fecha": new Date(fecha).toLocaleDateString(),
                        "ejecutor": ejecutor, 
                        "estado": estado,
                        "id": id
                    }
            routineItems.push(array)
        }
        
        if(vips!=null) {
            if(vips.length > 0) {
            vips.forEach(element => {
                createData(element._id, element.fecha, element.ejecutor, element.estado)
            });
            }
        }

        return (
            <Grid container spacing={1}>
            <Grid item xs={12}>
            <Card style={{marginTop:-20}}>
              <Button 
                variant="outlined" 
                fullWidth={true}
                style={{height: 170,backgroundSize: "cover", color: "#F59C00", backgroundImage:"url(/fachdia.jpg)", fontSize:48, fontWeight:"bolder"}} 
              > 
                RUTINAS
              </Button>
            </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <br/>
                    <Link to="/routines" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Regresar
                    </Link>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12}>
                                <MaterialTable
                                title=" Rutinas"
                                columns={this.state.columns}
                                data={routineItems}
                                options={{
                                    exportButton:true,
                                    headerStyle: {
                                        color: '#F59C00',
                                        fontSize: 16
                                    },
                                    rowStyle: {
                                        fontSize: 16,
                                    }
                                }}
                                actions={[
                                    {
                                        icon: 'edit',
                                        tooltip: 'Diligenciar rutina',
                                        onClick: (event, rowData) => this.onUpdateClick(rowData.id)
                                    },
                                    {
                                        icon: 'search',
                                        tooltip: 'Detalle rutina',
                                        onClick: (event, rowData) => this.onDetailClick(rowData.id)
                                    }
                                ]}
                                >
                                </MaterialTable>
                            </Grid>
                        </Grid>
                        <br/>
                        <Link to="/newvip" className="btn-flat waves-effect">
                                <i className="material-icons left">add</i> Nueva
                        </Link>
                    </CardContent>
                </Card>
                </Grid>
                </Grid>
        );
    }
}

vips.propTypes = {
    getvips: PropTypes.func.isRequired,
    vips: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    vips: state.vips,
    users: state.users,
    auth: state.auth
  });

export default connect(
    mapStateToProps,
    { getUsers, getvips }
)(withRouter(vips));