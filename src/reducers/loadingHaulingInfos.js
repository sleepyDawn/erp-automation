// LoadingHaulingInfos Reducer
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const loadingHaulingInfosReducerDefaultState = [
    {   
        id: uuidv4(),
        seamNo: '6.22',
        resourceExcavator: 'EKG_468',
        resourceDumper: '60854',
        dumperOperator: 'AKASH',
        operatingTime: 180,
        breakdownTime: 0,
        noOfTrips: 13
    },
    {   
        id: uuidv4(),
        seamNo: '9.44',
        resourceExcavator: 'CK_723',
        resourceDumper: '60773',
        dumperOperator: 'RAMESH',
        operatingTime: 210,
        breakdownTime: 0,
        noOfTrips: 16
    },
];

export default (state = loadingHaulingInfosReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_LOADINGHAULINGINFO':
      return [
        ...state,
        action.loadingHaulingInfo
      ];
    case 'REMOVE_LOADINGHAULINGINFO':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_LOADINGHAULINGINFO':
      return state.map((loadingHaulingInfo) => {
        if (loadingHaulingInfo.id === action.id) {
          return {
            ...loadingHaulingInfo,
            ...action.updates
          };
        } else {
          return loadingHaulingInfo;
        };
      });
    case "SET_LOADINGHAULINGINFOS": 
      return action.loadingHaulingInfos
    default:
      return state;
  }
};
