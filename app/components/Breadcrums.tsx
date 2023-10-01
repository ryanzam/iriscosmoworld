import Link from "next/link"
import { FC } from "react"

type breadcrum = {
    name: string,
    path: string
}

interface IBreadcrumsProps {
    breadcrums: breadcrum[]
}

const Breadcrums:FC<IBreadcrumsProps> = ({ breadcrums }: IBreadcrumsProps) => {
    return (
        <div className="text-sm breadcrumbs mb-3">
            <ul>
               {breadcrums.map((b, i) => (
                <li key={i}>
                    <Link href={b.path}>{b.name}</Link>
                </li>
               ))}
            </ul>
        </div>
    )
}

export default Breadcrums