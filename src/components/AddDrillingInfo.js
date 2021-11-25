import React, { useState } from "react";
import { connect } from "react-redux"
import { startAddDrillingInfo } from "../actions/drillingInfo";


export const AddDrillingInfo = (props) => {

    const piSheetListData = props.piSheetListData;
    let drillingInfoData = {   
        location: piSheetListData.locationObBench[0],
        resourceDrill: piSheetListData.resourceDrill[0],
        drillOperator: piSheetListData.drillOperator[0],
        helperName: piSheetListData.drillHelperName[0],
        operatingTime: 180,
        breakdownTime: 0,
        holesDrilled: 14,
        avgMetersDrilled: 7.61
    }
    const [drillingInfo, setDrillingInfo] = useState(drillingInfoData);

    const onLocationChange = (e) => {
        setDrillingInfo({ ...drillingInfo, location: e.target.value })
    }
    
      const onResourceDrillChange = (e) => {
        setDrillingInfo({ ...drillingInfo, resourceDrill: e.target.value })
      }
    
      const onDrillOperatorChange = (e) => {
        setDrillingInfo({ ...drillingInfo, drillOperator: e.target.value })
      
      }
    
      const onHelperNameChange = (e) => {
        setDrillingInfo({ ...drillingInfo, helperName: e.target.value })
      
      }
    
      const onOperatingTimeChange = (e) => {
        setDrillingInfo({ ...drillingInfo, operatingTime: e.target.value })
      
      }
      const onBreakdownTimeChange = (e) => {
        setDrillingInfo({ ...drillingInfo, breakdownTime: e.target.value })
      
      }
      const onHolesDrilledChange = (e) => {
        setDrillingInfo({ ...drillingInfo, holesDrilled: e.target.value })
      
      }
      const onAvgMetersDrilledChange = (e) => {
        setDrillingInfo({ ...drillingInfo, avgMetersDrilled: e.target.value })
      
      }

    const onSubmitDrillingInfo = () => {
        props.startAddDrillingInfo(drillingInfo).then(d => {
            props.onAddDrillButtonStatusChange();
        })
        
    }

    const onCancelSubmit = () => {
        props.onAddDrillButtonStatusChange();
    }
    
    return (
     
    <div className="container bg-light mt-4">
        <div className="row">
            <p className="h6 text-center">
                Add Drill
            </p>
        </div>
        <div className="row justify-content-between">
            <div className="col-5">Location</div>
            <div className="col-7">
                <select 
                    className= "form-select form-select-sm"
                    aria-label="location"
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
                    value={drillingInfo.avgMetersDrilled}
                    onChange={onAvgMetersDrilledChange}
                />
            </div>
        </div>
        <div className="row">
            <p className="h6 text-center">
                <button 
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={onSubmitDrillingInfo}
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
    startAddDrillingInfo: (drillingInfo) => dispatch(startAddDrillingInfo(drillingInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddDrillingInfo);