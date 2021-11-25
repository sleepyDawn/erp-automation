import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { startAddLoadingInfo } from "../actions/loadingInfo";

export const AddLoadingInfo = (props) => {

    const piSheetListData = props.piSheetListData;
    const loadingInfoData = {

        location: piSheetListData.locationObBench[0],
        resourceExcavator: piSheetListData.resourceExcavator[0],
        excavatorOperator: piSheetListData.excavatorOperator[0],
        helperName: piSheetListData.drillHelperName[0],
        operatingTime: 180,
        breakdownTime: 0,
    }

    const [loadingInfo, setLoadingInfo] = useState(loadingInfoData);

    const onLocationChange = (e) => {
        setLoadingInfo({...loadingInfo, location: e.target.value })        
      }
    
    const onResourceExcavatorChange = (e) => {
        setLoadingInfo({...loadingInfo, resourceExcavator: e.target.value })
    }
    
    const onExcavatorOperatorChange = (e) => {
        setLoadingInfo({...loadingInfo, excavatorOperator: e.target.value })
    }

    const onHelperNameChange = (e) => {
    setLoadingInfo({...loadingInfo, helperName: e.target.value })
    }

    const onOperatingTimeChange = (e) => {
        setLoadingInfo({...loadingInfo, operatingTime: e.target.value })
    }
    const onBreakdownTimeChange = (e) => {
        setLoadingInfo({...loadingInfo, breakdownTime: e.target.value })
    }  

    const onSubmitLoadingInfo = () => {
        props.startAddLoadingInfo(loadingInfo).then(d => {
            console.log("checking after adding loading info in AddLoadingInfo page", d);
            props.onAddLoadButtonStatusChange()
        }).catch(e => {
            console.log("error while adding loading machine: ", e);
        })
    }

    const onCancelSubmit = () => {
        props.onAddLoadButtonStatusChange();
    }

    return (
        <div className="container bg-light">
            <div className="row">
                <p className="h6 text-center">
                    Add Loading Machine
                </p>
            </div>
            <div className="row justify-content-between">
                <div className="col-5">Location</div>
                <div className="col-7">
                    <select 
                          aria-label="location"
                          className= "form-select form-select-sm"
                          onChange={onLocationChange} 
                          value= {loadingInfo.location}
                          >   
                              {piSheetListData.locationObBench.map(location => (
                                  <option key={`${location}adf`} value={location}>{location}</option>
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
                        value= {loadingInfo.resourceExcavator}
                        >   
                            {piSheetListData.resourceExcavator.map(resourceExcavator => (
                                <option key={`${resourceExcavator}adf`} value={resourceExcavator}>{resourceExcavator}</option>
                            ))}
                    </select>
                </div>
            </div>
            <div className="row justify-content-between">
                <div className="col-5">Operator</div>
                <div className="col-7">
                    <select 
                        aria-label="excavatorOperator"
                        className= "form-select form-select-sm"
                        onChange={onExcavatorOperatorChange} 
                        value= {loadingInfo.excavatorOperator}
                        >   
                            {piSheetListData.excavatorOperator.map(excavatorOperator => (
                                <option key={`${excavatorOperator}adf`} value={excavatorOperator}>{excavatorOperator}</option>
                            ))}
                    </select>
                </div>
            </div>
            <div className="row justify-content-between">
                <div className="col-5">Helper</div>
                <div className="col-7">
                    <select 
                          aria-label="helperName"
                          className= "form-select form-select-sm"
                          onChange={onHelperNameChange} 
                          value= {loadingInfo.helperName}
                          >   
                              {piSheetListData.drillHelperName.map(drillHelperName => (
                                  <option key={`${drillHelperName}adf`} value={drillHelperName}>{drillHelperName}</option>
                              ))}
                    </select>
                </div>
            </div>
            <div className="row justify-content-between">
                <div className="col-8">Operating Time(min)</div>
                <div className="col-4">
                    <input
                        type="number"
                        min="0"
                        max="480"
                        className= "form-control form-control-sm"
                        placeholder="Operating Time"
                        value={loadingInfo.operatingTime}
                        onChange={onOperatingTimeChange}
                    />
                </div>
            </div>
            <div className="row justify-content-between">
                <div className="col-8">Breakdown Time(min)</div>
                <div className="col-4">
                    <input
                        type="number"
                        min="0"
                        max="480"
                        className= "form-control form-control-sm"
                        placeholder="Breakdown Time"
                        value={loadingInfo.breakdownTime}
                        onChange={onBreakdownTimeChange}
                    />
                </div>
            </div>
            <div className="row">
                <p className="h6 text-center">
                    <button 
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={onSubmitLoadingInfo}
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
    startAddLoadingInfo: (loadingInfo) => dispatch(startAddLoadingInfo(loadingInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddLoadingInfo);