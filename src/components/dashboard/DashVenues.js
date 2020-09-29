import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getVenues } from "../../actions/venueActions";

import Venues from "./Venues";
import { Card, CardContent } from "@material-ui/core";

class DashVenues extends Component {

    componentDidMount() {
        this.props.getVenues();
      }

    render() {

        const { venues } = this.props.venues;

        let dashboardContent;

        const res = Object.values(venues)

        console.log(res)

        if(this.props.auth.user.role!=="Superusuario"){
            dashboardContent = <p className="center-align">Acceso denegado</p>;
          } 
          else if (res === null) {
              dashboardContent = <p className="center-align">Cargando ...</p>;
            } else if (res.length> 0 ) {
              dashboardContent = <div><Venues venues={res}/>
                                    <Link to="/newVenue" className="btn-flat waves-effect">
                                      <i className="material-icons left">add</i> Nuevo Recinto
                                    </Link>
                                  </div>;
            } else {
              dashboardContent = <div> No hay recintos </div>;
            }

        return (
            <Card variant="elevation">
              <CardContent>
                {dashboardContent}
              </CardContent>
            </Card>
        )
    }
}

DashVenues.propTypes = {
    getVenues: PropTypes.func.isRequired,
    venues: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  console.log(state.venues)
  console.log(state.auth)
  return {
    venues: state.venues,
    auth: state.auth
  }

};

export default connect(
    mapStateToProps,
    { getVenues }
) (DashVenues);