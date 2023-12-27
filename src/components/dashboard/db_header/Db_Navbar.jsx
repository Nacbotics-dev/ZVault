import { Link } from "react-router-dom";
import { DashboardBtn } from "../../landingPage/button/Button"

const Db_Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
        <Link to={"/"} className="block max-w-[8rem] relative w-full">
            <img
                src="src\images\logo.png" 
                alt="Zvault logo" 
            />
        </Link>
        <div>
            <DashboardBtn />
        </div>
    </nav>
  )
}

export default Db_Navbar;