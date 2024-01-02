import { useNavigate } from "react-router-dom"



const LandingPageBtn = ({title = "Enter App",toLink="/vaults",maxWidth = "10.75206rem"}) => {
    const navigateTo = useNavigate()
    return (
        <>
            <button
                onClick={()=>{navigateTo(toLink)}}
                style={{maxWidth:maxWidth}}
                className={`bg-[#111] h-11 md:h-14 w-full text-white text-sm md:text-lg font-medium rounded-2xl px-5 py-3  shadow shadow-black flex justify-center items-center`}
            >
                {title}
            </button>
        </>
    )
}

const DashboardBtn = ({setPopUp,title = "Connect Wallet"}) =>{
  return (
    <>
      <button onClick={()=>{setPopUp(true)}} className="bg-[#FFCB74] text-[#113E21] max-w-[11rem] h-11 md:h-14 w-full font-medium rounded-2xl px-4 py-3 text-sm md:text-lg  shadow shadow-black hover:bg-[#113E21] hover:text-white transition-all flex justify-center items-center">
          <p className="overflow-hidden text-ellipsis">{title}</p>
      </button>
    </>
  )
}

export default LandingPageBtn;
export {DashboardBtn};