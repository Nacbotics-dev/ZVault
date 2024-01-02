import { useState,useEffect } from "react";
import { timeAgoDetailed,convertToUnit } from "../../misc";
import { algodClient,ACCOUNT_SCAN_URL } from "../../ContractMethods/ContractCalls";

const Db_cards = ({vaultInfo,setShowPopUp}) => {
  const [canWithdraw,setCanWithdraw] = useState(false)
  const [assetInfo,setAssetInfo] = useState("");

  useEffect(()=>{
    const time = Math.floor(Date.now() / 1000)

    if (time >= parseInt(vaultInfo[6])) {
      setCanWithdraw(true)
    }

    algodClient.getAssetByID(parseInt(vaultInfo[5])).do().then((res)=>{
      setAssetInfo(res.params)
    })

  },[vaultInfo])

  return (
        <div className="p-7 bg-white rounded-[1.25rem] card-shadow max-w-[22rem] w-full">
            <div className="w-12 h-12 bg-[#DDD] rounded-[50%] ml-auto"></div>
            <div className="my-6">
                <h3 className="text-[#113E21] text-center text-2xl md:text-[2rem] font-bold">{vaultInfo[0]}</h3>
                <p className="text-black text-sm md:text-lg font-medium my-2">Token:<span className="font-bold ml-1">{assetInfo?.name}</span></p>
                <p className="text-black text-sm md:text-lg font-medium my-2">Amount:<span className="font-bold ml-1">{convertToUnit(parseInt(vaultInfo[4]),assetInfo?.decimals)} {assetInfo?.["unit-name"]}</span></p>
                <p className="text-black text-sm md:text-lg font-medium my-2 flex items-center">Vault Keeper:<a href={`${ACCOUNT_SCAN_URL}${vaultInfo[1]}`} target="_blank" rel="noreferrer" className="font-bold ml-1 inline-block w-32 whitespace-nowrap overflow-x-hidden text-ellipsis">{vaultInfo[1]}</a></p>
                <p className="text-black text-sm md:text-lg font-medium">Duration:<span className="font-bold ml-1">{timeAgoDetailed(vaultInfo[6])}</span></p>
            </div>
            <button onClick={()=>{setShowPopUp({show:true,vaultInfo:{vaultInfo:vaultInfo,assetInfo:assetInfo},locked:canWithdraw})}} className="bg-[#113E21] text-white font-semibold py-2 px-8 rounded-2xl text-sm md:text-lg block mx-auto">{canWithdraw ? "Withdraw Asset" :"Top Up"}</button>
        </div>
  )
}

export default Db_cards;