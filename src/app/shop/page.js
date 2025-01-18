import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";

export const dynamic = "force-dynamic";

async function getProductsForShop(upd) {
    const searchQuery = new URLSearchParams({
        page: upd?.page || 1,
        minPrice: upd?.minPrice || "",
        maxPrice: upd?.maxPrice || "",
        category: upd?.category || "",
    }).toString();
    console.log(searchQuery, "ssss");

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API}/api/product/filters?${searchQuery}`,
            {
                method: "GET",
                cache: "no-store",
            }
        );
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        return data;
    } catch (err) {
        console.log(err);
        return { products: [], currentPage: 1, totalPages: 1 };
    }
}

export default async function Shop({ searchParams }) {
    const { page, minPrice, maxPrice, category } = await searchParams;
    const upd = { page, minPrice, maxPrice, category };
    console.log(upd, "upd");

    const { products, currentPage, totalPages } = await getProductsForShop(upd);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap">
                {/* Product Filter Sidebar */}
                <div className="lg:w-1/4 w-full mb-6 lg:mb-0 lg:mr-6 overflow-auto">
                    <ProductFilter searchParams={searchParams} />
                </div>

                {/* Product Grid */}
                <div className="lg:w-3/4 w-full">
                    <h4 className="text-center font-semibold text-2xl mb-6">
                        Shop Latest Products
                    </h4>

                    {/* Product Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products?.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 text-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            searchParams={searchParams}
                            pathname="/shop"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
