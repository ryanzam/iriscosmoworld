import React from 'react'

function ProductLoading() {
    return (
        <div className='grid grid-cols-[.5fr_1.5fr] gap-5 xs:flex xs:flex-col xs:gap-1 m-5'>
            <div className="flex flex-col gap-3">
                <div className="skeleton h-4 w-20"></div>
                <div className="w-full flex flex-row justify-between">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-20"></div>
                </div>

                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-56"></div>
                <div className="skeleton h-4 w-56"></div>
                <div className="skeleton h-4 w-56"></div>
                <div className="skeleton h-4 w-56"></div>
                <div className="skeleton h-4 w-56"></div>

                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-48"></div>
                <div className="skeleton h-4 w-48"></div>
                <div className="skeleton h-4 w-48"></div>
                <div className="skeleton h-4 w-48"></div>
                <div className="skeleton h-4 w-48"></div>
            </div>
            <div className='w-full flex flex-col-3 justify-between gap-3'>
                <div className="flex w-80 flex-col gap-4">
                    <div className="skeleton h-52 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex w-80 flex-col gap-4">
                    <div className="skeleton h-52 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex w-80 flex-col gap-4">
                    <div className="skeleton h-52 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            </div>
        </div>
    )
}

export default ProductLoading