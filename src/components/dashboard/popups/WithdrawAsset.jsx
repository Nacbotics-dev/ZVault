import { useState } from "react";
import { getFormValues } from "../../misc";
import { useWallet } from "@txnlab/use-wallet";
import TextLoader from "../../Loaders/TextLoader";
import { withdraw_savings,TRANSACTION_SCAN_URL } from "../../ContractMethods/ContractCalls";

export default function WithdrawAsset({vaultInfo,setShowPopUp}) {
    const {activeAddress,signer } = useWallet();
    const [loading,setLoading]  = useState({loading:false,error:null,data:null});

    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = getFormValues()
        if (activeAddress) {
            setLoading({loading:true,error:null,data:null});
            const {vault_id,amount} = formData
            const asset_id =  vaultInfo?.vaultInfo?.vaultInfo[5]

            withdraw_savings(activeAddress,signer,vault_id,asset_id,amount).then((response)=>{
                setLoading({loading:false,error:null,data:response});
            }).catch((error)=>{
                var msg = error?.message.split(":")
                msg = msg[msg.length - 1]
                setLoading({loading:false,error:msg,data:null});
            })
        }

    }

    return (
        <div className="w-full min-h-screen fixed top-0 right-0 left-0 z-40 flex flex-col place-items-center place-content-center">
            <div onClick={()=>{setShowPopUp({show:false,vaultID:null})}} className="w-full backdrop-blur-sm bg-[#111111de] fixed z-30 min-h-screen top-0 left-0 right-0 bottom-0"/>
            <form onSubmit={handleSubmit} className="relative z-50 p-5 max-w-lg bg-[#fff] w-full rounded-2xl flex flex-col space-y-5">

                
                <svg onClick={()=>{setShowPopUp({show:false,vaultID:null})}} className="cursor-pointer self-end h-8 w-8" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <path d="M37.5 12.5L12.5 37.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.5 12.5L37.5 37.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <div className="w-full grid grid-cols-3 gap-4 place-content-center md:place-items-baseline">
                    <label htmlFor="vault_id" className="font-semibold text-base md:text-lg">Vault Keeper</label>
                    <div className="bg-[#F6F6F6] col-span-2 w-full rounded-2xl flex place-items-center px-5 h-11 md:h-14">
                    <input readOnly type="text" name="vault_id" hidden value={vaultInfo?.vaultInfo?.vaultInfo[7]} placeholder="The name of the vault"/>
                        <input readOnly type="text" name="vault_name" defaultValue={vaultInfo?.vaultInfo?.vaultInfo[1]} placeholder="The name of the vault" className="w-full h-full px-2 bg-transparent appearance-none font-medium text-sm md:text-base"/>
                    </div>
                </div>

                <div className="w-full grid grid-cols-3 gap-4 place-items-center md:place-items-baseline">
                    <label htmlFor="Asset Amount" className="font-semibold text-base md:text-lg">Asset Amount</label>
                    <div className="bg-[#F6F6F6] col-span-2 w-full rounded-2xl flex place-items-center px-5 h-11 md:h-14">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" fill="none">
                            <g clipPath="url(#clip0_42_195)">
                                <path d="M0 33.3154V36.8215C0 39.72 7.05469 42.0766 15.75 42.0766C24.4453 42.0766 31.5 39.72 31.5 36.8215V33.3154C28.1121 35.7048 21.9187 36.8215 15.75 36.8215C9.58125 36.8215 3.38789 35.7048 0 33.3154ZM26.25 10.5461C34.9453 10.5461 42 8.18949 42 5.29098C42 2.39247 34.9453 0.0358887 26.25 0.0358887C17.5547 0.0358887 10.5 2.39247 10.5 5.29098C10.5 8.18949 17.5547 10.5461 26.25 10.5461ZM0 24.702V28.9389C0 31.8374 7.05469 34.194 15.75 34.194C24.4453 34.194 31.5 31.8374 31.5 28.9389V24.702C28.1121 27.4937 21.9105 28.9389 15.75 28.9389C9.58945 28.9389 3.38789 27.4937 0 24.702ZM34.125 25.6052C38.8254 24.6937 42 23.0023 42 21.0562V17.5501C40.0969 18.8967 37.2996 19.8164 34.125 20.3829V25.6052ZM15.75 13.1736C7.05469 13.1736 0 16.1132 0 19.7425C0 23.3718 7.05469 26.3113 15.75 26.3113C24.4453 26.3113 31.5 23.3718 31.5 19.7425C31.5 16.1132 24.4453 13.1736 15.75 13.1736ZM33.7395 17.7964C38.6613 16.9096 42 15.1689 42 13.1736V9.66748C39.0879 11.7285 34.084 12.837 28.8176 13.0997C31.2375 14.2739 33.0176 15.8504 33.7395 17.7964Z" fill="black"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_42_195">
                                <rect y="0.0358887" width="42" height="42.0407" rx="21" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>

                        <input required type="number" name="amount" placeholder="Amount you want to top up" className="w-full h-full px-2 bg-transparent appearance-none font-medium text-sm md:text-base"/>
                    </div>
                </div>

                {loading.error && <p className="font-medium max-w-xs overflow-hidden text-ellipsis w-full text-center place-self-center md:text-base text-sm col-span-3 text-red-600">{loading.error}</p>}
                {loading.data && <p className="font-medium flex gap-3 w-full text-center place-content-center place-self-center md:text-base text-sm col-span-3 text-green-600">
                            TxnID : <a href={`${TRANSACTION_SCAN_URL}${loading.data?.[0]?.txID}`} target="_blank" rel="noreferrer" className="font-bold max-w-[6rem] overflow-hidden text-ellipsis block w-full">{loading.data?.[0]?.txID}</a>
                        </p>}

                <div className="w-full flex place-content-center place-items-center">
                    {activeAddress && <button disabled={loading.loading} className={`${loading.loading ? "max-w-[16rem]" : "max-w-[11rem]"} rounded-2xl border-2 border-[#111] disabled:cursor-progress w-full font-semibold text-sm md:text-lg h-11 md:h-14`}>
                        {!loading.loading && "Withdraw Asset"}
                        {loading.loading && <TextLoader text={"Withdrawing Asset"}/>}
                    </button>}

                    {!activeAddress && <p className="font-medium max-w-xs overflow-hidden text-ellipsis w-full text-center place-self-center md:text-base text-sm col-span-3 text-red-600">Please Connect your wallet</p>}
                </div>

            </form>
        </div>
    )
}
