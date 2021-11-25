// LoadingInfos Reducer
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

// const loadingInfosReducerDefaultState = [
//     {   
//         id: uuidv4(),
//         productionDate: moment().format("DD.MM.YYYY"),
//         shift: 'SF1A',
//         lineNo: 1,
//         location: 'OB BENCH-1',
//         resourceExcavator: 'EKG_468',
//         excavatorOperator: '26231035',
//         helperName: 'HELPER1',
//         operatingTime: 180,
//         breakdownTime: 0,
//     },
//     {   
//         id: uuidv4(),
//         productionDate: moment().format("DD.MM.YYYY"),
//         shift: 'SF1A',
//         lineNo: 2,
//         location: 'OB BENCH-2',
//         resourceExcavator: 'CK_723',
//         excavatorOperator: '26248527',
//         helperName: 'HELPER2',
//         operatingTime: 180,
//         breakdownTime: 0,
//     },
// ];

const loadingInfosReducerDefaultState = [];

export default (state = loadingInfosReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_LOADINGINFO':
      return [
        ...state,
        action.loadingInfo
      ];
    case 'REMOVE_LOADINGINFO':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_LOADINGINFO':
      return state.map((loadingInfo) => {
        if (loadingInfo.id === action.id) {
          return {
            ...loadingInfo,
            ...action.updates
          };
        } else {
          return loadingInfo;
        };
      });
    case "SET_LOADINGINFOS": 
      return action.loadingInfos
    default:
      return state;
  }
};
