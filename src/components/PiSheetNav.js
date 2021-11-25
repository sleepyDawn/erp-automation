import moment from 'moment';
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SingleDatePicker } from "react-dates";
import { Link } from 'react-router-dom';
import { Container, Form, Button, Table } from 'react-bootstrap';
import { setPlantVal, setProcessOrderVal, setProductionDateVal, setShiftVal, startSetAllInfos } from "../actions/piSheetInfo";
import { editDrillingInfo } from '../actions/drillingInfo';
import { editLoadingInfo } from "../actions/loadingInfo";
import { editLoadingHaulingInfo } from '../actions/loadingHaulingInfo';
import downloadExcel from '../utility/downloadExcel';
import LoadingPage from './LoadingPage';

// import { renderMonthElement} from "../utility/renderMonthElement"

export const PiSheetNav = (props) => {
    



    // Trying to update trips according to trips in loadingHaulingInfos
    // let trips = 0;
    // props.loadingHaulingInfos.forEach(info => {
    //     // console.log(typeof info.noOfTrips*1);
    //     if(typeof (info.noOfTrips*1) === "number"){
    //         trips = trips + info.noOfTrips*1;
    //     }
    // })

    const onCompleteInfoSubmit = () => downloadExcel({
        piSheetInfos: props.piSheetInfos,
        drillingInfos: props.drillingInfos,
        loadingInfos: props.loadingInfos,
        loadingHaulingInfos: props.loadingHaulingInfos
        
    })

    const onActionSelction = (e) => {
        const action = e.target.value;
        props.onInfoSelection(action);        
    }

    // console.log("checking List Item: ", props.piSheetListData.shifts);

    return (
        <div className="container mt-2" id="piSheetInfo">
            <div className="row mt-2 bg-light">
                <div className="col-9">
                <div className="btn-group">
                    <button type="button" className="btn btn-info btn-sm" onClick={onActionSelction} value="drilling">Drilling</button>
                    <button type="button" className="btn btn-info btn-sm" onClick={onActionSelction} value="loading">Loading</button>
                    <button type="button" className="btn btn-info btn-sm" onClick={onActionSelction} value="hauling">Hauling</button>
                </div>
                </div>
                <div className="col-3">
                    <button
                        type="button"
                        className="btn btn-info btn-sm"
                        onClick={onCompleteInfoSubmit}
                    >
                        Download
                    </button>
                </div>
            </div>
            
        </div>
      );
}

const mapStateToProps = (state) => {
    
    return {
        piSheetInfos: state.piSheetInfos,
        piSheetListData: state.piSheetListData,
        drillingInfos: state.drillingInfos,
        loadingInfos: state.loadingInfos,
        loadingHaulingInfos: state.loadingHaulingInfos

    }
}


// const mapDispatchToProps = (dispatch) => ({
//     setPlantVal: (plant) => dispatch(setPlantVal(plant)),
//     setProcessOrderVal: (processOrder) => dispatch(setProcessOrderVal(processOrder)),
//     setProductionDateVal: (productionDate) => dispatch(setProductionDateVal(productionDate)),
//     setShiftVal: (shift) => dispatch(setShiftVal(shift)),
//     editDrillingInfo: (id, updates) => dispatch(editDrillingInfo(id,updates)),
//     editLoadingInfo: (id, updates) => dispatch(editLoadingInfo(id,updates)),
//     editLoadingHaulingInfo: (id, updates) => dispatch(editLoadingHaulingInfo(id,updates)),
//     startSetAllInfos: () => dispatch(startSetAllInfos())
// })

export default connect(mapStateToProps, undefined)(PiSheetNav);