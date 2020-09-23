import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {

    render() {
        return(
            <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Control</b> de Actividades de Mantenimiento y Activos  {" "}
              <span style={{ fontFamily: "monospace" }}></span>
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Movistar Arena Colombia 
            </p>
            <br />
            
            <div className="col s12 center-align">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
        )
    };
}
export default Home;