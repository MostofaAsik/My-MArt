"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/api/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password }),
                }
            );
            const data = await res.json();
            if (!res.ok) {
                setLoading(false);
                setErrorMessage(data?.err);
            } else {
                router.push("/login");
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setErrorMessage(error.message);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <section className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Please Register</h1>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-1 text-sm font-medium">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
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
                                Register
                            </button>

                        )}
                        <p className="mt-4 text-xl ">ALready Have an account ? <Link className="text-orange-500" href={'/login'}>Sign In</Link></p>
                        {isLoading && (
                            <p className="text-center text-sm text-gray-500">
                                Creating New User...
                            </p>
                        )}
                    </div>
                    {errorMessage && (
                        <p className="text-center text-red-500 mt-4">{errorMessage}</p>
                    )}
                </form>
            </section>

        </main>
    );
};

export default Register;
