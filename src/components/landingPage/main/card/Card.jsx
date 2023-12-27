

const Card = ({title = "Title", imageSrc = "#", imageAlt = "Alt text", description = "Lorem Ipsum Dolor"}) => {
  return (
    <article className="bg-[#111111] p-7 flex flex-col space-y-10 rounded-3xl w-full min-h-[16.75rem] max-h-[25.75rem] ">
        <div className="flex justify-between items-center">
            <h3 className="text-[#FFCB74] text-xl md:text-2xl font-bold">{title}</h3>
            <img 
                className="md:w-20 w-14"
                src={imageSrc}
                alt={imageAlt}
            />
        </div>
        <p className="text-white text-base font-normal md:text-xl">
            {description}
        </p>
    </article>
  )
}

export default Card;