import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { startAddLoadingHaulingInfo } from "../actions/loadingHaulingInfo";

export const AddLoadingHaulingInfo = (props) => {

    const piSheetListData = props.piSheetListData;
    const loadingHaulingInfoData = {

        seamNo: piSheetListData.seamNo[0],
        resourceExcavator: piSheetListData.resourceExcavator[0],
        resourceDumper: piSheetListData.resourceDumper[0],
        dumperOperator: piSheetListData.dumperOperator[0],
        operatingTime: 180,
        breakdownTime: 0,
        noOfTrips: 13
    }

    const [loadingHaulingInfo, setLoadingHaulingInfo] = useState(loadingHaulingInfoData);

    const onSeamNoChange = (e) => {
        setLoadingHaulingInfo({...loadingHaulingInfo, seamNo: e.target.value })        
      }
    
    const onResourceExcavatorChange = (e) => {
        setLoadingHaulingInfo({...loadingHaulingInfo, resourceExcavator: e.target.value })
    }
    
    const onResourceDumperChange = (e) => {
        setLoadingHaulingInfo({...loadingHaulingInfo, resourceDumper: e.target.value })
    }

    const onDumperOperatoreChange = (e) => {
        setLoadingHaulingInfo({...loadingHaulingInfo, dumperOperator: e.target.value })
    }

    const onOperatingTimeChange = (e) => {
        setLoadingHaulingInfo({...loadingHaulingInfo, operatingTime: e.target.value })
    }
    const onBreakdownTimeChange = (e) => {
        setLoadingHaulingInfo({...loadingHaulingInfo, breakdownTime: e.target.value })
    }  
    const onNoOfTripsChange = (e) => {
        setLoadingHaulingInfo({...loadingHaulingInfo, noOfTrips: e.target.value })
    }

    const onSubmitLoadingHaulingInfo = () => {
        props.startAddLoadingHaulingInfo(loadingHaulingInfo).then(d => {
            console.log("checking after adding loadingHauling info in AddLoadingHaulingInfo page", d);
            props.onAddLoadHaulButtonStatusChange();
        }).catch(e => {
            console.log("error while adding loading hauling machine: ", e);
        })
    }

    const onCancelSubmit = () => {
        props.onAddLoadHaulButtonStatusChange();
    }

    return (
        <div className="container bg-light">
            <div className="row">
                <p className="h6 text-center">
                    Add Hauling Machine
                </p>
            </div>
            <div className="row justify-content-between">
                <div className="col-5">Seam No</div>
                <div className="col-7">
                    <select 
                        aria-label="seamNo"
                        className= "form-select form-select-sm"
                        onChange={onSeamNoChange} 
                        value= {loadingHaulingInfo.seamNo}
                        >   
                            {piSheetListData.seamNo.map(seamNo => (
                                <option key={`${seamNo}adf`} value={seamNo}>{seamNo}</option>
                            ))}
                    </select>
                </div>
            </div>
            <div className="row justify-content-between">
            <div className="col-5">Excavator</div>
                <div className="col-7">
                    <select 
                        aria-label="resourceExcavator"
                        className= "form-select form-select-sm"
                        onChange={onResourceExcavatorChange} 
                        value= {loadingHaulingInfo.resourceExcavator}
                        >   
                            {piSheetListData.resourceExcavator.map(resourceExcavator => (
                                <option key={`${resourceExcavator}adf`} value={resourceExcavator}>{resourceExcavator}</option>
                            ))}
                    </select>
                </div>
            </div>
            <div className="row justify-content-between">
                <div className="col-5">Dumper</div>
                <div className="col-7">
                    <select 
                        aria-label="resourceDumper"
                        className= "form-select form-select-sm"
                        onChange={onResourceDumperChange} 
                        value= {loadingHaulingInfo.resourceDumper}
                        >   
                            {piSheetListData.resourceDumper.map(resourceDumper => (
                                <option key={`${resourceDumper}adf`} value={resourceDumper}>{resourceDumper}</option>
                            ))}
                    </select>
                </div>
            </div>
            <div className="row justify-content-between">
                <div className="col-5">Operator</div>
                <div className="col-7">
                    <select 
                        aria-label="dumperOperator"
                        className= "form-select form-select-sm"
                        onChange={onDumperOperatoreChange} 
                        value= {loadingHaulingInfo.dumperOperator}
                        >   
                            {piSheetListData.dumperOperator.map(dumperOperator => (
                                <option key={`${dumperOperator}adf`} value={dumperOperator}>{dumperOperator}</option>
                            ))}
                    </select>
                </div>
            </div>
            <div className="row justify-content-between">
                <div className="col-8">Operating Time(min)</div>
                <div className="col-4">
                    <input
                        type="number"
                        className= "form-control form-control-sm"
                        placeholder="Operating Time"
                        value={loadingHaulingInfo.operatingTime}
                        min="0"
                        max="480"
                        onChange={onOperatingTimeChange}
                    />
                </div>
            </div>
            <div className="row justify-content-between">
                <div className="col-8">Breakdown Time(min)</div>
                <div className="col-4">
                    <input
                        type="number"
                        className= "form-control form-control-sm"
                        placeholder="Breakdown Time"
                        value={loadingHaulingInfo.breakdownTime}
                        min="0"
                        max="480"
                        onChange={onBreakdownTimeChange}
                    />
                </div>
            </div>
            <div className="row justify-content-between">
            <div className="col-8">Trips</div>
                <div className="col-4">
                    <input
                        type="number"
                        className= "form-control form-control-sm"
                        placeholder="No Of Trips"
                        value={loadingHaulingInfo.noOfTrips}
                        min="0"
                        onChange={onNoOfTripsChange}
                    />
                </div>
            </div>
            <div className="row">
                <p className="h6 text-center">
                    <button 
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={onSubmitLoadingHaulingInfo}
                    >
                            Submit  
                    </button>
                    <button 
                        type="button"
                        className="btn btn-outline-primary btn-sm ml-2"
                        onClick={onCancelSubmit}
                    >
                            Cancel  
                    </button>
                </p>
                
            </div>
        </div>        
    )

}

const mapStateToProps = (state) => {
    return {
      piSheetListData: state.piSheetListData
    };
};
  
  
const mapDispatchToProps = (dispatch) => ({
    startAddLoadingHaulingInfo: (loadingHaulingInfo) => dispatch(startAddLoadingHaulingInfo(loadingHaulingInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddLoadingHaulingInfo);