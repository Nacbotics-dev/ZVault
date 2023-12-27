import Button from "../button/Button";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="flex justify-between items-center relative">
            <Link to={"/"} className="block max-w-[8rem] relative w-full">
                <img
                    src="src\images\logo.png" 
                    alt="Zvault logo" 
                    className="w-full h-full"
                />
            </Link>
            <div>
                <Button />
            </div>
        </nav>
    )
}

export default NavBar;