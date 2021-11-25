// DrillingInfos Reducer
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

// const drillingInfosReducerDefaultState = [
//     {   
//         id: uuidv4(),
//         location: 'OB BENCH-1',
//         resourceDrill: 'IDM668',
//         drillOperator: 'O1',
//         helperName: 'HELPER1',
//         operatingTime: 180,
//         breakdownTime: 0,
//         holesDrilled: 14,
//         avgMetersDrilled: 7.61
//     },
//     {   
//         id: uuidv4(),
//         location: 'OB BENCH-2',
//         resourceDrill: 'ELEC_160',
//         drillOperator: 'O2',
//         helperName: 'HELPER2',
//         operatingTime: 180,
//         breakdownTime: 0,
//         holesDrilled: 7,
//         avgMetersDrilled: 7.61
//     },
// ];

const drillingInfosReducerDefaultState = [];

export default (state = drillingInfosReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_DRILLINGINFO':
      return [
        ...state,
        action.drillingInfo
      ];
    case 'REMOVE_DRILLINGINFO':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_DRILLINGINFO':
      return state.map((drillingInfo) => {
        if (drillingInfo.id === action.id) {
          return {
            ...drillingInfo,
            ...action.updates
          };
        } else {
          return drillingInfo;
        };
      });
    case "SET_DRILLINGINFOS": 
      return action.drillingInfos
    default:
      return state;
  }
};
