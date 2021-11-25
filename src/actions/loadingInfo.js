import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from '@firebase/firestore';
import db from '../firebase/firebase'

// ADD_EXPENSE
export const addLoadingInfo = (loadingInfo) => ({
  type: 'ADD_LOADINGINFO',
  loadingInfo
});

// startAddLoadingInfo 
export const startAddLoadingInfo = (loadingInfoData = {}) => {
  return (dispatch, getState) => {
    const {
        location = '',
        resourceExcavator = '',
        excavatorOperator = '',
        helperName = '',
        operatingTime =  0,
        breakdownTime =  0,
    } = loadingInfoData;

    const loadingInfo = {
      location,
      resourceExcavator,
      excavatorOperator,
      helperName,
      operatingTime,
      breakdownTime,
    }
    const relay = getState().piSheetInfos.shift.charAt(3);
    const {plant = 2012, materialNumber = 4900000011 } = getState().piSheetInfos;

    const loadingInfosRef = collection(db, 'piSheetShiftData', `${plant}_${materialNumber}_${relay}`, 'loadingInfos');
    return addDoc(loadingInfosRef, loadingInfo)
      .then(docRef => {
        if(docRef.id) {
          return dispatch(addLoadingInfo({...loadingInfo, id: docRef.id}))
        } else {
          console.log("no such data added");
        }
      }).catch(e => {
        console.log("error while adding drilling data : ", e);
      })


  }
}

// EDIT_LOADINGINFO
export const editLoadingInfo = (id, updates) => ({
  type: 'EDIT_LOADINGINFO',
  id,
  updates
});

// start EDIT_LOADINGINFO
export const startEditLoadingInfo = (id, updates) => {
  return (dispatch, getState) => {
    const relay = getState().piSheetInfos.shift.charAt(3);
    const {plant = 2012, materialNumber = 4900000011 } = getState().piSheetInfos;

    const loadingInfoDocRef = doc(db, 'piSheetShiftData', `${plant}_${materialNumber}_${relay}`, 'loadingInfos', id);
    // updating redux before updating firebase
    dispatch(editLoadingInfo(id, updates));
    return setDoc(
      loadingInfoDocRef,
      updates,
      {merge: true}
    )
    .then(() => {
      
    })
    .catch(e => {
      console.log("error in update of loading info: ",e);
    })
     
  }
}

// REMOVE_LOADINGINFO
export const removeLoadingInfo = (id) => ({
  type: 'REMOVE_LOADINGINFO',
  id
});

// start REMOVE_LOADINGINFO
export const startRemoveLoadingInfo = (id) => {
  return (dispatch, getState) => {
    const relay = getState().piSheetInfos.shift.charAt(3);
    const {plant = 2012, materialNumber = 4900000011 } = getState().piSheetInfos;

    const loadingInfoDocRef = doc(db, 'piSheetShiftData', `${plant}_${materialNumber}_${relay}`, 'loadingInfos', id);
    // deleting in redux before updating firebase
    dispatch(removeLoadingInfo(id));
    return deleteDoc(
      loadingInfoDocRef
    )
    .then(() => {
      
    })
    .catch(e => {
      console.log("error in deleting of loading info: ",e);
    })
  }
}



// SET_LOADINGINFOS
export const setLoadingInfos = (loadingInfos) => ({
  type: "SET_LOADINGINFOS",
  loadingInfos
})

// start SET_LOADINGINFOS
export const startSetLoadingInfos = () => {
  return (dispatch, getState) => {
    const relay = getState().piSheetInfos.shift.charAt(3);
    const {plant = 2012, materialNumber = 4900000011 } = getState().piSheetInfos;

    const loadingInfosRef = collection(db, 'piSheetShiftData', `${plant}_${materialNumber}_${relay}`, 'loadingInfos');
    return getDocs(loadingInfosRef)
           .then(querySnapshot => {
              const loadingInfos = [];
              querySnapshot.forEach(doc => {
                loadingInfos.push({
                  id: doc.id,
                  ...doc.data(),
                })
              });
              // console.log("checking loading infos in startSetLoadingInfos....", loadingInfos);
              dispatch(setLoadingInfos(loadingInfos));
           })
  }
}
