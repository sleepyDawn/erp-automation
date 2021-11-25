import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from '@firebase/firestore';
import db from '../firebase/firebase'


// ADD_LOADINGHAULINGINFO
export const addLoadingHaulingInfo = (loadingHaulingInfo) => ({
  type: 'ADD_LOADINGHAULINGINFO',
  loadingHaulingInfo
});

// startAddLoadingInfo
export const startAddLoadingHaulingInfo = (loadingHaulingData = {}) => {
  return (dispatch, getState) => {
    const {
        seamNo = '',
        resourceExcavator = '',
        resourceDumper = '',
        dumperOperator = '',
        operatingTime =  0,
        breakdownTime =  0,
        noOfTrips = 0
    } = loadingHaulingData;

    const loadingHaulingInfo = {
      seamNo,
      resourceExcavator,
      resourceDumper,
      dumperOperator,
      operatingTime,
      breakdownTime,
      noOfTrips,
    }

    const relay = getState().piSheetInfos.shift.charAt(3);
    const {plant = 2012, materialNumber = 4900000011 } = getState().piSheetInfos;

    const loadingHaulingInfosRef = collection(db, 'piSheetShiftData', `${plant}_${materialNumber}_${relay}`, 'loadingHaulingInfos');
    return addDoc(loadingHaulingInfosRef, loadingHaulingInfo)
      .then(docRef => {
        if(docRef.id) {
          return dispatch(addLoadingHaulingInfo({...loadingHaulingInfo, id: docRef.id}))
        } else {
          console.log("no such data added");
        }
      }).catch(e => {
        console.log("error while adding loading hauling data : ", e);
      })
  }
}


// EDIT_LOADINGHAULINGINFO
export const editLoadingHaulingInfo = (id, updates) => ({
  type: 'EDIT_LOADINGHAULINGINFO',
  id,
  updates
});

// start EDIT_LOADINGHAULINGINFO
export const startEditLoadingHaulingInfo = (id, updates) => {
  return (dispatch, getState) => {
    const relay = getState().piSheetInfos.shift.charAt(3);
    const {plant = 2012, materialNumber = 4900000011 } = getState().piSheetInfos;

    const loadingHaulingInfoDocRef = doc(db, 'piSheetShiftData', `${plant}_${materialNumber}_${relay}`, 'loadingHaulingInfos', id);
    // updating redux before updating firebase
    dispatch(editLoadingHaulingInfo(id, updates));
    return setDoc(
      loadingHaulingInfoDocRef,
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

// REMOVE_LOADINGHAULINGINFO
export const removeLoadingHaulingInfo = (id) => ({
  type: 'REMOVE_LOADINGHAULINGINFO',
  id
});

// start REMOVE_LOADINGHAULINGINFO
export const startRemoveLoadingHaulingInfo = (id) => {
  return (dispatch, getState) => {
    const relay = getState().piSheetInfos.shift.charAt(3);
    const {plant = 2012, materialNumber = 4900000011 } = getState().piSheetInfos;

    const loadingHaulingInfoDocRef = doc(db, 'piSheetShiftData', `${plant}_${materialNumber}_${relay}`, 'loadingHaulingInfos', id);
    // updating redux before updating firebase
    dispatch(removeLoadingHaulingInfo(id));
    return deleteDoc(
      loadingHaulingInfoDocRef
    )
    .then(() => {
      
    })
    .catch(e => {
      console.log("error in deleting of loadinghauling info: ", e);
    })
  }
}



// SET_LOADINGHAULINGINFOS
export const setLoadingHaulingInfos = (loadingHaulingInfos) => ({
  type: "SET_LOADINGHAULINGINFOS",
  loadingHaulingInfos
})

// start SET_LOADINGHAULINGINFOS
export const startSetLoaadingHaulingInfos = () => {
  return (dispatch, getState) => {
    const relay = getState().piSheetInfos.shift.charAt(3);
    const {plant = 2012, materialNumber = 4900000011 } = getState().piSheetInfos;

    const loadingHaulingInfosRef = collection(db, 'piSheetShiftData', `${plant}_${materialNumber}_${relay}`, 'loadingHaulingInfos');
    return getDocs(loadingHaulingInfosRef)
           .then(querySnapshot => {
              const loadingHaulingInfos = [];
              querySnapshot.forEach(doc => {
                loadingHaulingInfos.push({
                  id: doc.id,
                  ...doc.data(),
                })
              });
              // console.log("checking loadinghauling infos in startSetLoadinghaulingInfos....", loadingHaulingInfos);
              dispatch(setLoadingHaulingInfos(loadingHaulingInfos));
           })
  }
}

