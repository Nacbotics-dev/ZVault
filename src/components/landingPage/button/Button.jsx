

const LandingPageBtn = ({title = "Enter App"}) => {
  return (
    <>
        <button
            className="bg-[#111] text-white font-medium rounded-[1.25rem] px-5 py-3 text-btn-clamp shadow shadow-black flex justify-center items-center"
        >
            {title}
        </button>
    </>
  )
}

const DashboardBtn = ({title = "Connect Wallet"}) =>{
  return (
    <>
      <button className="bg-[#FFCB74] text-[#113E21] font-medium rounded-[1.25rem] px-4 py-3 text-btn-clamp shadow shadow-black hover:bg-[#113E21] hover:text-[#FFCB74] transition-all flex justify-center items-center">
          {title}
      </button>
    </>
  )
}

export default LandingPageBtn;
export {DashboardBtn};