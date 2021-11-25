import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";


export const Header = (props) => (
  <header id="header">
    <nav className="navbar navbar-light bg-info">
      <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            OB Report
          </Link>
          <button className="btn btn-danger" onClick={props.startLogout}>
            Logout
          </button>
          
      </div>
    </nav>
        
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);

