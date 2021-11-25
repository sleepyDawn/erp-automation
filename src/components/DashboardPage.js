import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import DrillingInfosList from "./DrillingInfosList";
import LoadingInfosList  from "./LoadingInfosList";
import LoadingHaulingInfosList from "./LoadingHaulingInfosList";
import PiSheetNav from "./PiSheetNav";

import  PiSheetInfo  from "./PiSheetInfo";

import { startSetPISheetInfos } from "../actions/piSheetInfo";
import { startSetDrillingInfos } from "../actions/drillingInfo";
import { startSetLoadingInfos } from "../actions/loadingInfo";
import { startSetLoaadingHaulingInfos } from "../actions/loadingHaulingInfo";

import AddDrillingInfo  from "./AddDrillingInfo";
import AddLoadingInfo  from "./AddLoadingInfo";
import AddLoadingHaulingInfo  from "./AddLoadingHaulingInfo";


export const DashboardPage = (props) => {

    // For selection of info to be displayed
    const [infoSelected, setInfoSelected] = useState("drilling");
    // let infoJsx = <DrillingInfosList></DrillingInfosList>
    let infoJsx;

    // For adding drilling machine info
    const [addDrillButtonStatus, setAddDrillbuttonStatus] = useState(false);
    const onAddDrillButtonStatusChange = () => {
        setAddDrillbuttonStatus(!addDrillButtonStatus);
    }
    // For adding loading machine info
    const [addLoadButtonStatus, setAddLoadbuttonStatus] = useState(false);
    const onAddLoadButtonStatusChange = () => {
        setAddLoadbuttonStatus(!addLoadButtonStatus);
    }
    // For adding hauling machine info
    const [addLoadHaulButtonStatus, setAddLoadHaulbuttonStatus] = useState(false);
    const onAddLoadHaulButtonStatusChange = () => {
        setAddLoadHaulbuttonStatus(!addLoadHaulButtonStatus);
    }
    
    
    switch (infoSelected) {
        case 'drilling': 
            infoJsx = addDrillButtonStatus ? 
                        <AddDrillingInfo onAddDrillButtonStatusChange ={onAddDrillButtonStatusChange}></AddDrillingInfo> : 
                        <DrillingInfosList onAddDrillButtonStatusChange ={onAddDrillButtonStatusChange}></DrillingInfosList>
 
            break;
        case 'loading':
            infoJsx = addLoadButtonStatus ?
                        <AddLoadingInfo onAddLoadButtonStatusChange ={onAddLoadButtonStatusChange}></AddLoadingInfo> :
                        <LoadingInfosList onAddLoadButtonStatusChange ={onAddLoadButtonStatusChange}></LoadingInfosList>
            break;
        case 'hauling':
            infoJsx = addLoadHaulButtonStatus ?
                        <AddLoadingHaulingInfo onAddLoadHaulButtonStatusChange={onAddLoadHaulButtonStatusChange}></AddLoadingHaulingInfo> :
                        <LoadingHaulingInfosList onAddLoadHaulButtonStatusChange={onAddLoadHaulButtonStatusChange}></LoadingHaulingInfosList>

            break;
        default: 
            infoJsx = addDrillButtonStatus ? 
                        <AddDrillingInfo onAddDrillButtonStatusChange ={onAddDrillButtonStatusChange}></AddDrillingInfo> : 
                        <DrillingInfosList onAddDrillButtonStatusChange ={onAddDrillButtonStatusChange}></DrillingInfosList>

 
        
    }

    const onInfoSelection = (info) => {
        setInfoSelected(info);
        
    }

    // Trying to update whole piSheetData according to shift
    const [relay, setRelay] = useState(props.piSheetInfos.shift.charAt(3));

    const setInfosOnRelayChange = (value) => {
        setRelay(value);
    }
    // const [isFetchingData, setIsFetchingData] = useState(false);
    useEffect(() => {

        try {
            // props.startSetPISheetInfos();
            props.startSetDrillingInfos();
            props.startSetLoadingInfos();
            props.startSetLoaadingHaulingInfos();
        } catch (error) {
            console.log(error);
        }
        
        
    }, [relay])

    return (
        <div className="dashboard">
            <PiSheetInfo setInfosOnRelayChange={setInfosOnRelayChange}></PiSheetInfo>
            <PiSheetNav 
                onInfoSelection={onInfoSelection} 
            ></PiSheetNav>
            {infoJsx}
            
            
        </div>
    )
}


const mapStateToProps = (state) => {
    
    return {
        piSheetInfos: state.piSheetInfos,
        piSheetListData: state.piSheetListData,
        drillingInfos: state.drillingInfos,
        loadingInfos: state.loadingInfos,
        loadingHaulingInfos: state.loadingHaulingInfos

    }
}

const mapDispatchToProps = (dispatch) => ({
    startSetPISheetInfos: () => dispatch(startSetPISheetInfos()),
    startSetDrillingInfos: () => dispatch(startSetDrillingInfos()),
    startSetLoadingInfos: () => dispatch(startSetLoadingInfos()),
    startSetLoaadingHaulingInfos: () => dispatch(startSetLoaadingHaulingInfos())

})
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
