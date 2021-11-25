import React from 'react';
import { useState} from 'react';
import { connect } from 'react-redux';
import { Container, Form, Button, Table } from 'react-bootstrap';

import { editDrillingInfo, startEditDrillingInfo } from '../actions/drillingInfo';
import DrillingInfoItem from './DrillingInfoItem';


export const DrillingInfosList = (props) => {

  const piSheetListData = props.piSheetListData;
  const drillingInfos = props.drillingInfos;



  // For toggling between complete info and trimmed info
  const [editButtonStatus, setEditButtonStatus] = useState(false);
  const [drillingInfoId, setDrillingInfoId] = useState(false);
  const onCompleteEditButtonClick = (e) => {
    if(!editButtonStatus){
      setEditButtonStatus(true);
      setDrillingInfoId(e.target.id);
    } else {
      setEditButtonStatus(false);
    }
    
  }

  // const onCollapseButtonClick = (e) => {
  //   setEditButtonStatus(false);
  // }

  const getIdAndUpdatesObj = (e, idExtra) => {
    const targetId = e.target.id;
    const currVal = e.target.value;
    
    const targetDrillingInfo = drillingInfos.filter(drillingInfo =>{
      return drillingInfo.id + idExtra === targetId
    })
    

    return {
      id: targetDrillingInfo[0].id,
      updateObj: targetDrillingInfo[0],
      currVal: currVal
    }
   
  }


  const onResourceDrillChange = (e) => {
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'resourceDrill');
    // console.log(id, updateObj, currVal);
    props.startEditDrillingInfo(id, { resourceDrill: currVal })
  
  }

  const onHolesDrilledChange = (e) => {
    const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'holesDrilled');
    // console.log(id, updateObj, currVal);
    // props.editDrillingInfo(id, { ...updateObj, holesDrilled: currVal })
    props.startEditDrillingInfo(id, { holesDrilled: currVal });
    
  
  }


  

  return (

    <div className="container mt-2">
      <div className="row justify-content-between">
        <div className="p-1 bg-info text-dark d-flex justify-content-between">
          <p className="h6">
            Drilling
          </p>
          
          <button 
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={props.onAddDrillButtonStatusChange}
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
          Drill
        </div>
        <div className="col-3">
          Holes
        </div>
        <div className="col-2">
          Edit
        </div>
      </div>
      { drillingInfos.map((drillingInfo, index) => (
  
        <div className="row" key={drillingInfo.id}> 
          <div className="col-1">
            {index + 1}
          </div>
          <div className="col-6">
            <select 
              aria-label="resourceDrill"
              className= "form-select form-select-sm"
              id={drillingInfo.id + 'resourceDrill'}
              onChange={onResourceDrillChange} 
              value= {drillingInfo.resourceDrill}
              >   
                  {piSheetListData.resourceDrill.map(resourceDrill => (
                      <option key={`${resourceDrill}adf`} value={resourceDrill}>{resourceDrill}</option>
                  ))}
            </select>
          </div>
          <div className="col-3">
            <input
              type="number"
              min="0"
              className= "form-control form-control-sm"
              placeholder="Holes Drilled"
              id={drillingInfo.id + 'holesDrilled'}
              value={drillingInfo.holesDrilled}
              onChange={onHolesDrilledChange}
            />
          </div>
          <div className="col-2">
            <button 
              type="button"
              id={drillingInfo.id}
              className="btn btn-outline-primary btn-sm"
              onClick={onCompleteEditButtonClick}
            >
              {!editButtonStatus  || !(drillingInfoId === drillingInfo.id) ? <>+</> : <>-</>}  
            </button>

          </div>
          { editButtonStatus && 
            drillingInfoId === drillingInfo.id && 
            <DrillingInfoItem 
              drillingInfo={drillingInfo}
              setEditButtonStatus={setEditButtonStatus}
            ></DrillingInfoItem>
          // (
          //   <DrillingInfoItem drillingInfo={drillingInfo}></DrillingInfoItem>
          // )
          }
          
        </div>
        
      ))}
    </div>
  
  );
}



const mapStateToProps = (state) => {
  return {
    drillingInfos: state.drillingInfos,
    piSheetListData: state.piSheetListData

  };
};


const mapDispatchToProps = (dispatch) => ({
  startEditDrillingInfo: (id, updates) => dispatch(startEditDrillingInfo(id, updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(DrillingInfosList);
