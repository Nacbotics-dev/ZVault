import { useState,useEffect } from "react";
import { Doughnut } from 'react-chartjs-2';
import OptInAsset from "../popups/OptInAsset";
import CreateVault from "../popups/CreateVault";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getAssets } from "../../ContractMethods/ContractCalls";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.plugins.legend.display = false;

const Graph = () => {
    const [labels,setLabels] = useState([])
    const [assetAmounts,setAssetAmounts] = useState([])
    const [showPopUp,setShowPopUp] = useState({show:false,type:null});

    useEffect(()=>{
        getAssets().then((res)=>{
            setLabels(res.map((lables)=>lables.asset))
            setAssetAmounts(res.map((lables)=>lables.amount))


        })
    },[])

    


    const data = {
        labels: labels,
        legend:false,
        datasets: [
          {
            label: 'Locked Assets By Volume',
            data: assetAmounts,
            backgroundColor: [
              '#CDA767',
              '#376A49',
              '#809A17',
              '#698181',
            ],
            borderColor: [
              '#CDA767',
              '#376A49',
              '#809A17',
              '#698181',
            ],
            borderWidth: 1,
          },
        ],
        options:{
            // aspectRatio:2
        }
      };


    return (
        <>
            <section className="mt-10 flex flex-wrap place-content-center md:justify-between space-x-0 md:space-x-4 overflow-hidden items-center">
                {/* <div className="max-w-[15rem] w-full h-60 md:max-w-xs md:h-80 rounded-[50%] border-[3rem] border-solid border-t-[#CDA767] border-r-[#376A49] border-b-[#809A17] border-l-[#698181] flex justify-center items-center -rotate-45">
                    <h2 className="text-lg md:text-2xl text-center text-black font-semibold rotate-45">Amount Saved</h2>
                </div> */}

                <div className="max-w-[25rem] relative flex place-content-center place-items-center w-full h-60 md:h-[25rem]">
                    <Doughnut data={data} width={"100%"} height={"100%"}/>
                    <h2 className="text-lg md:text-2xl text-center text-black font-semibold absolute">Amount Saved</h2>
                </div>

                


                <div className="flex gap-2 mt-8 md:mt-0 flex-1 place-content-end">
                    <button onClick={()=>{setShowPopUp({show:true,type:"create"})}} className="bg-[#113E21] text-white font-semibold max-w-[15rem] w-full h-11 md:h-14 px-[1.3rem] md:px-12 rounded-2xl text-sm md:text-lg">
                        Create Vault
                    </button>
                    <button onClick={()=>{setShowPopUp({show:true,type:"optin"})}} className="border-2 border-solid border-[#111] font-semibold max-w-[15rem] w-full h-11 md:h-14 px-[1.3rem] md:px-12 rounded-2xl text-sm md:text-lg">
                        Opt-in Asset
                    </button>
                </div>
            </section>

            {showPopUp.type === "create" && <CreateVault setShowPopUp={setShowPopUp}/>}
            {showPopUp.type === "optin" && <OptInAsset setShowPopUp={setShowPopUp}/>}
        </>
    )
}

export default Graph