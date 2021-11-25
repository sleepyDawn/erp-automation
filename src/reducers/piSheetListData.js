
// PiSheetInfos Reducer

const piSheetListData = {
    shifts: ['SF1A', 'SF1B', 'SF1C', 'SF2A', 'SF2B', 'SF2C', 'SF3A', 'SF3B', 'SF3C'],
    locationObBench: ['OB BENCH-1', 'OB BENCH-2', 'OB BENCH-3', 'OB BENCH-4', 'OB BENCH-5'],
    resourceDrill: ['ELEC_160', 'IDM668'],
    drillOperator: ['O1', 'O2', 'O3', 'O4', 'O5'],
    drillHelperName: ['HELPER1', 'HELPER2', 'HELPER3'],
    resourceExcavator: ['EKG_468', 'CK_723'],
    // resourceExcavator: ['EKG_468', 'CK_723', 'EKG_473'],
    excavatorOperator: ['26231035', '26248527', '26248415', '26280867'],
    seamNo: ['6.22', '8.54', '9.44', '33.08' ],
    resourceDumper: ['60854', '60773', '60861'],
    dumperOperator: ['AKASH', 'RAMESH', 'SURESH', 'PRAKASH']

};
// const piSheetListData = {};

export default (state = piSheetListData, action) => {
    switch (action.type) {
        case "SET_PISHEETLISTDATA":
            return action.piSheetListData;
        
        default: 
            return state;

    }
        
  
  };