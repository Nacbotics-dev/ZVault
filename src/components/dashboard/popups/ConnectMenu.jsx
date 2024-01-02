
import { useWallet } from '@txnlab/use-wallet'

// eslint-disable-next-line react/prop-types
export default function ConnectMenu({showPopUp}) {
  const { providers,  } = useWallet();

  // 1. Map over `providers` array
  // 2. Show the provider name/icon and "Connect", "Set Active", and "Disconnect" buttons
  // 3. If active, map `provider.accounts` to render a select menu of connected accounts

  const setProvider = (provider)=>{

    if (provider.isConnected) {
        provider.disconnect()
    } else {
        provider.connect();
        provider.setActiveProvider();
    }
  }

  return (
    <div className="w-full min-h-screen fixed top-0 left-0 right-0 z-40 flex place-content-center place-items-center">
        <div onClick={()=>{showPopUp(false)}} className="w-full backdrop-blur-sm bg-[#111111de] fixed z-30 min-h-screen top-0 left-0 right-0 bottom-0"/>

        
        <div className="flex flex-col space-y-2 box-shadow relative top-12 max-h-[40rem] z-50 max-w-lg w-full bg-white min-h-[10rem] p-2 rounded-md md:top-0">
            <div className='w-full'>
                <p className='text-center font-medium text-sm md:text-base text-red-600'>Please use your testnet wallet</p>
            </div>

        
            {providers?.map((provider) => (
                <div onClick={()=>{setProvider(provider)}} key={provider.metadata.id} className='w-full min-h-[5rem] max-h-[5.5rem] flex space-x-5 bg-[#f6f6f6] cursor-pointer px-5 py-3 rounded-md'>
                    <div className=' max-w-[2.5rem] max-h-[2.5rem] h-10 w-full'>
                        <img className='w-full h-full' alt={`${provider.metadata.name} icon`} src={provider.metadata.icon}/>
                        {provider.metadata.name}
                    </div>

                <div className='w-full h-auto flex place-content-end place-items-center'>
                    <div className='w-full h-auto'>
                        {provider.isActive && provider.accounts.length && <h3 className='font-bold text-sm md:text-base'>Connected</h3>}
                    </div>

                    <div className=' h-8 w-8'>
                        <svg className='w-full h-full' fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                </div>
                </div>
            ))}
        </div>
    </div>
  )
}