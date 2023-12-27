import { useState } from "react";

const VaultDropdown = () => {
  const [filterBy,setFilterBY] = useState("All")


  return (
    <section className="flex justify-between items-center mt-28">
        <h3 className="text-mid-1Head-clamp text-[#111] font-semibold">Vaults</h3>


        <select 
          name="filter_by" 
          id="filter_by" 
          value={filterBy} 
          onChange={(e)=>{setFilterBY(e.target.value)}}
          className=" rounded-2xl max-w-[16rem] w-full border-2 border-[#111] h-11 md:h-14 cursor-pointer px-4 text-sm font-semibold md:text-lg"
          >
            <option value="All">All</option>
            <option value="Me">Only My Own</option>
        </select>
    </section>
  )
}

export default VaultDropdown;