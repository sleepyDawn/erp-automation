import { doc, getDoc } from "@firebase/firestore";
import db from "../firebase/firebase";
// import piSheetListData from "../reducers/piSheetListData";

// SET_PISHEETLISTDATA
export const setPiSheetListData = (piSheetListData) => ({
    type: "SET_PISHEETLISTDATA",
    piSheetListData,
})


export const startSetPiSheetListData = () => {
    return (dispatch, getState) => {
        const docRef = doc(db, "piSheetListData", "2012");
        return getDoc(docRef)
            .then(docSnap => {
                    
                if (docSnap.exists()) {
                    const {...piSheetListData} = docSnap.data();
                    // console.log("checking after spread operator:: ", piSheetListData);
                    dispatch(setPiSheetListData(piSheetListData));
                    
                } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                }
                
            })
    }
}


// const docSnap = await getDoc(docRef);

