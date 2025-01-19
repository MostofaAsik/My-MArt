"use client";

import { useCart } from "@/app/contexts/Cart";
import Image from "next/image";

export default function OrderSummary() {
    const { cart } = useCart();

    const calculateTotal = () => {
        return cart?.reduce(
            (total, item) => total + item?.price * item?.quantity,
            0,
        );
    };

    const totalItems = cart?.reduce((total, item) => total + item.quantity, 0);

    const itemOrItems = totalItems === 1 ? "item" : "items";

    return (
        <div className="bg-gray-50 p-4 rounded-md shadow-md">
            <p className="text-lg font-semibold text-blue-600 mb-4">Order Summary</p>
            <ul className="space-y-4">
                {cart?.map((product) => (
                    <div
                        className="flex items-center bg-white shadow rounded-md overflow-hidden"
                        key={product?._id}
                    >
                        {/* Image */}
                        <div className="w-24 h-24 overflow-hidden">
                            <Image
                                src={product?.image?.secure_url || "/images/default.jpeg"}
                                width={500}
                                height={300}
                                alt={product?.title}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 px-4">
                            <p className="text-gray-800 font-medium truncate">
                                {product?.title}
                            </p>
                            <p className="text-gray-500 text-sm">
                                Qty: {product?.quantity}
                            </p>
                        </div>

                        {/* Price */}
                        <div className="px-4 text-right">
                            <p className="text-lg font-semibold text-gray-800">
                                ${product?.price?.toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
            </ul>

            <div className="mt-6 border-t pt-4">
                <div className="flex justify-between">
                    <p className="text-gray-700 font-medium">
                        Total {totalItems} {itemOrItems}:
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                        ${calculateTotal().toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}
