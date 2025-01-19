"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useCart } from "@/app/contexts/Cart";

function CartItem({ item }) {
    const [quantity, setQuantity] = useState(item.quantity);
    const { updateQuantity, removeFromCart } = useCart();
    const imageUrl = typeof item?.image === "string" ? item?.image : item?.image?.secure_url;
    return (
        <tr className="border-b border-gray-300">
            <td className="px-4 py-2">
                <div className="flex justify-center">
                    <img
                        src={imageUrl}
                        alt={item?.title || item?.name}
                        className="w-20 h-20 object-cover rounded-md"
                    />
                </div>
            </td>
            <td className="px-4 py-2 text-gray-800">{item.title}</td>
            <td className="px-4 py-2 text-gray-800">${item.price}</td>
            <td className="px-4 py-2">
                <div className="flex items-center justify-center space-x-2">
                    <button
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        type="button"
                        onClick={() => {
                            if (quantity > 1) {
                                setQuantity((prevQuantity) => {
                                    updateQuantity(item._id, prevQuantity - 1);
                                    return prevQuantity - 1;
                                });
                            }
                        }}
                    >
                        -
                    </button>
                    <input
                        className="w-12 text-center border border-gray-300 rounded-md"
                        type="number"
                        value={quantity}
                        min="1"
                        onChange={(e) => {
                            const newQuantity = parseInt(e.target.value);
                            if (newQuantity >= 1) {
                                setQuantity(newQuantity);
                                updateQuantity(item._id, newQuantity);
                            }
                        }}
                    />
                    <button
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        type="button"
                        onClick={() => {
                            setQuantity((prevQuantity) => {
                                updateQuantity(item._id, prevQuantity + 1);
                                return prevQuantity + 1;
                            });
                        }}
                    >
                        +
                    </button>
                </div>
            </td>
            <td className="px-4 py-2 text-gray-800">
                ${item.quantity ? item.price * item.quantity : 0}
            </td>
            <td className="px-4 py-2 text-red-600 cursor-pointer hover:text-red-800" onClick={() => removeFromCart(item._id)}>
                x
            </td>
        </tr>
    );
}

export default CartItem;
