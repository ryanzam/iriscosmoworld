import React from 'react'

function RootLoading() {
    return (
        <div>
            <div className="flex w-full flex-col gap-4">
                <div className="skeleton h-80 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="flex justify-between">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-20"></div>
                </div>
                <div className="skeleton h-64 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-28"></div>
            </div>
        </div>
    )
}

export default RootLoading