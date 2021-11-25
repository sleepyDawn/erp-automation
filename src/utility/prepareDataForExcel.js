
// updating resourcexcavator details according to excavator info in LoadingHauling info details
const updateExcavatorDetailInLoadinHaulingList = (loadingInfos, loadingHaulingInfos) => {
    const resourceExcavatorDetails = loadingInfos.map(loadingInfo => {
      const {resourceExcavator, location, excavatorOperator, ...others} =loadingInfo;
  
      return {resourceExcavator, location, excavatorOperator};
    })
 
    let updatedLoadingHaulingInfos = loadingHaulingInfos.map(loadingHaulingInfo => {
      let infos;
      resourceExcavatorDetails.forEach(detail => {
        if(detail.resourceExcavator === loadingHaulingInfo.resourceExcavator){
          infos =  { ...loadingHaulingInfo, excavatorOperator : detail.excavatorOperator, location: detail.location, };
        }
      })
  
      return infos;
    })
    console.log("checking  before loadingHaulingInfos in preparedata for excel: ", updatedLoadingHaulingInfos);
    // removing undefined from array of loadingHaulingInfos;
    updatedLoadingHaulingInfos = updatedLoadingHaulingInfos.filter(item => item !== undefined);
    console.log("checking after loadingHaulingInfos in preparedata for excel: ", updatedLoadingHaulingInfos);
    return updatedLoadingHaulingInfos;
  }




const prepareDataForExcel = (piSheetInfos, drillingInfos, loadingInfos, loadingHaulingInfos) => {

    loadingHaulingInfos = updateExcavatorDetailInLoadinHaulingList(loadingInfos, loadingHaulingInfos);
    
    
    // preparing the data to make arrary of array for excel download
    const { plant, processOrder, productionDate, shift, controlRecipe } = piSheetInfos;
    // const piSheetData = [Object.entries(piSheetInfos).map(i => i[0]),Object.entries(piSheetInfos).map(i => i[1])];
    const piSheetData = [
        ["plant", "processOrder", "productionDate", "shift", "controlRecipe"],
        [plant, processOrder, productionDate, shift, controlRecipe]
        ];

        // const { location, resourceDrill, drillOperator, helperName, operatingTime, breakdownTime, holesDrilled, avgMetersDrilled } = drillingInfos;
        //Preparing datas for excel download
        const drillingInfosBody = drillingInfos.map(({ location, resourceDrill, drillOperator, helperName, operatingTime, breakdownTime, holesDrilled, avgMetersDrilled }, index) => {
        return [ productionDate, shift, index + 1, location, resourceDrill, drillOperator, helperName, operatingTime, breakdownTime, holesDrilled, avgMetersDrilled ]
        })
    const drillingInfosData = [
        [ "productionDate", "shift", "lineNo", "location", "resourceDrill", "drillOperator", "helperName", "operatingTime", "breakdownTime", "holesDrilled", "avgMetersDrilled" ],
        ...drillingInfosBody
    ];

    const loadingInfosBody = loadingInfos.map(({location, resourceExcavator, excavatorOperator, helperName, operatingTime, breakdownTime}, index) => {
        return [productionDate, shift, index + 1, location, resourceExcavator, excavatorOperator, helperName, operatingTime, breakdownTime]
    });
    const loadingInfosData =[
        [ "productionDate", "shift", "lineNo", "location", "resourceExcavator", "excavatorOperator", "helperName", "operatingTime", "breakdownTime" ],
        ...loadingInfosBody
    ];

    

    // removing undefined value from loadingHaulingInfos, after checking for 
    // excavator in loading details,if it doesn't exist it will have undefined value
    loadingHaulingInfos = loadingHaulingInfos.filter((el) => el !== undefined);

    const loadingHaulingInfosBody =  loadingHaulingInfos.map(({
        seamNo,
        location,
        excavatorOperator,
        resourceExcavator, 
        resourceDumper, 
        dumperOperator, 
        operatingTime, 
        breakdownTime, 
        noOfTrips 
    }, index) => {
        return [
        productionDate,
        shift,
        index + 1,
        seamNo,
        location,
        excavatorOperator,
        resourceExcavator, 
        resourceDumper, 
        dumperOperator, 
        operatingTime, 
        breakdownTime, 
        noOfTrips 
        ]
    })
    const loadingHaulingInfosData = [
        ["productionDate", "shift", "lineNo", "seamNo", "location", "excavatorOperator", "resourceExcavator", "resourceDumper", "dumperOperator", "operatingTime", "breakdownTime", "noOfTrips"],
        ...loadingHaulingInfosBody
    ]

    return {
        piSheetData,
        drillingInfosData,
        loadingInfosData,
        loadingHaulingInfosData
    }
}


export default prepareDataForExcel;