

const Card = ({title = "Title", imageSrc = "#", imageAlt = "Alt text", description = "Lorem Ipsum Dolor"}) => {
  return (
    <article className="bg-[#111111] p-7 rounded-3xl laptop:max-w-[29.5rem]">
        <div className="flex justify-between items-center">
            <h3 className="text-[#FFCB74] text-mid-1Head-clamp font-bold">{title}</h3>
            <img 
                className="w-20"
                src={imageSrc}
                alt={imageAlt}
            />
        </div>
        <p className="text-white text-btn-clamp mt-8">
            {description}
        </p>
    </article>
  )
}

export default Card;