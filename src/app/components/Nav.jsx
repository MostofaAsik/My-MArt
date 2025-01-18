'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Nav = () => {
    const { data, status } = useSession();
    console.log(data, status);
    return (
        <header className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <div className="text-2xl font-bold text-blue-500">Next Final </div>
                </div>

                {/* Navbar for larger screens */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-6">
                        <li>
                            <Link href="/" className="hover:text-blue-400">
                                Home
                            </Link>
                        </li>

                        <li>

                        </li>
                        <li>
                            <Link href="/cart" className="hover:text-blue-400">
                                Cart
                            </Link>
                        </li>
                        <li>
                            <Link href="/static-page" className="hover:text-blue-400">
                                Static Page
                            </Link>
                        </li>
                        <li>
                            <Link href="/add-product" className="hover:text-blue-400">
                                Add Product
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop" className="hover:text-blue-400">
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link href="/all-products" className="hover:text-blue-400">
                                Products
                            </Link>
                        </li>
                        {status === "authenticated" &&
                            (data?.user?.role === "admin" ||
                                data?.user?.role === "super-admin") && (
                                <li>
                                    <Link href="/dashboard/admin">Admin</Link>
                                </li>
                            )}
                        <li>
                            <Link href="/login" className="hover:text-blue-400">
                                Sign In
                            </Link>
                        </li>
                        {
                            status === "authenticated" && (
                                <li>
                                    <button
                                        className="px-3 py-1 border bg-orange-400 rounded-md "
                                        onClick={() => signOut()}>Log Out</button>
                                </li>
                            )
                        }
                    </ul>
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        id="mobile-menu-toggle"
                        className="text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                className="hidden md:hidden bg-gray-700 text-white px-4 py-2"
            >
                <ul className="space-y-2">
                    <li>
                        <Link href="/" className="block hover:text-blue-400">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/register" className="block hover:text-blue-400">
                            Sign Up
                        </Link>
                    </li>
                    <li>
                        <Link href="/cart" className="block hover:text-blue-400">
                            Cart
                        </Link>
                    </li>
                    <li>
                        <Link href="/static-page" className="block hover:text-blue-400">
                            Static Page
                        </Link>
                    </li>
                    <li>
                        <Link href="/add-product" className="block hover:text-blue-400">
                            Add Product
                        </Link>
                    </li>
                    <li>
                        <Link href="/all-products" className="block hover:text-blue-400">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link href="/login" className="hover:text-blue-400">
                            Sign In
                        </Link>
                    </li>
                    {
                        status === "authenticated" && (
                            <li>
                                <button
                                    className="px-3 py-1 border bg-orange-400 rounded-md "
                                    onClick={() => signOut()}>Log Out</button>
                            </li>
                        )
                    }
                </ul>
            </div>
        </header>
    );
};

export default Nav;
