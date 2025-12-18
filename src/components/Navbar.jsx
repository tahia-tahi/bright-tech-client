import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import Logo from "../shared/logo";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();

    const handleNav = (path) => {
        navigate(path);
        setOpen(false); // close mobile menu
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white shadow-[0px_4px_25px_0px_#0000000D]">
            <div className="h-[70px] px-4 md:px-10 lg:px-20 flex items-center justify-between">

                {/* Logo */}
                <div onClick={() => handleNav("/")} className="cursor-pointer">
                    <Logo />
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <li onClick={() => handleNav("/")} className="text-primary cursor-pointer">Home</li>
                    <li onClick={() => handleNav("/all-posts")} className="text-primary cursor-pointer">All Posts</li>
                    <li className="text-primary cursor-pointer">About</li>
                    <li className="text-primary cursor-pointer">Pricing</li>
                    {user && (
                        <li
                            onClick={() => handleNav("/user-dashboard")}
                            className="text-primary cursor-pointer"
                        >
                            Dashboard
                        </li>
                    )}

                </ul>

                {/* Desktop Auth */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <UserButton />
                    ) : (
                        <button
                            onClick={() => navigate('/auth/sign-up')}
                            className="flex items-center gap-2 rounded-full bg-primary text-white px-4 py-2 text-sm hover:opacity-90 transition cursor-pointer"
                        >
                            Get started
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden p-2 rounded-lg active:scale-95 transition"
                    aria-label="menu"
                >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-6 pb-6 pt-4 flex flex-col gap-4 bg-white border-t">

                    <button onClick={() => handleNav("/")} className="text-left text-sm font-medium">
                        Home
                    </button>
                    <button onClick={() => handleNav("/all-posts")} className="text-left text-sm font-medium">
                        All Posts
                    </button>
                    <button className="text-left text-sm font-medium">About</button>
                    <button className="text-left text-sm font-medium">Pricing</button>
                    {user && (
                        <button
                            onClick={() => handleNav("/user-dashboard")}
                            className="text-left text-sm font-medium"
                        >
                            Dashboard
                        </button>
                    )}
                    <div className="pt-4">
                        {user ? (
                            <UserButton />
                        ) : (
                            <button
                                onClick={() => navigate('/auth/sign-up')}
                                className="w-full flex items-center justify-center gap-2 rounded-full bg-primary text-white py-3 text-sm cursor-pointer"
                            >
                                Get started
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
