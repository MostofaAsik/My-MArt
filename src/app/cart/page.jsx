"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import CartItem from "@/app/components/CartItem";

import { useCart } from "@/app/contexts/Cart";

const Cart = () => {
    const { cart, clearCart } = useCart();
    const { status } = useSession();

    let totalAmount = 0;
    cart.forEach((item) => (totalAmount += item.price * item.quantity));

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="mb-6">
                <h4 className="text-2xl font-semibold text-gray-800">
                    Product list in your cart
                </h4>
            </div>

            <div className="overflow-x-auto mb-6">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Product Image</th>
                            <th className="px-4 py-2 text-left">PRODUCT NAME</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Quantity</th>
                            <th className="px-4 py-2 text-left">Subtotal</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </tbody>
                </table>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                You Total Price Will be $ {totalAmount}
            </h2>

            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => clearCart()}
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                >
                    Clear Cart
                </button>

                <div className="flex justify-end">
                    {status !== "authenticated" ? (
                        <Link
                            className="btn btn-primary btn-raised col-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                            href={`/login?callbackUrl=${"/cart"}`}
                        >
                            Login to Proceed to CheckOut
                        </Link>
                    ) : (
                        <Link
                            className="btn btn-primary btn-raised col-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                            href={`/checkout`}
                            aria-disabled={status !== "authenticated"}
                        >
                            Proceed to CheckOut
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
