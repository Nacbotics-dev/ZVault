
const SummaryItem = ({amount = "0", title = "Title", bg = "bg-white"})=>{
    return (
        <div className={`${bg} md:max-w-[258.28px] w-full p-9 rounded-3xl flex flex-col justify-center items-center `}>
            <h3 className="text-midHead-clamp font-black">{amount}</h3>
            <p className="text-btn-clamp text-[#113E21] font-normal">{title}</p>
        </div>
    )
}

const Summary = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between gap-8">
        <SummaryItem amount="$2.9B" title="TVL"/>
        <SummaryItem amount="2.5k" title="VAULTS" bg="bg-[#FFCB74]"/>
        <SummaryItem amount="1000" title="USERS"/>
    </section>
  )
}

export default Summary;