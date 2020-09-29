import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class RoutineDetails extends Component {

    render() {

        let routine = this.props.routine

        routine = this.props.routine ? (
            <div className="routine">

                <Link to="/routines" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Regresar
                </Link>
                <br/>
                <br/>
                <div className="row">
                    <div className="col s5">
                        Fecha: <input type="text" value={routine.fecha} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s5">
                        Recinto: <input type="text" value={routine.recinto} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s5">
                        Ejecutor: <input type="text" value={routine.ejecutor} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s5">
                        Supervisor: <input type="text" value={routine.supervisor} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s5">
                        Espacio VIP: <input type="text" value={routine.espacio_vip} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s5">
                        Espacio Locales: <input type="text" value={routine.espacio_local} />
                    </div>
                    <div className="col s5">
                        Espacio Baños: <input type="text" value={routine.espacio_banio} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s5">
                        Espacio Parque: <input type="text" value={routine.espacio_parq} />
                    </div>
                    <div className="col s5">
                        Espacio Fachada: <input type="text" value={routine.espacio_fach} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s5">
                        Espacio Pantalla: <input type="text" value={routine.espacio_pant} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s5">
                        Espacio RCI: <input type="text" value={routine.espacio_rci} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s5">
                        Observaciones: <input type="text" value={routine.observaciones} />
                    </div>
                    <div className="col s5">
                        Estado: <input type="text" value={routine.estado} />
                    </div>
                </div>
            </div>
        ) : (
            <div className="center">Cargando ...</div>
        )

        return (
            <div className="container">
                { routine }
            </div>
        )
    }
}

RoutineDetails.propTypes = {
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        routine: state.routines.routines.data.find(routine => routine._id === id)
    }
};

export default connect(
    mapStateToProps,
    {  }
)(RoutineDetails)
