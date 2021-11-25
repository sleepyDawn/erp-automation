import React from 'react';
import {useState} from 'react';
import { connect } from 'react-redux';

import { startEditLoadingInfo } from '../actions/loadingInfo'; 
import LoadingInfoItem from './LoadingInfoItem';


export const LoadingInfosList = (props) => {

  const piSheetListData = props.piSheetListData;
  // console.log("data: ", piSheetListData);
  const loadingInfos = props.loadingInfos;
  // console.log("checking Loading info: ",loadingInfos);

  // For toggling between complete info and trimmed info
  const [editButtonStatus, setEditButtonStatus] = useState(false);
  const [loadingInfoId, setLoadingInfoId] = useState(false);
  const onCompleteEditButtonClick = (e) => {
    if(!editButtonStatus){
      setEditButtonStatus(true);
      setLoadingInfoId(e.target.id);
    } else {
      setEditButtonStatus(false);
    }
    
  }

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

  const onResourceExcavatorChange = (e) => {
    // Checking if choosen excavator already exist in props.loadinInfos, if it is it will not be added to list
    // if(!props.loadingInfos.filter(info => info.resourceExcavator === e.target.value).length){
    //   const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'resourceExcavator');
    //   props.startEditLoadingInfo(id, { resourceExcavator: currVal })
    // }
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'resourceExcavator');
    props.startEditLoadingInfo(id, { resourceExcavator: currVal }) 
  }

  const onOperatingTimeChange = (e) => {
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'operatingTime');
    // console.log(id, updateObj, currVal);
    props.startEditLoadingInfo(id, { operatingTime: currVal })
  
  }


  return (

    <div className="container mt-2">
      <div className="row">
        <div className="p-1 bg-info text-dark d-flex justify-content-between">
          <p className="h6">
            Loading
          </p>
          <button 
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={props.onAddLoadButtonStatusChange}
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
          Excavator
        </div>
        <div className="col-3">
          Working
        </div>
        <div className="col-2">
          Edit
        </div>
      </div>
      { loadingInfos.map((loadingInfo, index) => (
  
      <div className="row" key={loadingInfo.id}> 
        <div className="col-1">
          {index + 1}
        </div>
        <div className="col-6">
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
        <div className="col-3">
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
        <div className="col-2">
          <button 
            type="button"
            id={loadingInfo.id}
            className="btn btn-outline-primary btn-sm"
            onClick={onCompleteEditButtonClick}
          >
            {!editButtonStatus  || !(loadingInfoId === loadingInfo.id) ? <>+</> : <>-</>}  
          </button>

        </div>
        { editButtonStatus && 
          loadingInfoId === loadingInfo.id && 
          <LoadingInfoItem 
            loadingInfo={loadingInfo}
            setEditButtonStatus={setEditButtonStatus}
          ></LoadingInfoItem>
        
        }
        
      </div>
      
      ))}
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
    startEditLoadingInfo: (id, updates) => dispatch(startEditLoadingInfo(id, updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadingInfosList);
