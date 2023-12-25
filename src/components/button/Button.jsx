

const Button = ({title = "Enter App"}) => {
  return (
    <>
        <button
            className="bg-[#111111] text-white font-medium rounded-[1.25rem] px-5 py-3 text-btn-clamp shadow shadow-black hover:bg-zinc-900 transition-all flex justify-center items-center"
        >
            {title}
        </button>
    </>
  )
}

export default Button;