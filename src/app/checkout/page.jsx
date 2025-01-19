"use client";

import { useState } from "react";
import { useCart } from "@/app/contexts/Cart";
import OrderSummary from "@/app/components/OrderSummary";

export default function Checkout() {
    const { cart } = useCart();
    const [loading, setLoading] = useState(false);

    const submitHandler = async () => {
        setLoading(true);
        try {
            const cartData = cart?.map((item) => ({
                _id: item._id,
                quantity: item.quantity,
            }));

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API}/api/user/stripe/session`,
                {
                    method: "POST",
                    body: JSON.stringify({ cartItems: cartData }),
                }
            );

            const data = await response.json();
            console.log(data.url);
            if (response.ok) {
                window.location.href = data.url;
            } else {
                // Handle error (e.g., show a toast)
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            // Handle error (e.g., show a toast)
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Payment Method Section */}
                <div className="lg:col-span-2">
                    <p className="text-blue-600 font-semibold text-lg mb-4">
                        Payment Method
                    </p>
                    <h2 className="text-center text-4xl mb-6">🔒 💳</h2>
                    <p className="bg-gray-800 text-white p-6 rounded-lg text-lg">
                        Clicking <span className="font-bold">Place Order</span>{" "}
                        will securely redirect you to our trusted payment partner, Stripe,
                        to complete your order.
                    </p>

                    <div className="flex justify-end mt-6">
                        <button
                            className={`w-full md:w-1/3 py-2 px-4 rounded-md font-semibold text-white bg-green-600 hover:bg-green-700 transition ${loading ? "cursor-not-allowed opacity-75" : ""
                                }`}
                            onClick={submitHandler}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Place Order"}
                        </button>
                    </div>
                </div>

                {/* Order Summary Section */}
                <div>
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
}
