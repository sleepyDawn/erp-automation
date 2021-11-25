import { doc, getDoc, setDoc } from "@firebase/firestore";
import moment from "moment"
import db from '../firebase/firebase';
import {editDrillingInfo, setDrillingInfos} from '../actions/drillingInfo';
import {editLoadingInfo, setLoadingInfos} from "../actions/loadingInfo";
import { editLoadingHaulingInfo, setLoadingHaulingInfos } from "./loadingHaulingInfo";


// SET_PLANT
export const setPlantVal = (updates) => {
    const {plant = 2012} = updates;
    return {
        type: 'SET_PLANT',
        plant
    }
}



// SET_PROCESSORDER
export const setProcessOrderVal = (updates) => {
    const {processOrder = 0} = updates;
    return {
        type: 'SET_PROCESSORDER',
        processOrder
    }
}

// SET_MATERIALNUMBER
export const setMaterialNumber = (updates) => {
    const {materialNumber = 4900000011} = updates;
    return {
        type: 'SET_MATERIALNUMBER',
        materialNumber
    }
}

// need of addition of control recipe for filling piSheet a/c to processOrder
// as it different for different process order
// SET_CONTROLRECIPE
export const setControlRecipe = (updates) => {
    const {controlRecipe = "100000000000022226"} = updates;
    return {
        type: "SET_CONTROLRECIPE",
        controlRecipe
    }
}


// SET_PRODUCTIONDATE
export const setProductionDateVal = (updates) => {
    const {productionDate = moment().format("DD.MM.YYYY")} = updates;
    return {
        type: 'SET_PRODUCTIONDATE',
        productionDate
    }
}

// SET_SHIFT
export const setShiftVal = (updates) => {
    const {shift = 'SF1A'} = updates;
    return {
        type: 'SET_SHIFT',
        shift
    }
}

// start EDIT_LOADINGHAULINGINFO
export const startEditPISheetInfo = (updates, setFunction) => {
    return (dispatch, getState) => {
      const {plant = 2012, materialNumber = 4900000011 } = getState().piSheetInfos;
  
      const piSheetInfoDocRef = doc(db, 'piSheetInfos', `${plant}_${materialNumber}`);
    //   here setFunction is different set functions defined above, eg: setShiftVal
      dispatch(setFunction(updates));
      const {shift} = updates;
      if(shift) {
          updates = {
              relay: shift.charAt(3),
              shiftNum: shift.charAt(2)
          }
      }
      return setDoc(
        piSheetInfoDocRef,
        updates,
        {merge: true}
      )
      .then(() => {
        
      })
      .catch(e => {
        console.log("error in update of loadingHauling info: ",e);
      })
       
    }
}

// SET_PISHEETINFO
export const setPISheetInfos = (piSheetInfos) => {
    return {
        type: 'SET_PISHEETINFO',
        piSheetInfos
    }
}

// Starting to set SET_PISHEETINFO
export const startSetPISheetInfos = () => {
    return (dispatch, getState) => {
        const {plant, materialNumber} = getState().piSheetInfos;
        const docRef = doc(db, "piSheetInfos", `${plant}_${materialNumber}`);
        return getDoc(docRef)
               .then(docSnap => {
                   if(docSnap.exists()){
                       const { ...piSheetInfosData } = docSnap.data();
                       const {shiftNum, relay, ...piSheetInfo} = piSheetInfosData;
                       piSheetInfo.shift = `SF${shiftNum}${relay}`;
                    //    console.log("checking updated pisheetInfos from firebase: ", piSheetInfo);
                       dispatch(setPISheetInfos(piSheetInfo));
                    
                   } else {
                       console.log("No such document");
                   }
                   
               })
    }
}
