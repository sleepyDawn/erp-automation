// import moment from "moment";

import moment from "moment";

// PiSheetInfos Reducer

const piSheetInfoDefaultState = {
  plant : 2012, 
  processOrder : 70003962, 
  productionDate : moment().format("DD.MM.YYYY"),
  shift: 'SF1A',
  materialNumber: 4900000011,
  controlRecipe: "100000000000022226"
};

export default (state = piSheetInfoDefaultState, action) => {
    switch (action.type) {
      case 'SET_PLANT':
        return {
          ...state,
          plant: action.plant
        };
      case 'SET_PROCESSORDER':
        return {
          ...state,
          processOrder: action.processOrder
        };
      case 'SET_MATERIALNUMBER':
        return {
          ...state,
          materialNumber: action.materialNumber
        };
      case 'SET_CONTROLRECIPE': 
        return {
          ...state,
          controlRecipe: action.controlRecipe
        }
      case 'SET_PRODUCTIONDATE':
        return {
          ...state,
          productionDate: action.productionDate
        };
      case 'SET_SHIFT':
        return {
          ...state,
          shift: action.shift
        };
      case 'SET_PISHEETINFO': 
        return action.piSheetInfos
      
      default:
        return state;
    }
  };