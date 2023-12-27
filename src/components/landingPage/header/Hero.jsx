import Button from '../button/Button';

const Hero = () => {
  return (
    <section className='mt-10 flex flex-wrap space-y-10 md:space-y-0 place-content-center lg:justify-between items-center'>
        <div className='max-w-[490px] w-full flex flex-col space-y-4 place-items-center md:place-items-start'>
            <h1 className='text-white text-center md:text-left text-[2.5rem] md:text-[3.125rem] font-extrabold'>
                Guardian of Your
                Digital Fortunes: ZVault
            </h1>
            <p className='text-white text-smHead-clamp font-medium'>
                Seamless. Secure. Yours.
            </p>
            <Button /> 
        </div>

        {/* <div id='oval'/> */}
        <div className='max-w-[550px] w-full max-h-[501px] h-full relative md:-right-12'>
            <img 
                src="src\images\vault-illustration.png" 
                alt="A vault-illustration" 
            />
        </div>
    </section>
  )
}

export default Hero;