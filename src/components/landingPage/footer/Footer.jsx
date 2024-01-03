import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section>
        <div className="flex justify-between items-end flex-col md:flex-row">
            <div className="flex flex-col w-full">
                <div>
                    <Link to={"/"} className="block max-w-[6rem] md:max-w-[8rem] relative w-full">
                        <img
                            src="\images\logo.png" 
                            alt="Zvault logo" 
                        />
                    </Link>
                    <p className='text-white text-xl md:text-[1.75rem] font-medium relative'>
                        Seamless. Secure. Yours.
                    </p>
                </div>
                <div className="mt-5 md:mt-[3.8125rem] flex flex-col">
                    <Link to={"/"} className="text-[#FFCB74]  text-base md:text-lg block">Whitepaper</Link>
                    <Link to={"/"} className="text-[#FFCB74]  text-base md:text-lg">Documentation</Link>
                    <a href="https://github.com/Nacbotics-dev/ZVault" target="_blank" rel="noreferrer" className="text-[#FFCB74]  text-base md:text-lg">GitHub</a>
                </div>
            </div>
            <div className="flex items-center gap-8 mt-5 md:mt-10">
                <div className="max-w-[16rem] w-full">
                    <img
                        className="w-full relative" 
                        src="\images\algorand logo.png" 
                        alt="Algorand logo" 
                    />
                    <img 
                        className="w-full relative"
                        src="\images\nacbotics logo.png" 
                        alt="Nacbotics logo" 
                    />
                </div>
                <img 
                    className="w-[8rem] relative"
                    src="\images\code with sleek logo.png" 
                    alt="Codewithsleek logo" 
                />
            </div>
        </div>
        <h4 className="text-white text-xs md:text-lg w-max flex items-center xpace-x-1 mt-[5rem] mx-auto"><span className="text-xl">©</span>copyright 2024</h4>
    </section>
  )
}

export default Footer;