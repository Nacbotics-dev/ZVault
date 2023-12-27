import { IoMdArrowDropdown } from "react-icons/io";

const VaultDropdown = () => {
  return (
    <section className="flex justify-between items-center mt-28">
        <h3 className="text-mid-1Head-clamp text-[#111] font-semibold">Vaults</h3>
        <button className="flex items-center gap-2 border-2 border-solid border-[#111] font-semibold py-2 px-4 rounded-[1.25rem] text-mid-1Head-clamp">
            All vaults
            <span>
              <IoMdArrowDropdown />
            </span>
        </button>
    </section>
  )
}

export default VaultDropdown;