import moment from 'moment';
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setProductionDateVal, setShiftVal, startEditPISheetInfo, startSetAllInfos } from "../actions/piSheetInfo";
import { editDrillingInfo } from '../actions/drillingInfo';
import { editLoadingInfo } from "../actions/loadingInfo";
import { editLoadingHaulingInfo } from '../actions/loadingHaulingInfo';
import PiSheetInfoItem  from './PiSheetInfoItem';

export const PiSheetInfo = (props) => {
    
    const productionDate= props.piSheetInfos.productionDate

      // For toggling between complete info and trimmed info
    const [editButtonStatus, setEditButtonStatus] = useState(false);
    const onCompleteEditButtonClick = (e) => {
        if(!editButtonStatus){
        setEditButtonStatus(true);
        } else {
        setEditButtonStatus(false);
        }
    }

    const onDateChange = (e) => {

        // const regex = /^[0-9]{2}[\.]{1}[0-9]{2}[\.]{1}[0-9]{4}$/g;
        // console.log("checking date : ", e.target.value);
        // console.log(moment(currDate, "DD.MM.YYYY").format("YYYY-MM-YY"));
        // console.log("testing regex: ", regex.test(e.target.value));
        
        if(e.target.value){
            //do something
            const dateMomentObj = moment(e.target.value, "YYYY-MM-DD");
            // console.log("checking date : ", e.target.value, dateMomentObj);
            
          props.startEditPISheetInfo({productionDate: dateMomentObj.format("DD.MM.YYYY")}, setProductionDateVal);
       
        // Not updating other infos date value

        //   props.drillingInfos.forEach(drillingInfo => {
        //       props.editDrillingInfo(drillingInfo.id, {productionDate: dateMomentObj.format("DD.MM.YYYY")})
        //   });
        //   props.loadingInfos.forEach(loadingInfo => {
        //       props.editLoadingInfo(loadingInfo.id, {productionDate: dateMomentObj.format("DD.MM.YYYY")})
        //   });
        //   props.loadingHaulingInfos.forEach(loadingHaulingInfo => {
        //       props.editLoadingHaulingInfo(loadingHaulingInfo.id, {productionDate: dateMomentObj.format("DD.MM.YYYY")})
        //   });

       }     
        
      };

    const shifts = props.piSheetListData.shifts;
    
    const onShiftChange = (e) => {
        
        const currVal = e.target.value;
        // props.piSheetInfos.shift.charAt[3]
        // checking if relay is changed or not
        props.startEditPISheetInfo({shift: currVal}, setShiftVal);
        if(props.piSheetInfos.shift.charAt(3) !== currVal.charAt(3)){
            console.log("checking if only relay is changed..");
            props.setInfosOnRelayChange(currVal.charAt(3)); 
        } 
        // Not updating shifts in other infos, just using it at last while downloading
        // else {
        //     console.log("checking else for shiftNum change..");
        //     props.drillingInfos.forEach(drillingInfo => {
        //         props.editDrillingInfo(drillingInfo.id, {shift: currVal})
        //     });
        //     props.loadingInfos.forEach(loadingInfo => {
        //         props.editLoadingInfo(loadingInfo.id, {shift: currVal})
        //     });
        //     props.loadingHaulingInfos.forEach(loadingHaulingInfo => {
        //         props.editLoadingHaulingInfo(loadingHaulingInfo.id, {shift: currVal})
        //     });
        // }
       
       
        
        
    }

    return (
        <div className="container mt-2" id="piSheetInfo">
            <div className="row">
                
                <div className="col-6">
                Date
                </div>
                <div className="col-4">
                Shift
                </div>
                <div className="col-2">
                Edit
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <input
                        className= "form-control form-control-sm"
                        type="date"
                        value={moment(productionDate, "DD.MM.YYYY").format("YYYY-MM-DD")}
                        onChange={onDateChange}
                    />
                </div>
                <div className="col-4">
                    <select 
                        aria-label="shifts"
                        className= "form-select form-select-sm"
                        onChange={onShiftChange} 
                        value= {props.piSheetInfos.shift}
                        >   
                            {shifts.map(shift => (
                                <option key={`${shift}adf`} value={shift}>{shift}</option>
                            ))}
                    </select>
                </div>
                <div className="col-2">
                    <button 
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={onCompleteEditButtonClick}
                    >
                    {!editButtonStatus ? <>+</> : <>-</>}  
                    </button>
                </div>
                { editButtonStatus && 
                    <PiSheetInfoItem 
                    piSheetInfos={props.piSheetInfos}
                    setInfosOnRelayChange={props.setInfosOnRelayChange}
                    ></PiSheetInfoItem>
                }           
            </div>
        </div>
      );
}

const mapStateToProps = (state) => {
    
    return {
        piSheetInfos: state.piSheetInfos,
        piSheetListData: state.piSheetListData,
    }
}


const mapDispatchToProps = (dispatch) => ({
    setProductionDateVal: (productionDate) => dispatch(setProductionDateVal(productionDate)),
    setShiftVal: (shift) => dispatch(setShiftVal(shift)),
    startEditPISheetInfo: (updates, setFunction) => dispatch(startEditPISheetInfo(updates,setFunction))
})

export default connect(mapStateToProps, mapDispatchToProps)(PiSheetInfo);