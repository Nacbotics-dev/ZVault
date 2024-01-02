import "./css/text.css";

export default function TextLoader({text}) {
    return (
        <span className="loader text-sm md:text-lg after:bottom-[0.3rem] md:after:bottom-[0.5rem] ">{text}</span>
    )
}
