

const Db_cards = () => {
  return (
    <section className="p-7 bg-white rounded-[1.25rem]">
      <div className="w-12 h-12 bg-[#FFCB74] rounded-[50%] ml-auto"></div>
      <div className="my-6">
        <h3 className="text-[#113E21] text-center text-midHead-clamp font-semibold">My Next Bull</h3>
        <p className="text-black text-mid-1Head-clamp font-medium my-2">Token:<span className="font-bold ml-1">ZVault Token</span></p>
        <p className="text-black text-mid-1Head-clamp font-medium my-2 flex items-center">Vault Keeper:<span className="font-bold ml-1 inline-block w-24 whitespace-nowrap overflow-x-hidden text-ellipsis">TNJBKU6ME4EPSD</span></p>
        <p className="text-black text-mid-1Head-clamp font-medium">Duration:<span className="font-bold ml-1">2yrs 3months and 5days</span></p>
      </div>
      <button className="bg-[#113E21] text-white font-semibold py-2 px-8 rounded-[1.25rem] text-mid-1Head-clamp block mx-auto">Top Up</button>
    </section>
  )
}

export default Db_cards;