import { useState } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "@txnlab/use-wallet";
import ConnectMenu from "../popups/ConnectMenu";
import { DashboardBtn } from "../../landingPage/button/Button";

const Db_Navbar = () => {
    const { activeAccount } = useWallet();
    const [popUp,setPopUp] = useState(false);

    return (
        <>
            <nav className="flex justify-between items-center">
                <Link to={"/"} className="block max-w-[6rem] md:max-w-[8rem] relative w-full">
                    <img
                        src="\images\logo.png" 
                        alt="Zvault logo" 
                    />
                </Link>
                <div>
                    <DashboardBtn setPopUp={setPopUp} title={activeAccount?.address? activeAccount?.address : "Connect Wallet"}/>
                </div>
            </nav>

            {popUp && <ConnectMenu showPopUp={setPopUp}/>}

        </>
  )
}

export default Db_Navbar;