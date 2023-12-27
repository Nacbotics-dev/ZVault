import { DashboardBtn } from "../../landingPage/button/Button"

const Db_Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
        <a href="#" className="block w-40 relative -translate-x-9 laptop:-translate-x-11 laptop:w-52">
            <img
                src="src\images\logo.png" 
                alt="Zvault logo" 
            />
        </a>
        <div>
            <DashboardBtn />
        </div>
    </nav>
  )
}

export default Db_Navbar;