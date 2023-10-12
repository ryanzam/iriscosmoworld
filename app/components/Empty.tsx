import { useRouter } from "next/navigation"
import { FC } from "react"

interface IEmptyProps {
    title?: string,
    alertClass?: string,
    showResetBtn?: boolean
}

const Empty: FC<IEmptyProps> = ({ title, alertClass = "", showResetBtn = false }: IEmptyProps) => {

    const router = useRouter()

    return (
        <div className={`alert ` + alertClass}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
                <h3 className="font-bold">{title}</h3>
                {showResetBtn && <div className="text-xs">Try changing filters</div>}
            </div>
            {showResetBtn && <button className="btn btn-sm" onClick={() => router.push("/")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Reset
            </button>}
        </div>
    )
}

export default Empty
