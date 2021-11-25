import React from 'react';
import { useState} from 'react';
import { connect } from 'react-redux';

import { startEditLoadingHaulingInfo } from '../actions/loadingHaulingInfo'; 
import LoadingHaulingInfoItem from './LoadingHaulingInfoItem';

export const LoadingHaulingInfosList = (props) => {

  
  // // Updating only hauling machines for a shift which have loading machines
  // const resourceExcavators = [];
  // props.loadingInfos.map(item => item.resourceExcavator)
  //   .forEach((item) => {
  //       if(!resourceExcavators.includes(item)) resourceExcavators.push(item);
  // });
  // const loadingHaulingInfos = props.loadingHaulingInfos
  //                             .filter(item => resourceExcavators.includes(item.resourceExcavator));
  
  const piSheetListData = props.piSheetListData;
  const loadingHaulingInfos = props.loadingHaulingInfos
  let totalTrips = 0;
  loadingHaulingInfos.forEach(item => {
    totalTrips = item.noOfTrips*1 + totalTrips;
  })


  // For toggling between complete info and trimmed info
  const [editButtonStatus, setEditButtonStatus] = useState(false);
  const [loadingHaulingInfoId, setLoadingHaulingInfoId] = useState(false);
  const onCompleteEditButtonClick = (e) => {
    if(!editButtonStatus){
      setEditButtonStatus(true);
      setLoadingHaulingInfoId(e.target.id);
    } else {
      setEditButtonStatus(false);
    }
    
  }

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


  const onResourceDumperChange = (e) => {

    // Checking if choosen dumper already exist in props.loadinHaulingInfos, if it is, it will not be added to list
    // if(!props.loadingHaulingInfos.filter(info => info.resourceDumper === e.target.value).length){
    //   const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'resourceDumper');
    //   props.startEditLoadingHaulingInfo(id, { ...updateObj, resourceDumper: currVal })
    // }
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'resourceDumper');
    props.startEditLoadingHaulingInfo(id, { ...updateObj, resourceDumper: currVal })
  }

  const onNoOfTripsChange = (e) => {
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'noOfTrips');
    // console.log(id, updateObj, currVal);
    props.startEditLoadingHaulingInfo(id, { ...updateObj, noOfTrips: currVal })
  
  }


  

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="p-1 bg-info text-dark d-flex justify-content-between">
          <p className="h6">
            Hauling - <span>{totalTrips} Trips</span>
          </p>
          <button 
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={props.onAddLoadHaulButtonStatusChange}
          >
            Add  
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          SNo.
        </div>
        <div className="col-5">
          Dumper
        </div>
        <div className="col-3">
          Trips
        </div>
        <div className="col-2">
          Edit
        </div>
      </div>
    
    {
      loadingHaulingInfos.map((loadingHaulingInfo, index) => (
        <div className="row pb-2" key={loadingHaulingInfo.id}>
          <div className="col-1">
            {index + 1}
          </div>
          <div className="col-6">
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
          <div className="col-3">
            <input
              type="number"
              min="0"
              className= "form-control form-control-sm"
              placeholder="No Of Trips"
              id={loadingHaulingInfo.id + 'noOfTrips'}
              value={loadingHaulingInfo.noOfTrips}
              onChange={onNoOfTripsChange}
            />
          </div>
          <div className="col-2">
            <button 
              type="button"
              id={loadingHaulingInfo.id}
              className="btn btn-outline-primary btn-sm"
              onClick={onCompleteEditButtonClick}
            >
              {!editButtonStatus  || !(loadingHaulingInfoId === loadingHaulingInfo.id) ? <>+</> : <>-</>}  
            </button>

          </div>
          { editButtonStatus && 
            loadingHaulingInfoId === loadingHaulingInfo.id && 
            <LoadingHaulingInfoItem 
              loadingHaulingInfo={loadingHaulingInfo}
              setEditButtonStatus={setEditButtonStatus}
            ></LoadingHaulingInfoItem>
          }
        </div>
      )) 
    } 
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
    startEditLoadingHaulingInfo: (id, updates) => dispatch(startEditLoadingHaulingInfo(id, updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadingHaulingInfosList);
