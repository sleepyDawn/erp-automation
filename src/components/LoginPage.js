import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ startLogin }) => {
  return (
    <div className="contianer mt-5">
      <div className="row">
        <div className="col-3 col-md-4"></div>
        <div className="col-6 col-md-4 bg-light">
          <p className="h5 text-center mb-4">ERP Automation App</p>
          <p className="h6 text-center mb-2">Automate the daily tasks</p>
          <button className="button btn-info ms-4" onClick={startLogin}>
            Login with Google
          </button>
        </div>
        <div className="col-3 col-md-4"></div>
        
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLogin: () => dispatch(startLogin()),
  };
};

export default connect(undefined, mapDispatchToProps)(LoginPage);
