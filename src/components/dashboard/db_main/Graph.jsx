import { useState,useEffect } from "react";
import { Doughnut } from 'react-chartjs-2';
import OptInAsset from "../popups/OptInAsset";
import CreateVault from "../popups/CreateVault";
import { getAssets } from "../../ContractMethods/ContractCalls";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.plugins.legend.display = false;

const Graph = () => {
    const [Labels,setLabels] = useState(null)
    const [chartData,setChartdata] = useState(null)
    const [assetAmounts,setAssetAmounts] = useState(null)
    const [showPopUp,setShowPopUp] = useState({show:false,type:null});

    useEffect(()=>{
        getAssets().then((res)=>{
            setLabels(res.map((lables)=>lables.asset))
            setAssetAmounts(res.map((lables)=>lables.amount))


        })
    },[])

    useEffect(()=>{
        const data = {
            labels: Labels,
            datasets: [
                {
                label: 'Loacked Assets By Volume',
                data: assetAmounts,
                backgroundColor: [
                    '#CDA767',
                    '#113E21',
                    '#809A17',
                    '#698181',
                    '#376A49',
                    '#698121',
                ],
                borderColor: [
                    '#CDA767',
                    '#113E21',
                    '#809A17',
                    '#698181',
                    '#376A49',
                    '#698121',
                ],
                borderWidth: 1,
                },
            ],
          };

        if (Labels && assetAmounts) {
            setChartdata(data)
        }
    },[Labels,assetAmounts])
    


    return (
        <>
            <section className="mt-10 flex flex-wrap place-content-center md:justify-between space-x-0 md:space-x-4 overflow-hidden items-center">
                {chartData && <div className="max-w-[25rem] relative flex place-content-center place-items-center w-full h-60 md:h-[25rem]">
                    <Doughnut data={chartData} width={"100%"} height={"100%"}/>
                    <h2 className="text-xs md:text-2xl text-center text-black font-semibold absolute">Assets Locked</h2>
                </div>}

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