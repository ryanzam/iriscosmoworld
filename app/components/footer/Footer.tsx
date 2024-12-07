"use client"
import { RiTiktokLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";

import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { FC } from "react";
import Image from "next/image";

const Footer: FC = () => {

    return (
        <footer className="w-full footer p-10 bg-base-200 text-base-content mt-4 flex flex-col items-center">
            <div className="w-full flex items-center justify-between">
                <aside className="flex flex-col items-center">
                    <Image src="/images/logo.png" height={50} width={50} alt="iris" />
                    <h2 className="font-extrabold">Iris Cosmo World</h2>
                </aside>

                <div>
                    <header className="footer-title">Payment method</header>
                    <span className="flex gap-3">
                        <img src="/images/esewa.png" alt="esewa" style={{ height: '30px' }} />
                        <img src="/images/fonepay.png" alt="esewa" style={{ height: '30px' }} />
                    </span>
                </div>

                <nav>
                    <header className="footer-title">Contact Us</header>
                    <span className="flex gap-2">
                        <a href="https://www.tiktok.com/@iris.cosmo.world" target="_blank" className="link link-hover">
                            <RiTiktokLine fontSize={30} />
                        </a>
                        <a href="https://www.instagram.com/iris_cosmo_world" target="_blank" className="link link-hover">
                            <FaInstagram fontSize={30} />
                        </a>
                        <a href="/contact" className="link link-hover">
                            <CiMail fontSize={30} />
                        </a>
                    </span>
                </nav>
            </div>

            <nav className="pt-10">
                <span className="flex gap-2">
                    <a href="/termsofuse" className="link link-hover">Terms of use |</a>
                    <a href="/privacy" className="link link-hover">Privacy policy |</a>
                </span>
            </nav>

            <TawkMessengerReact
                propertyId="6648b8f79a809f19fb3297f7"
                widgetId="1hu6151s9"
            />
        </footer>
    )
}

export default Footer