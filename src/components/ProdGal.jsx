import Card from "./Card";

const products = [
  {
    title:
      "SanDisk 1TB Portable External SSD | Up to 800MB/s Read Speed | USB 3.2 Gen 2",
    image: "products/storage/sandisk_portable_ssd_1_.jpg",
    price: 11999,
    mrp: 22999,
    discount: 42,
    deliveryDate: "5th February, 2026",
  },
];

const ProdGal = () => {
  return (
    <div>
      <h1 className="text-3xl text-center my-4">List of All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-8 py-12 gap-2">
        {products.length <= 0 ? (
          <h1>No Products to Display </h1>
        ) : (
          <>
            {products.map((p) => (
              <Card product={p} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProdGal;
