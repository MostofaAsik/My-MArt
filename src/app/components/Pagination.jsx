"use client";

import { useRouter } from "next/navigation";

const Pagination = ({ totalPages, pathname, searchParams }) => {
    const router = useRouter();

    const createQueryString = (name, value) => {
        let params = new URLSearchParams(searchParams);
        params.set(name, value);
        return params.toString();
    };

    return (
        <div className="text-center py-6">
            <nav>
                <ul className="flex justify-center space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => {
                        const page = index + 1;

                        return (
                            <li key={page}>
                                <button
                                    onClick={() =>
                                        router.push(
                                            `${pathname}?${createQueryString("page", page)}`
                                        )
                                    }
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 focus:ring focus:ring-blue-300"
                                >
                                    {page}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;

