

import Pagination from "./components/Pagination";
import ProductCard from "./components/ProductCard";

const getProducts = async (searchParams) => {
  const searchQuery = new URLSearchParams({
    page: searchParams?.page || 1,
  }).toString();
  console.log(searchQuery, "sQuery");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/product?${searchQuery}`,
    {
      method: "GET",
      next: { revalidate: 1 },
    },
  );
  console.log(res);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return {
    products: data?.products,
    currentPage: data?.currentPage,
    totalPages: data?.totalPages,
  };
};
export default async function Home({ searchParams }) {
  // console.log(searchParams, "srchparamas");

  const data = await getProducts(searchParams);

  return (
    <main>
      <div>
        <div className="page-banner bg-gray-100 py-6">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Our E-commerce Website
            </h1>
          </div>
        </div>
        <div className="section py-8">
          <div className="container mx-auto">
            <div className="section__head mb-8">
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Filtered Products
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
              {data?.products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Pagination
        totalPages={data?.totalPages}
        pathname={"/"}
      />
    </main>
  );
}