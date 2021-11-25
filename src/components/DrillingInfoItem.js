import React from "react";
import { connect } from "react-redux";
import { startEditDrillingInfo, startRemoveDrillingInfo } from '../actions/drillingInfo';


export const DrillingInfoItem = (props) => {

    const piSheetListData = props.piSheetListData;
    const drillingInfos = props.drillingInfos;
    const drillingInfo = props.drillingInfo;

    // console.log("checking drilling info: ", drillingInfo);

  
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
  
    const onLocationChange = (e) => {
      const {id, updateObj, currVal} = getIdAndUpdatesObj(e, "location");
      
      props.startEditDrillingInfo(id, { location: currVal })
    }
  
    const onResourceDrillChange = (e) => {
      const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'resourceDrill');
      // console.log(id, updateObj, currVal);
      props.startEditDrillingInfo(id, { resourceDrill: currVal })
    
    }
  
    const onDrillOperatorChange = (e) => {
      const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'drillOperator');
      // console.log(id, updateObj, currVal);
      props.startEditDrillingInfo(id, { drillOperator: currVal })
    
    }
  
    const onHelperNameChange = (e) => {
      const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'helperName');
      // console.log(id, updateObj, currVal);
      props.startEditDrillingInfo(id, { helperName: currVal })
    
    }
  
    const onOperatingTimeChange = (e) => {
      const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'operatingTime');
      // console.log(id, updateObj, currVal);
      props.startEditDrillingInfo(id, { operatingTime: currVal })
    
    }
    const onBreakdownTimeChange = (e) => {
      const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'breakdownTime');
      // console.log(id, updateObj, currVal);
      props.startEditDrillingInfo(id, { breakdownTime: currVal })
    
    }
    const onHolesDrilledChange = (e) => {
      const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'holesDrilled');
      // console.log(id, updateObj, currVal);
      props.startEditDrillingInfo(id, { holesDrilled: currVal })
    
    }
    const onAvgMetersDrilledChange = (e) => {
      const {id, updateObj, currVal} = getIdAndUpdatesObj(e, 'avgMetersDrilled');
      // console.log(id, updateObj, currVal);
      props.startEditDrillingInfo(id, { avgMetersDrilled: currVal })
    
    }

    const onDeleteButtonClick = (e) => {
        props.startRemoveDrillingInfo(drillingInfo.id);
        props.setEditButtonStatus(false);
        
    }


    return (
    <div className="col-12 pb-2">
        <div className="container bg-light">
            <div className="row justify-content-between">
                <div className="col-5">Location</div>
                <div className="col-7">
                    <select 
                        className= "form-select form-select-sm"
                        aria-label="location"
                        id={drillingInfo.id + 'location'}
                        onChange={onLocationChange} 
                        value= {drillingInfo.location}
                        >   
                        {piSheetListData.locationObBench.map(location => (
                            <option key={`${location}adf`} value={location}>{location}</option>
                        ))}
                    </select>
                </div>
                
            </div>
            <div className="row justify-content-between">
                <div className="col-5">Drill</div>
                <div className="col-7">
                    <select 
                    className= "form-select form-select-sm"
                    aria-label="resourceDrill"
                    id={drillingInfo.id + 'resourceDrill'}
                    onChange={onResourceDrillChange} 
                    value= {drillingInfo.resourceDrill}
                    >   
                        {piSheetListData.resourceDrill.map(resourceDrill => (
                            <option key={`${resourceDrill}adf`} value={resourceDrill}>{resourceDrill}</option>
                        ))}
                    </select>
                </div>

            </div>
            <div className="row justify-content-between">
                <div className="col-5">Drill Operator</div>
                <div className="col-7">
                    <select 
                    className= "form-select form-select-sm"
                    aria-label="drillOperator"
                    id={drillingInfo.id + 'drillOperator'}
                    onChange={onDrillOperatorChange} 
                    value= {drillingInfo.drillOperator}
                    >   
                    {piSheetListData.drillOperator.map(drillOperator => (
                        <option key={`${drillOperator}adf`} value={drillOperator}>{drillOperator}</option>
                    ))}
                    </select>
                </div>

            </div>
            <div className="row justify-content-between">
                <div className="col-5">Helper</div>
                <div className="col-7">
                    <select 
                    className= "form-select form-select-sm"
                    aria-label="helperName"
                    id={drillingInfo.id + 'helperName'}
                    onChange={onHelperNameChange} 
                    value= {drillingInfo.helperName}
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
                        id={drillingInfo.id + 'operatingTime'}
                        value={drillingInfo.operatingTime}
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
                    id={drillingInfo.id + 'breakdownTime'}
                    value={drillingInfo.breakdownTime}
                    onChange={onBreakdownTimeChange}
                />
                </div>
                
            </div>
            <div className="row justify-content-between">
                <div className="col-8">Holes</div>
                <div className="col-4">
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
                
            </div>
            <div className="row justify-content-between">
                <div className="col-8">Avg. meters Drilled</div>
                <div className="col-4">
                    <input
                        className= "form-control form-control-sm"
                        type="number"
                        min="0"
                        placeholder="Avg Meters Drilled"
                        id={drillingInfo.id + 'avgMetersDrilled'}
                        value={drillingInfo.avgMetersDrilled}
                        onChange={onAvgMetersDrilledChange}
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
        
    )
}

const mapStateToProps = (state) => {
    return {
      drillingInfos: state.drillingInfos,
      piSheetListData: state.piSheetListData
  
    };
  };
  
  
  const mapDispatchToProps = (dispatch) => ({
    startEditDrillingInfo: (id, updates) => dispatch(startEditDrillingInfo(id, updates)),
    startRemoveDrillingInfo: (id) => dispatch(startRemoveDrillingInfo(id))
  })


export default connect(mapStateToProps, mapDispatchToProps)(DrillingInfoItem);