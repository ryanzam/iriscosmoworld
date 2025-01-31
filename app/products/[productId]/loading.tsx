import React from 'react'

function ProductLoading() {
    return (
        <div className='grid grid-cols-[.5fr_1.5fr] gap-5 xs:flex xs:flex-col xs:gap-1'>
            <div className="skeleton h-96 w-96"></div>
            <div className='flex gap-4 flex-col justify-center'>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full mt-5"></div>
                <div className="skeleton h-4 w-36"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-28 mt-5"></div>
            </div>
        </div>
    )
}

export default ProductLoading