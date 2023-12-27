import Db_Navbar from "./db_header/Db_Navbar";
import Db_cards from "./db_main/Db_cards";
import Graph from "./db_main/Graph";
import VaultDropdown from "./db_main/VaultDropdown";

const Dashboard = () => {
  return (
    <div className="font-display bg-[#E6E6E6] pb-10">
        <header className="bg-[#111] h-20 flex items-center">
            <div className="w-10/12 mx-auto">
               <Db_Navbar />
            </div>
        </header>
        <main>
            <div className="w-10/12 mx-auto">
                <Graph />
                <VaultDropdown />
                <div className=" mt-12 md:mt-16 flex flex-col gap-8 tablet:flex-row">
                    <Db_cards />
                    <Db_cards />
                    <Db_cards />
                </div>
            </div>
        </main>
    </div>
  )
}

export default Dashboard;