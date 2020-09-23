import React, { Component } from "react";

class AppNavbar extends Component {
  render() {
    return (
      <nav className="NavbarItems">
{/*<h1 className="navbar-logo blue">CMMS</h1>*/}
        <div className="menu-icon">
          <ul>
            <li></li>
          </ul>
        </div>
      </nav>
      /* <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons"></i>
              CMMS Movistar Arena Colombia
            </Link>
          </div>
        </nav>
      </div> */
    );
  }
}
export default AppNavbar;