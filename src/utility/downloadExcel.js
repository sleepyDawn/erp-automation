import { setDoc } from '@firebase/firestore';
import * as XLSX from 'xlsx';
import db from '../firebase/firebase';
import { doc } from '@firebase/firestore';
import prepareDataForExcel from './prepareDataForExcel';





//  const updatePiSheetShiftDataInFireBase = (piSheetInfos,drillingInfos,loadingInfos,loadingHaulingInfos) => {
//    // Updating the firebase data with piSheetShiftData
//    const piSheetShiftData = {};

//    // fixing the material number for Ob 
//    const materialNumber = 4900000011;
//    // distribuiting shift into shift and relay eg: sf1a = 1 and a
//    const shift = piSheetInfos.shift.charAt(2)*1;
//    const relay = piSheetInfos.shift.charAt(3);
  
//    piSheetShiftData.piSheetInfos = {...piSheetInfos, shift,relay, materialNumber}
//    piSheetShiftData.drillingInfos = drillingInfos;
//    piSheetShiftData.loadingInfos = loadingInfos;
//    piSheetShiftData.loadingHaulingInfos = loadingHaulingInfos;

//    return setDoc(
//      doc(
//        db,
//        "piSheetShiftData" ,
//        `${piSheetInfos.plant}_${materialNumber}_${relay}`),
//        piSheetShiftData)
     
//  }


const downloadExcel = async ({ piSheetInfos,drillingInfos,loadingInfos,loadingHaulingInfos }) => {

  

  try {
    // await updatePiSheetShiftDataInFireBase(piSheetInfos,drillingInfos,loadingInfos,loadingHaulingInfos)
   

    // console.log("checking firebase reference: ", dataRef);
    
    const updatedData = await new Promise((resolve, reject) => {

      const {piSheetData, drillingInfosData, loadingInfosData, loadingHaulingInfosData} = prepareDataForExcel(piSheetInfos, drillingInfos, loadingInfos, loadingHaulingInfos);
    
        const wb =  XLSX.utils.book_new();
        wb.Props = {
          Title: "React-To-excel",
        }
        
        // Making sheets according to data
        wb.SheetNames.push("DataSheet");
        wb.SheetNames.push("DrillingInfos");
        wb.SheetNames.push("LoadingInfos");
        wb.SheetNames.push("LoadingHaulingInfos");

        const ws_data = XLSX.utils.aoa_to_sheet(piSheetData);;
        const ws_dataDrilling = XLSX.utils.aoa_to_sheet(drillingInfosData);
        const ws_dataLoading = XLSX.utils.aoa_to_sheet(loadingInfosData);
        const ws_dataLoadingHauling = XLSX.utils.aoa_to_sheet(loadingHaulingInfosData);

        wb.Sheets["DataSheet"] = ws_data;
        wb.Sheets["DrillingInfos"] = ws_dataDrilling;
        wb.Sheets["LoadingInfos"] = ws_dataLoading;
        wb.Sheets["LoadingHaulingInfos"] = ws_dataLoadingHauling;
        //Buffer
        const buf = XLSX.write(wb, {bookType: "xlsx", type: "buffer"});
        //Binary string
        const wbOut = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
        // Download
        XLSX.writeFile(wb, "React-To-Excel.xlsx")
    
      });

    console.log("checking updated data : ", JSON.stringify(updatedData));

 
  } catch(e) {
    console.log(e);
  }

 
}


export default downloadExcel;