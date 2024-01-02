import Graph from "./db_main/Graph";
import Db_cards from "./db_main/Db_cards";
import { useState,useEffect } from "react";
import TopUpVault from "./popups/TopUpVault";
import Db_Navbar from "./db_header/Db_Navbar";
import { useWallet } from "@txnlab/use-wallet";
import WithdrawAsset from "./popups/WithdrawAsset";
import VaultDropdown from "./db_main/VaultDropdown";
import SkeletonLoader from "../Loaders/SkeletonLoader";
import EmptyContent from "../MiscComponents/EmptyContent";
import { getZVaults } from "../ContractMethods/ContractCalls";

const Dashboard = () => {
    const {activeAddress } = useWallet();
    const [vaults,setVaults]= useState([]);
    const [filterBy,setFilterBY] = useState("All");
    const [showPopUp,setShowPopUp] = useState({show:false,vaultID:null});
    const [loading,setLoading]  = useState({loading:false,error:null,data:null});

    

    useEffect(()=>{
        setLoading({loading:true,error:null,data:null})

        getZVaults().then((res)=>{
            setLoading({loading:false,error:null,data:res})
        }).catch((res)=>{
            setLoading({loading:false,error:res,data:null})
        })
        
    },[])


    useEffect(()=>{
        if (loading.data) {
            if (filterBy !== "All") {
                setVaults(loading.data.filter(list => list[1] === activeAddress))
            } else {
                setVaults(loading.data)
            }
        }
    },[loading.data,activeAddress,filterBy])
    


    return (
        <>
            <div className="font-display bg-[#E6E6E6] w-full pb-10 min-h-screen">
                <header className="bg-[#111] h-20 flex items-center">
                    <div className="md:w-[75%] w-[90%] mx-auto">
                    <Db_Navbar />
                    </div>

                </header>
                <main>
                    <div className="md:w-[75%] w-[90%] mx-auto">
                        <Graph />
                        <VaultDropdown filterBy={filterBy} setFilterBY={setFilterBY}/>
                        <div className="mt-12 md:mt-16 flex flex-wrap place-items-center gap-8 relative">
                            {
                                vaults?.map((vault)=>{
                                    return(<Db_cards key={vault[vault.length-1]} vaultInfo={vault} setShowPopUp={setShowPopUp}/>)
                                })
                            }
                        </div>
                        {vaults.length === 0 && !loading.loading && <EmptyContent msg={"No Vault was found"}/>}
                        {loading.loading && <SkeletonLoader/>}
                    </div>

                </main>
            </div>

            {showPopUp.show && !showPopUp?.locked && <TopUpVault vaultInfo={showPopUp} setShowPopUp={setShowPopUp}/>}
            {showPopUp.show && showPopUp?.locked && <WithdrawAsset vaultInfo={showPopUp} setShowPopUp={setShowPopUp}/>}


        </>
    )
}

export default Dashboard;