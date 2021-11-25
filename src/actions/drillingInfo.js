import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from '@firebase/firestore';
import db from '../firebase/firebase'


// ADD_DRILLINGINFO
export const addDrillingInfo = (drillingInfo) => ({
  type: 'ADD_DRILLINGINFO',
  drillingInfo
});


// startAddDrillingInfo
export const startAddDrillingInfo = (drillingInfoData = {}) => {
  return (dispatch, getState) => {
    const {     
      location = '',
      resourceDrill = '',
      drillOperator = '',
      helperName = '',
      operatingTime =  0,
      breakdownTime =  0,
      holesDrilled = 0,
      avgMetersDrilled = 0
    } = drillingInfoData;

    const drillingInfo = {
      location,
      resourceDrill,
      drillOperator,
      helperName,
      operatingTime,
      breakdownTime,
      holesDrilled,
      avgMetersDrilled
    }

    const relay = getState().piSheetInfos.shift.charAt(3);
    const {plant = 2012, materialNumber = 4900000011 } = getState().piSheetInfos;

    const drillingInfosRef = collection(db, 'piSheetShiftData', `${plant}_${materialNumber}_${relay}`, 'drillingInfos');
    return addDoc(drillingInfosRef, drillingInfo)
      .then(docRef => {
        if(docRef.id) {
          return dispatch(addDrillingInfo({...drillingInfo, id: docRef.id}))
        } else {
          console.log("no such data added");
        }
      }).catch(e => {
        console.log("error while adding drilling data : ", e);
      })


  }
}

// EDIT_DRILLINGINFO
export const editDrillingInfo = (id, updates) => ({
  type: 'EDIT_DRILLINGINFO',
  id,
  updates
});

// start EDIT_DRILLINGINFO

export const startEditDrillingInfo = (id, updates) => {
  return (dispatch, getState) => {
    const relay = getState().piSheetInfos.shift.charAt(3);
    const {plant = 2012, materialNumber = 4900000011 } = getState().piSheetInfos;

    const drillingInfoDocRef = doc(db, 'piSheetShiftData', `${plant}_${materialNumber}_${relay}`, 'drillingInfos', id);
    // updating redux before updating firebase
    dispatch(editDrillingInfo(id, updates));
    return setDoc(
      drillingInfoDocRef,
      updates,
      {merge: true}
    )
    .then(() => {
      
    })
    .catch(e => {
      console.log("error in update of drilling info: ",e);
    })
     
  }
}

// REMOVE_DRILLINGINFO
export const removeDrillingInfo = (id) => ({
  type: 'REMOVE_DRILLINGINFO',
  id
});

// start REMOVE_DRILLINGINFO

export const startRemoveDrillingInfo = (id) => {
  return (dispatch, getState) => {
    const relay = getState().piSheetInfos.shift.charAt(3);
    const {plant = 2012, materialNumber = 4900000011 } = getState().piSheetInfos;

    const drillingInfoDocRef = doc(db, 'piSheetShiftData', `${plant}_${materialNumber}_${relay}`, 'drillingInfos', id);

    // deleting in  redux before deleting doc in firebase
    dispatch(removeDrillingInfo(id));
    return deleteDoc(
      drillingInfoDocRef
    )
    .then(() => {
      
    })
    .catch(e => {
      console.log("error in deleting of drilling info: ",e);
    })

  }
}




// SET_DRILLINGINFOS
export const setDrillingInfos = (drillingInfos) => {
  return {
    type: "SET_DRILLINGINFOS",
    drillingInfos
  }
}

// start set Drilling infos
export const startSetDrillingInfos = () => {
  return (dispatch, getState) => {
    const relay = getState().piSheetInfos.shift.charAt(3);
    const {plant = 2012, materialNumber = 4900000011 } = getState().piSheetInfos;

    const drillingInfosRef = collection(db, 'piSheetShiftData', `${plant}_${materialNumber}_${relay}`, 'drillingInfos');
    return getDocs(drillingInfosRef)
           .then(querySnapshot => {
              const drillingInfos = [];
              querySnapshot.forEach(doc => {
                drillingInfos.push({
                  id: doc.id,
                  ...doc.data(),
                })
              });
              // console.log("checking drilling infos in startSetDrillingInfos....", drillingInfos);
              dispatch(setDrillingInfos(drillingInfos));
           })
  }
}
