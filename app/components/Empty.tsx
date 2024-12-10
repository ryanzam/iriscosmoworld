"use client"

import { useRouter } from "next/navigation"
import { FC } from "react"

interface IEmptyProps {
    title?: string,
    alertClass?: string,
    showResetBtn?: boolean
}

const Empty: FC<IEmptyProps> = ({ title, alertClass = "", showResetBtn = false }: IEmptyProps) => {

    const router = useRouter()

    const renderSvg = () => {
        if (alertClass === "alert-warning") {
            return <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        }
        return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    }

    return (
        <div className={`alert ` + alertClass}>
            {renderSvg()}
            <div>
                <h3 className='my-3 font-bold'>{title}</h3>
                {showResetBtn && <div className="text-xs">Try changing filters</div>}
            </div>
            {showResetBtn && <button className="btn btn-sm" onClick={() => router.push("/")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Reset
            </button>}
        </div>
    )
}

export default Empty
