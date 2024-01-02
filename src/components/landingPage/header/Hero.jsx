import Button from '../button/Button';

const Hero = () => {
  return (
    <section className='mt-10 flex flex-wrap space-y-10 1/2xl:space-y-0 place-content-center 1/2xl:justify-between items-center'>
        <div className='max-w-[550px] 1/2xl:max-w-[400px] big-laptops:max-w-[550px] w-full flex flex-col space-y-4 place-items-center 1/2xl:place-items-start'>
            <h1 className='text-white text-center 1/2xl:text-left text-[2.5rem] md:text-[3.125rem] font-extrabold'>
                Guardian of Your
                Digital Fortunes: ZVault
            </h1>
            <p className='text-white text-smHead-clamp font-medium'>
                Seamless. Secure. Yours.
            </p>
            <Button /> 
        </div>

        {/* <div id='oval'/> */}
        <div className='max-w-[400px] big-laptops:max-w-[550px]  w-full max-h-[501px] h-full relative 1/2xl:-right-12'>
            <img 
                src="\images\vault-illustration.png" 
                alt="A vault-illustration" 
            />
        </div>
    </section>
  )
}

export default Hero;