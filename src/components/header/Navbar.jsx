import Button from "../button/Button";

const NavBar = () => {
  return (
      <nav className="flex justify-between items-center relative">
          <a href="#" className="block w-40 relative -translate-x-9 laptop:-translate-x-11 laptop:w-52 ">
              <img
                src="src\images\logo.png" 
                alt="Zvault logo" 
              />
          </a>
          <div className="">
              <Button />
          </div>
      </nav>
  )
}

export default NavBar;