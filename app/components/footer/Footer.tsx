"use client"
import { RiTiktokLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";

import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
const Footer: FC = () => {

    return (
        <footer className="w-full footer p-10 bg-base-200 text-base-content mt-4 flex flex-col items-center">
            <div className="w-full flex items-center justify-between">
                <aside className="flex flex-col items-center">
                    <Image src="/images/logo.jpg" height={50} width={50} alt="iris" />
                    <h2 className="font-extrabold text-[18px]">Iris Cosmo World</h2>
                    <p className="text-xs">Bharatpur-10, Chitwan</p>
                </aside>

                <nav>
                    <header className="footer-title">Contact Us</header>
                    <span className="flex gap-2">
                        <motion.a
                            whileHover={{
                                scale: 1.2,
                                color: "#cd35ff",
                                transition: {
                                    duration: 0.2,
                                    ease: "easeInOut"
                                }
                            }}
                            href="https://www.tiktok.com/@iris.cosmo.world" target="_blank" className="link link-hover">
                            <RiTiktokLine fontSize={30} />
                        </motion.a>

                        <motion.a
                            whileHover={{
                                scale: 1.2,
                                color: "#cd35ff",
                                transition: {
                                    duration: 0.2,
                                    ease: "easeInOut"
                                }
                            }}
                            href="https://www.instagram.com/iris_cosmo_world" target="_blank" className="link link-hover">
                            <FaInstagram fontSize={30} />
                        </motion.a>

                        <motion.a
                            whileHover={{
                                scale: 1.2,
                                color: "#cd35ff",
                                transition: {
                                    duration: 0.2,
                                    ease: "easeInOut"
                                }
                            }}
                            href="/contact" className="link link-hover">
                            <CiMail fontSize={30} />
                        </motion.a>
                    </span>
                </nav>
            </div>

            <div className="w-full border-t py-5 border-gray-300 flex flex-row md:flex-row justify-between items-center">
                <p className="text-gray-700 text-sm">
                    &copy;2024 Iris Cosmo World. All rights reserved.
                </p>
                <div className="flex justify-between">
                    <a href="/termsofuse" className="link link-hover">Terms of use |</a>
                    <a href="/privacy" className="link link-hover">Privacy policy </a>
                </div>
            </div>

            {/*             <TawkMessengerReact
                propertyId="6648b8f79a809f19fb3297f7"
                widgetId="1hu6151s9"
            /> */}
        </footer>
    )
}

export default Footer