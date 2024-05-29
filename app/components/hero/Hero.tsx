import { FC } from "react";

interface IImg {
    imgpath: string
    category: string
}

const Hero: FC<IImg> = ({ imgpath, category }: IImg) => {
    return <div className="hero h-36 mb-5" style={{ backgroundImage: `url(${imgpath})`, objectFit: 'fill' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">{category}</h1>
            </div>
        </div>
    </div>
}

export default Hero