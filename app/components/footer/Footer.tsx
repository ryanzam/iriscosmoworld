"use client"
import { usePathname } from "next/navigation";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { FC } from "react";
import Image from "next/image";

const Footer: FC = () => {

    return (
        <footer className="footer p-10 bg-base-200 text-base-content mt-4">
            <aside>
                <Image src="/images/iris_no_bg.png" height={50} width={50} alt="iris" />
                <h2 className="font-extrabold">Iris CosmoWorld Ltd.</h2>
                <p>Providing reliable experience</p>
            </aside>
            <nav>
                <header className="footer-title">Company</header>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Careers</a>
            </nav>
            <nav>
                <header className="footer-title">Legal</header>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
            <form>
                <header className="footer-title">Newsletter</header>
                <fieldset className="form-control w-80">
                    <label className="label">
                        <span className="label-text">Enter your email address</span>
                    </label>
                    <div className="relative">
                        <input type="text" placeholder="username@site.com" className="input input-bordered w-full pr-16" />
                        <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe</button>
                    </div>
                </fieldset>
            </form>
            <TawkMessengerReact
                propertyId="6648b8f79a809f19fb3297f7"
                widgetId="1hu6151s9"
            />
        </footer>
    )
}

export default Footer