import Button from '../button/Button';

const Hero = () => {
  return (
    <section className='mt-10 laptop:flex laptop:justify-between laptop:items-center'>
        <div>
            <h1 className='text-white text-bigHead-clamp font-extrabold'>
                Guardian of Your <br/>
                Digital Fortunes: ZVault
            </h1>
            <p className='text-white text-smHead-clamp font-medium my-4'>
                Seamless. Secure. Yours.
            </p>
            <Button /> 
        </div>
        <div className='w-[22rem] mt-10 laptop:translate-x-9 laptop:mt-0 laptop:w-[28rem]'>
            <img 
                src="src\images\vault-illustration.png" 
                alt="A vault-illustration" 
            />
        </div>
    </section>
  )
}

export default Hero;