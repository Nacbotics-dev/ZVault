
const VaultDropdown = ({filterBy,setFilterBY}) => {
  


  return (
    <section className="flex justify-between items-center mt-12">
        <h3 className="text-[1.25rem] md:text-[1.75rem] text-[#111] font-bold">Vaults</h3>


        <select 
          name="filter_by" 
          id="filter_by" 
          value={filterBy} 
          onChange={(e)=>{setFilterBY(e.target.value)}}
          className="rounded-2xl max-w-[8rem] md:max-w-[16rem] w-full border-2 border-[#111] h-11 md:h-14 cursor-pointer px-4 text-sm font-semibold md:text-lg"
          >
            <option value="All">All</option>
            <option value="Me">Only My Own</option>
        </select>
    </section>
  )
}

export default VaultDropdown;