"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { priceRanges } from "@/utils/filteredData";

export default function ProductFilter({ searchParams }) {
    const [categories, setCategories] = useState([]);
    console.log(categories);
    const pathname = "/shop";
    const params = useSearchParams();

    const getCategories = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/category`, {
            method: "GET",
            next: { revalidate: 1 },
        });
        const data = await res.json();
        setCategories(data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    const router = useRouter();
    const activeButton =
        "btn bg-blue-500 text-white hover:bg-blue-600 mx-1 rounded-full px-4 py-2";
    const button =
        "btn bg-gray-300 text-black hover:bg-gray-400 mx-1 rounded-full px-4 py-2";

    const handleRemoveFilter = (filterName) => {
        // const updatedSearchParams = { ...searchParams };
        // const updatedSearchParams = useSearchParams();
        // delete updatedSearchParams[filterName];
        let newParams = new URLSearchParams(params.toString());

        // if filterName is string
        if (typeof filterName === "string") {
            newParams.delete(filterName);
        }
        // if filterName is array
        if (Array.isArray(filterName)) {
            filterName?.forEach((name) => {
                newParams.delete(name);
            });
        }

        // reset page to 1 when applying new filtering options
        newParams.page = 1;

        const queryString = newParams.toString();
        console.log(queryString, "qs");

        const newUrl = `${pathname}?${queryString}`;
        router.push(newUrl);
    };

    const createQueryString = (name, value) => {
        let newParams = new URLSearchParams(params.toString());

        if (Array.isArray(name) && Array.isArray(value)) {
            // console.log(name, value, "val");

            // name =["minPrice", "maxPrice"]
            // value = [range?.min, range?.max]
            name.forEach((n, index) => {
                newParams.set(n, value[index]);
            });
            newParams.set("page", 1);

            return newParams.toString();
        }

        if (typeof name === "string") {
            newParams.set(name, value);
            newParams.set("page", 1);
            return newParams.toString();
        }
    };

    return (
        <div className="mb-6">
            <p className="text-lg font-semibold mb-4">Filter Products</p>

            <Link
                className="text-red-500 hover:underline block mb-4"
                href="/shop"
            >
                Clear Filters
            </Link>

            <div className="mt-6">
                <p className="font-semibold text-lg mb-3">Price</p>
                <div className="flex flex-wrap gap-2">
                    {priceRanges?.map((range) => {
                        console.log(params, "mini");

                        const isActive =
                            params.get("minPrice") === String(range?.min) &&
                            params.get("maxPrice") === String(range?.max);
                        return (
                            <div key={range?.label}>
                                <button
                                    className={isActive ? activeButton : button}
                                    onClick={() => {
                                        console.log(
                                            createQueryString(
                                                ["minPrice", "maxPrice"],
                                                [range?.min, range?.max],
                                            ),
                                        );
                                        router.push(
                                            `${pathname}?${createQueryString(
                                                ["minPrice", "maxPrice"],
                                                [range?.min, range?.max],
                                            )}`,
                                        );
                                    }}
                                >
                                    {range?.label}
                                </button>
                                {isActive && (
                                    <button
                                        onClick={() =>
                                            handleRemoveFilter([
                                                "minPrice",
                                                "maxPrice",
                                            ])
                                        }
                                        className="pointer"
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6">
                <p className="font-semibold text-lg mb-3">Categories</p>
                <div className="flex flex-wrap gap-2">
                    {categories?.map((c) => {
                        const isActive = params.get("category") === c._id;

                        return (
                            <div key={c._id} className="flex items-center">
                                <button
                                    className={isActive ? activeButton : button}
                                    onClick={() => {
                                        router.push(
                                            `${pathname}?${createQueryString("category", c._id)}`
                                        );
                                    }}
                                >
                                    {c?.title}
                                </button>
                                {isActive && (
                                    <span
                                        onClick={() => handleRemoveFilter("category")}
                                        className="ml-2 text-sm cursor-pointer text-red-500"
                                    >
                                        X
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}
