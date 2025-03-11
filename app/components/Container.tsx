'use client';

import { FC, ReactNode } from "react";

interface IContainerProps {
    children: ReactNode
}

const Container: FC<IContainerProps> = ({children}) => {
    return <div className="max-w-full min-h-screen px-4 mx-auto sm:px-2 md:px-10 xl:px-20 xs:p-0 mt-16">
        {children}
    </div>
}

export default Container;