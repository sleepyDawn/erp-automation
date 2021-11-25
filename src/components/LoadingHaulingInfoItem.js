import React from 'react';
import { connect } from 'react-redux';

import { startEditLoadingHaulingInfo, startRemoveLoadingHaulingInfo } from '../actions/loadingHaulingInfo'; 


export const LoadingHaulingInfoItem = (props) => {

  const piSheetListData = props.piSheetListData;

//   // Checking for used loading machines in a shift for distribution in hauling machines 
//   const resourceExcavators = [];
//   props.loadingInfos.map(item => item.resourceExcavator)
//     .forEach((item) => {
//         if(!resourceExcavators.includes(item)) resourceExcavators.push(item);
//     });

  const loadingHaulingInfos = props.loadingHaulingInfos;
  const loadingHaulingInfo = props.loadingHaulingInfo;


  const getIdAndUpdatesObj = (e, idExtra) => {
    const targetId = e.target.id;
    const currVal = e.target.value;
    
    const targetLoadingHaulingInfo = loadingHaulingInfos.filter(loadingHaulingInfo =>{
      return loadingHaulingInfo.id + idExtra === targetId
    })
    

    return {
      id: targetLoadingHaulingInfo[0].id,
      updateObj: targetLoadingHaulingInfo[0],
      currVal: currVal
    }
   
  }

  const onSeamNoChange = (e) => {
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, "seamNo");
    
    props.startEditLoadingHaulingInfo(id, { ...updateObj, seamNo: currVal })
  }

  const onResourceExcavatorChange = (e) => {
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'resourceExcavator');
    // Only adding resource excavator, add location and operator while downloading the data
    props.startEditLoadingHaulingInfo(id, { ...updateObj, resourceExcavator: currVal})
  }

  const onResourceDumperChange = (e) => {

    // Checking if choosen dumper already exist in props.loadinHaulingInfos, if it is, it will not be added to list
    // cancelling this scheme
    // if(!props.loadingHaulingInfos.filter(info => info.resourceDumper === e.target.value).length){
    // const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'resourceDumper');
    // props.startEditLoadingHaulingInfo(id, { ...updateObj, resourceDumper: currVal })
    // }
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'resourceDumper');
    props.startEditLoadingHaulingInfo(id, { ...updateObj, resourceDumper: currVal })
  
  }

  const onDumperOperatoreChange = (e) => {
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'dumperOperator');
    props.startEditLoadingHaulingInfo(id, { ...updateObj, dumperOperator: currVal })
  
  }

  const onOperatingTimeChange = (e) => {
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'operatingTime');
    // console.log(id, updateObj, currVal);
    props.startEditLoadingHaulingInfo(id, { ...updateObj, operatingTime: currVal })
  
  }
  const onBreakdownTimeChange = (e) => {
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'breakdownTime');
    // console.log(id, updateObj, currVal);
    props.startEditLoadingHaulingInfo(id, { ...updateObj, breakdownTime: currVal })
  
  }
  
  const onNoOfTripsChange = (e) => {
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'noOfTrips');
    // console.log(id, updateObj, currVal);
    props.startEditLoadingHaulingInfo(id, { ...updateObj, noOfTrips: currVal })
  
  }

  const onDeleteButtonClick = (e) => {
    props.startRemoveLoadingHaulingInfo(loadingHaulingInfo.id);
    props.setEditButtonStatus(false);
    
  }


    return (

    <div className="col-12 pb-2">
        <div className="container bg-light">
            <div className="row justify-content-between">
                <div className="col-5">Seam No</div>
                <div className="col-7">
                    <select 
                        aria-label="seamNo"
                        className= "form-select form-select-sm"
                        id={loadingHaulingInfo.id + 'seamNo'}
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
                        id={loadingHaulingInfo.id + 'resourceExcavator'}
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
                        id={loadingHaulingInfo.id + 'resourceDumper'}
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
                        id={loadingHaulingInfo.id + 'dumperOperator'}
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
                        id={loadingHaulingInfo.id + 'operatingTime'}
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
                        id={loadingHaulingInfo.id + 'breakdownTime'}
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
                        id={loadingHaulingInfo.id + 'noOfTrips'}
                        value={loadingHaulingInfo.noOfTrips}
                        min="0"
                        onChange={onNoOfTripsChange}
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
        startEditLoadingHaulingInfo: (id, updates) => dispatch(startEditLoadingHaulingInfo(id, updates)),
        startRemoveLoadingHaulingInfo: (id) => dispatch(startRemoveLoadingHaulingInfo(id))
    })

    export default connect(mapStateToProps, mapDispatchToProps)(LoadingHaulingInfoItem);
