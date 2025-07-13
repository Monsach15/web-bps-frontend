import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import logobps from "../assets/logobps.png";
import { useAuth } from '../hooks/useAuth';

const navItems = [
    { id: 'home', label: 'Home', path: "/home" },
    { id: 'publications', label: 'Daftar Publikasi', path: "/publications" },
    { id: 'add', label: 'Tambah Publikasi', path: "/publications/add" },
    { id: 'galeri', label: 'Galeri Kegiatan', path: "/galeri" },
    { id: 'logout', label: 'Logout', path: "/logout" },
];

function BpsLogo() {
    return (
        <img src={logobps} alt="BPS Logo" className="h-12 w-12"/>
    );
}

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const {logoutAction, error} = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logoutAction();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Jangan tampilkan navbar di halaman login
    if (location.pathname === "/login") {
        return null;
    }

    return (
        <nav className="bg-[#0369A1] shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <BpsLogo />
                        <span className="text-white text-base md:text-lg font-bold italic tracking-wider">
                            BPS PROVINSI BENGKULU
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center h-16">
                        {navItems.map((item) => {
                            const isActive =
                                location.pathname === item.path ||
                                (item.id === "add" &&
                                location.pathname.startsWith("/publications/add")) ||
                                (item.id === "publications" &&
                                location.pathname === "/publications") ||
                                (item.id === "galeri" && location.pathname === "/galeri") ||
                                (item.id === "home" && location.pathname === "/home");
                            
                            if (item.id === "logout") {
                                return (
                                    <button
                                        key={item.id}
                                        onClick={handleLogout}
                                        className="px-3 py-2 text-sm font-semibold bg-transparent text-sky-100 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer h-full flex items-center"
                                        >
                                        {item.label}
                                    </button>
                                );
                            }

                            return (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    className={`px-3 py-2 text-sm font-semibold transition-all duration-300 border border-transparent cursor-pointer ${
                                        isActive
                                        ? "bg-white text-sky-900 shadow-md font-bold h-full flex items-center"
                                        : "text-sky-100 hover:bg-sky-800 hover:text-white h-full flex items-center"
                                    }`}
                                    >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white hover:text-sky-200 focus:outline-none focus:text-sky-200"
                        >
                            <span className="text-2xl">☰</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-16 right-0 w-48">
                        <div className="bg-sky-800 shadow-lg">
                            {navItems.map((item) => {
                                const isActive =
                                    location.pathname === item.path ||
                                    (item.id === "add" &&
                                    location.pathname.startsWith("/publications/add")) ||
                                    (item.id === "publications" &&
                                    location.pathname === "/publications") ||
                                    (item.id === "galeri" && location.pathname === "/galeri") ||
                                    (item.id === "home" && location.pathname === "/home");
                                
                                if (item.id === "logout") {
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                handleLogout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full text-center px-3 py-2 text-sm font-semibold bg-transparent text-sky-100 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
                                        >
                                            {item.label}
                                        </button>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.id}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block w-full text-center px-3 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                                            isActive
                                            ? "bg-white text-sky-900 shadow-md font-bold"
                                            : "text-sky-100 hover:bg-sky-700 hover:text-white"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}