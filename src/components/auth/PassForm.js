import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changePassword } from "../../actions/authActions";
import classnames from "classnames";

class PassForm extends Component {
    constructor(){
        super();
        this.state= {
            id: "",
            oldPass: "",
            newPass: "",
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/profile"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            console.log(nextProps)
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
        const userData = {
            oldPass: this.state.oldPass,
            newPass: this.state.newPass
          };
        console.log(userData)
        this.props.changePassword(userData);
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                <div className="col s8 offset-s2">
                    <Link to="/profile" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Regresar
                    </Link>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <h4>
                        <b>Cambiar</b> contraseña
                    </h4>
                    </div>
                    <form noValidate onSubmit={this.onSubmit}>
                    <div className="input-field col s12">
                        <input
                        onChange={this.onChange}
                        value={this.state.oldPass}
                        error={errors.oldPass}
                        id="oldPass"
                        type="password"
                        className={classnames("", {
                            invalid: errors.oldPass || errors.passwordincorrect
                        })}
                        />
                        <label htmlFor="oldPass">Contraseña anterior</label>
                        <span className="red-text">
                        {errors.oldPass}
                        {errors.passwordincorrect}
                        </span>
                    </div>
                    <div className="input-field col s12">
                        <input
                        onChange={this.onChange}
                        value={this.state.newPass}
                        error={errors.newPass}
                        id="newPass"
                        type="password"
                        className={classnames("", {
                            invalid: errors.newPass || errors.passwordincorrect
                        })}
                        />
                        <label htmlFor="password">Nueva contraseña</label>
                        <span className="red-text">
                        {errors.newPass}
                        {errors.passwordincorrect}
                        </span>
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
                        Guardar
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}

PassForm.propTypes = {
    changePassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { changePassword }
)(PassForm);