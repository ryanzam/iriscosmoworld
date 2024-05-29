import { FC, useEffect, useState } from "react";

const images: any = [
    "images/carousel1.jpg",
    "images/carousel2.jpg"
]

const Carousel: FC = () => {

    const [currentImgIdx, setCurrentImgIdx] = useState(0)

    useEffect(() => {        
        const intervalId = setInterval(() => {
            setCurrentImgIdx((current) => 
                current === images.length - 1 ? 0 : current + 1)
        }, 4000)
        return () => clearInterval(intervalId)
    }, [useState])

    const nextImage = () => {
        setCurrentImgIdx((currentImgIdx + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImgIdx((currentImgIdx - 1 + images.length) % images.length)
    }

    return <div className="carousel w-full mb-5">
        <div className="carousel-item relative w-full">
            <img src={images[currentImgIdx]} className="w-full h-44" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a onClick={prevImage} className="btn btn-circle">❮</a>
                <a onClick={nextImage} className="btn btn-circle">❯</a>
            </div>
        </div>
    </div>
}

export default Carousel