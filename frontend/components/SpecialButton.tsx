import modalState from "@/atoms/modal"
import { useAtom } from "jotai"

const SpecialButton = () => {
    const [isOpen, setIsOpen] = useAtom(modalState)
    return (
        <>
            <button
                onClick = {()=>setIsOpen(true)}
                className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
            >
                <span className="w-full h-full bg-gradient-to-br from-[#11998e] via-[#ff5478] to-[#38ef7d] group-hover:from-[#11998e] group-hover:to-[#38ef7d] absolute" />
                <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                    <span className="relative text-white">Create a Poll</span>
                </span>
            </button>

        </>
    )
}


export default SpecialButton