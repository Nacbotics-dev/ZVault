

const Foot = () => {
  return (
    <section>
        <div className="laptop:flex justify-between items-end">
            <div>
                <div>
                    <a href="#" className=" block w-40 relative -translate-x-9 laptop:-translate-x-11 laptop:w-52">
                        <img
                            src="src\images\logo.png" 
                            alt="Zvault logo" 
                        />
                    </a>
                    <p className='text-white text-smHead-clamp font-medium relative -translate-y-2 '>
                        Seamless. Secure. Yours.
                    </p>
                </div>
                <div className="mt-[3.8125rem]">
                    <a href="#" className="text-[#FFCB74] text-smHead1-clamp block">Whitepaper</a>
                    <a href="#" className="text-[#FFCB74] text-smHead1-clamp">Documentation</a>
                </div>
            </div>
            <div className="flex items-center gap-8 mt-10">
                <div>
                    <img
                        className="w-40 relative -translate-x-4" 
                        src="src\images\algorand logo.png" 
                        alt="Algorand logo" 
                    />
                    <img 
                        className="w-40"
                        src="src\images\nacbotics logo.png" 
                        alt="Nacbotics logo" 
                    />
                </div>
                <img 
                    className="w-[9rem] relative translate-y-2"
                    src="src\images\code with sleek logo.png" 
                    alt="Codewithsleek logo" 
                />
            </div>
        </div>
        <h4 className="text-white text-smHead1-clamp w-max flex items-center gap-1 mt-40 mx-auto"><span className="text-xl">©</span>copyright 2024</h4>
    </section>
  )
}

export default Foot;