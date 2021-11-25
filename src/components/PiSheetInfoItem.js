import moment from 'moment';
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setControlRecipe, setPlantVal, setProcessOrderVal, setProductionDateVal, setShiftVal, startEditPISheetInfo } from "../actions/piSheetInfo";


export const PiSheetInfoItem = (props) => {
    const plant = props.piSheetInfos.plant
    const processOrder = props.piSheetInfos.processOrder
    const productionDate= props.piSheetInfos.productionDate
    const controlRecipe = props.piSheetInfos.controlRecipe

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

       }     
    };

    // const onPlantChange = (e) => {
    //     const currVal = e.target.value;
    //     if(!currVal || currVal.match(/^[0-9]*$/)) {
    //         // props.setPlantVal(currVal)
    //         props.startEditPISheetInfo({plant: currVal}, setPlantVal);
    //     }
    // }

    const onProcessOrderChange = (e) => {
        const currVal = e.target.value;
        if(!currVal || currVal.match(/^[0-9]*$/)) {
            // props.setProcessOrderVal(currVal);
            props.startEditPISheetInfo({processOrder: currVal}, setProcessOrderVal);

            // console.log("checking the curent target value : ", props.piSheetInfos.shift);
            // console.log(props);
        }
    }

    const onControlRecipeChange = (e) => {
        const currVal = e.target.value;
        if(!currVal || currVal.match(/^[0-9]*$/)) {
            console.log("checking control reciepe: ", currVal);
            props.startEditPISheetInfo({controlRecipe: currVal}, setControlRecipe);
        }
    }

    const onShiftChange = (e) => {
        
        const currVal = e.target.value;
        // checking if relay is changed or not
        props.startEditPISheetInfo({shift: currVal}, setShiftVal);
        if(props.piSheetInfos.shift.charAt(3) !== currVal.charAt(3)){
            console.log("checking if only relay is changed..");
            props.setInfosOnRelayChange(currVal.charAt(3)); 
        } 
    }
    
    // fetching all shifts list data
    const shifts = props.piSheetListData.shifts;

    return (
        <div className="col-12 pb-2">
            <div className="container bg-light">
                {/* <div className="row justify-content-between">
                    <div className="col-5">Plant</div>
                    <div className="col-7">
                        <input
                            className= "form-control form-control-sm"
                            type="text"
                            placeholder="Plant"
                            value={plant}
                            onChange={onPlantChange}
                        />
                    </div>
                    
                </div> */}
                <div className="row justify-content-between">
                    <div className="col-5">Process Order</div>
                    <div className="col-7">
                        <input
                            className= "form-control form-control-sm"
                            type="text"
                            placeholder="Process Order"
                            value={processOrder}
                            onChange={onProcessOrderChange}
                        />
                    </div>
                </div>
                <div className="row justify-content-between">
                    <div className="col-5">Control Recipe</div>
                    <div className="col-7">
                        <input
                            className= "form-control form-control-sm"
                            type="number"
                            placeholder="Control Recipe"
                            value={controlRecipe}
                            onChange={onControlRecipeChange}
                        />
                    </div>
                </div>
                <div className="row justify-content-between">
                    <div className="col-5">Date</div>
                    <div className="col-7">
                        <input
                            className= "form-control form-control-sm"
                            type="date"
                            value={moment(productionDate, "DD.MM.YYYY").format("YYYY-MM-DD")}
                            onChange={onDateChange}
                        />
                    </div>
                </div>
                <div className="row justify-content-between">
                    <div className="col-5">Shift</div>
                    <div className="col-7">
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
                </div>
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
    setPlantVal: (plant) => dispatch(setPlantVal(plant)),
    setProcessOrderVal: (processOrder) => dispatch(setProcessOrderVal(processOrder)),
    setProductionDateVal: (productionDate) => dispatch(setProductionDateVal(productionDate)),
    setShiftVal: (shift) => dispatch(setShiftVal(shift)),
    setControlRecipe: (controlRecipe) => dispatch(setControlRecipe(controlRecipe)),
    startEditPISheetInfo: (updates, setFunction) => dispatch(startEditPISheetInfo(updates,setFunction))
})

export default connect(mapStateToProps, mapDispatchToProps)(PiSheetInfoItem);