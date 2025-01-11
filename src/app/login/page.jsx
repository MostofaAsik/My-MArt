"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
import Link from "next/link";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setErrorMessage(result?.error);
                setLoading(false);
            } else {
                router.push("/");
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <section className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 text-sm font-medium">
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 text-sm font-medium">
                            Your Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mt-4">
                        {!isLoading && (
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                            >
                                Login
                            </button>
                        )}
                        {isLoading && (
                            <p className="text-center text-sm text-gray-500">Sending request...</p>
                        )}
                    </div>
                    {errorMessage && (
                        <p className="text-center text-red-500 mt-4">{errorMessage}</p>
                    )}
                </form>
                <p className="mt-4 text-xl ">ALready Have an account ? <Link href={'/register'} className="text-orange-500">Sign Up</Link></p>
                <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm">Or login with</p>
                    <div className="flex justify-center space-x-4 mt-4">
                        <button
                            type="button"
                            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            <i className="mr-2 fab fa-facebook"></i> Facebook
                        </button>
                        <button
                            type="button"
                            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            <i className="mr-2 fab fa-google"></i> Google
                        </button>
                        <button
                            type="button"
                            className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
                        >
                            <i className="mr-2 fab fa-github"></i> GitHub
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
