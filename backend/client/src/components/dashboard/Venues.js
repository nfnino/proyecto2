import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteVenue } from "../../actions/venueActions";
import { Typography } from "@material-ui/core";


class Venues extends Component {

    onDeleteClick = id => {
        const { venues } = this.props;
        const venueData = {
        id: id,
        venues: venues
        };
        this.props.deleteVenue(venueData);
    };

    render() {
        const res = this.props.venues.venues;
        const venues = res.data;

        console.log(res)

        let venueItems = venues.map(venue => (
            <tr key={venue._id} style={{ marginTop: "1rem" }}>
               <td> {venue.name} </td>
               <td> {venue.country} </td>
               <td> {venue.city} </td>
               <td>
                <button
                    style={{ marginRight: "1rem" }}
                    onClick={this.onDeleteClick.bind(this, venue._id)}
                    className="btn btn-small btn-floating waves-effect waves-light hoverable red accent-3">
                    <i className="material-icons">delete</i>
                </button>
                </td>
            </tr>
        ));

        return (
            <div>
            <div className="row">
                <div className="col s12 center-align">
                    <h5>
                        <Typography variant="h3" color="primary">RECINTOS </Typography>
                    </h5>
                </div>
            </div>
            <div className="row">
                <div className="col s12 board">
                    <table>
                        <tbody>
                            <tr>
                                <th>Nombre</th>
                                <th>Pais</th>
                                <th>Ciudad</th>
                                <th>Acciones</th>
                            </tr>
                            {venueItems}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        );
    }
}

Venues.propTypes = {
    venues: PropTypes.array.isRequired,
    deleteVenue: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    venues: state.venues
  });

export default connect(
    mapStateToProps,
    { deleteVenue }
)(Venues);