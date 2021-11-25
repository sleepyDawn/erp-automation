import React from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';

import { startEditLoadingInfo, startRemoveLoadingInfo } from '../actions/loadingInfo'; 


export const LoadingInfoItem = (props) => {

  const piSheetListData = props.piSheetListData;
  // console.log("data: ", piSheetListData);
  const loadingInfos = props.loadingInfos;
  const loadingInfo  = props.loadingInfo;

  const getIdAndUpdatesObj = (e, idExtra) => {
    const targetId = e.target.id;
    const currVal = e.target.value;
    
    const targetLoadingInfo = loadingInfos.filter(loadingInfo =>{
      return loadingInfo.id + idExtra === targetId
    })
    

    return {
      id: targetLoadingInfo[0].id,
      updateObj: targetLoadingInfo[0],
      currVal: currVal
    }
   
  }

  const onLocationChange = (e) => {
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, "location");
    
    props.startEditLoadingInfo(id, { location: currVal });
  }

  const onResourceExcavatorChange = (e) => {

    // Checking if choosen excavator already exist in props.loadinInfos, if it is it will not be added to list
    // cancelling it for now
    // if(!props.loadingInfos.filter(info => info.resourceExcavator === e.target.value).length){
    //   const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'resourceExcavator');
    //   props.startEditLoadingInfo(id, { resourceExcavator: currVal })
    // }
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'resourceExcavator');
    props.startEditLoadingInfo(id, { resourceExcavator: currVal })

    
  
  }

  const onExcavatorOperatorChange = (e) => {
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'excavatorOperator');
    // console.log(id, updateObj, currVal);
    props.startEditLoadingInfo(id, { excavatorOperator: currVal })
  
  }

  const onHelperNameChange = (e) => {
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'helperName');
    // console.log(id, updateObj, currVal);
    props.startEditLoadingInfo(id, { helperName: currVal })
  
  }

  const onOperatingTimeChange = (e) => {
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'operatingTime');
    // console.log(id, updateObj, currVal);
    props.startEditLoadingInfo(id, { operatingTime: currVal })
  
  }
  const onBreakdownTimeChange = (e) => {
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'breakdownTime');
    // console.log(id, updateObj, currVal);
    props.startEditLoadingInfo(id, { breakdownTime: currVal })
  
  }

  const onDeleteButtonClick = (e) => {
    props.startRemoveLoadingInfo(loadingInfo.id);
    props.setEditButtonStatus(false);
    
  } 


  

  return (
    <div className="col-12  pb-2">
        <div className="container bg-light">
            <div className="row justify-content-between">
                <div className="col-5">Location</div>
                <div className="col-7">
                    <select 
                          aria-label="location"
                          className= "form-select form-select-sm"
                          id={loadingInfo.id + 'location'}
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
                        id={loadingInfo.id + 'resourceExcavator'}
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
                        id={loadingInfo.id + 'excavatorOperator'}
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
                          id={loadingInfo.id + 'helperName'}
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
                        id={loadingInfo.id + 'operatingTime'}
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
                        id={loadingInfo.id + 'breakdownTime'}
                        value={loadingInfo.breakdownTime}
                        onChange={onBreakdownTimeChange}
                    />
                </div>
            </div>
            <hr/>
            <div className="row">
                <p className="h6 text-center">
                    <button 
                        type="button"
                        className="btn btn-outline-primary btn-sm ml-2"
                        onClick={onDeleteButtonClick}
                    >
                            Delete  
                    </button>
                </p>
            </div>
        </div>
    </div>  

  );
}


const mapStateToProps = (state) => {
  return {
    loadingInfos: state.loadingInfos,
    loadingHaulingInfos: state.loadingHaulingInfos,
    piSheetListData: state.piSheetListData

  };
};


const mapDispatchToProps = (dispatch) => ({
    startEditLoadingInfo: (id, updates) => dispatch(startEditLoadingInfo(id, updates)),
    startRemoveLoadingInfo: (id) => dispatch(startRemoveLoadingInfo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadingInfoItem);
