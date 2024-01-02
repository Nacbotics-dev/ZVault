import "./css/skeleton.css";

function SkeletonCard() {
    return(
        <div className="p-7 bg-white rounded-[1.25rem] card-shadow max-w-[22rem] w-full">
            <div className="w-12 h-12 bg-[#DDD] rounded-[50%] ml-auto skeleton"/>
            <div className="my-6 space-y-3 flex flex-col">
                <div className="h-11 bg-[#DDD] max-w-[10rem] w-full mx-auto skeleton"/>
                <div className="h-20 bg-[#DDD] skeleton"/>
            </div>
            <div className="bg-[#DDD] h-11 md:h-14 rounded-2xl skeleton"/>
        </div>
    )
}

export default function SkeletonLoader() {
    return (
        <div className="mt-12 md:mt-16 flex flex-wrap justify-between place-items-center gap-8 w-auto">
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
        </div>
    )
}
