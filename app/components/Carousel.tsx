import { FC, useEffect, useState } from "react";
import Image from "next/image";

const images: any = [
    "/images/carousel1.jpg",
    "/images/carousel2.jpg",
    "/images/carousel3.jpg"
]

const Carousel: FC = () => {

    const [currentImgIdx, setCurrentImgIdx] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImgIdx((current) =>
                current === images.length - 1 ? 0 : current + 1)
        }, 4000)
        return () => clearInterval(intervalId)
    }, [])

    const nextImage = () => {
        setCurrentImgIdx((currentImgIdx + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImgIdx((currentImgIdx - 1 + images.length) % images.length)
    }

    return <div className="carousel w-full xs:h-64">
        <div className="carousel-item relative w-full">
            <Image src={images[currentImgIdx]} className="w-full h-full" alt="carousel" width="500" height="400" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a onClick={prevImage} className="btn btn-circle">❮</a>
                <a onClick={nextImage} className="btn btn-circle">❯</a>
            </div>
        </div>
    </div>
}

export default Carousel