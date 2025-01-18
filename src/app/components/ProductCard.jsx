import Image from "next/image";

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 w-full mb-4">
                <Image
                    src={product?.image}
                    alt={product?.title || "Product Image"}
                    className="rounded-md object-cover"
                    layout="fill"
                />
            </div>
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                    {product?.title || "Unnamed Product"}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{product?.description}</p>
                <p className="text-primary font-bold text-lg">${product?.price}</p>
            </div>
            <button className="mt-4 w-full py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
