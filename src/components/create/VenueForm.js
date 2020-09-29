import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addVenue } from "../../actions/venueActions";
import classnames from "classnames";
import { Card, CardContent } from "@material-ui/core";

class VenueForm extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            country: "",
            city: "",
            address: "",
            postal_code: "",
            floors: "",
            sections: "",
            errors:{}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
    
        const newVenue = {
            name: this.state.name,
            country: this.state.country,
            city: this.state.city,
            address: this.state.address,
            postal_code: this.state.postal_code,
            floors: this.state.floors,
            sections: this.state.sections
        };
        this.props.addVenue(newVenue, this.props.history); 
    };

    render() {
        const { errors } = this.state;

        return (
            <Card variant="elevation">
                <CardContent>
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/venues" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to venues
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Nuevo recinto</b> :
                            </h4>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.name
                                    })}
                                    />
                                <label htmlFor="name">Nombre Recinto</label>
                                <span className="red-text">{errors.name}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.country}
                                    error={errors.country}
                                    id="country"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.country
                                    })}
                                    />
                                <label htmlFor="country">País</label>
                                <span className="red-text">{errors.country}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.city}
                                    error={errors.city}
                                    id="city"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.city
                                    })}
                                    />
                                <label htmlFor="city">Ciudad</label>
                                <span className="red-text">{errors.city}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.address}
                                    error={errors.address}
                                    id="address"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.address
                                    })}
                                    />
                                <label htmlFor="address">Dirección</label>
                                <span className="red-text">{errors.address}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.postal_code}
                                    error={errors.postal_code}
                                    id="postal_code"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.postal_code
                                    })}
                                    />
                                <label htmlFor="postal_code">Código Postal</label>
                                <span className="red-text">{errors.postal_code}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.floors}
                                    error={errors.floors}
                                    id="floors"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.floors
                                    })}
                                    />
                                <label htmlFor="floors"> Número de pisos </label>
                                <span className="red-text">{errors.floors}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.sections}
                                    error={errors.sections}
                                    id="sections"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.sections
                                    })}
                                    />
                                <label htmlFor="sections">Secciones</label>
                                <span className="red-text">{errors.sections}</span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                    >
                                    Crear
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </CardContent>
            </Card>
        );
    }
}

VenueForm.propTypes = {
    addVenue: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addVenue }
)(VenueForm);