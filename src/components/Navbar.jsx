import React, { useState } from "react";
import { ArrowRight } from 'lucide-react'
import Logo from "../shared/logo";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user } = useUser();
    const { openSignIn } = useClerk();

    return (
        <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">

            {/* Logo */}
            <Logo />
            {/* Desktop Menu */}
            <ul className="md:flex hidden items-center gap-10">
                <li><a className="hover:text-gray-500/80 transition" href="#">Home</a></li>
                <li><a className="hover:text-gray-500/80 transition" href="#">All Posts</a></li>
                <li><a className="hover:text-gray-500/80 transition" href="#">About</a></li>
                <li><a className="hover:text-gray-500/80 transition" href="#">Pricing</a></li>
            </ul>

            {/* Desktop Button */}
            {
                user ? <UserButton /> : (
                    <button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-2.5'>
                        Get started
                        <ArrowRight className='w-4 h-4' />
                    </button>)
            }

            {/* Mobile Menu Button */}
            <button
                aria-label="menu-btn"
                type="button"
                onClick={() => setOpen(!open)}
                className="menu-btn inline-block md:hidden active:scale-90 transition"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#000">
                    <path d="M3 7h24M3 14h24M3 21h24" stroke="currentColor" strokeWidth="2" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div
                className={`mobile-menu absolute top-[70px] left-0 w-full bg-white p-6 md:hidden transition-all duration-300 ${open ? "block" : "hidden"
                    }`}
            >
                <ul className="flex flex-col space-y-4 text-lg">
                    <li><a href="#" className="text-sm">Home</a></li>
                    <li><a href="#" className="text-sm">Services</a></li>
                    <li><a href="#" className="text-sm">Portfolio</a></li>
                    <li><a href="#" className="text-sm">Pricing</a></li>
                </ul>

                <button
                    type="button"
                    className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
                >
                    Get started
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
