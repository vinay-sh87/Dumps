export default function Product({ product }) {
  return (
    <>
      <div className="shadow-lg p-4 relative hover:shadow-xl transition">
        <span className="bg-gray-200 rounded-full px-3 py-1 text-sm absolute shadow-lg top-2 left-2 z-50">
          {product.category}
        </span>
        <div className="aspect-square overflow-hidden rounded-t-xl bg-gray-100 transition">
          <img
            className="h-full w-full object-contain hover:scale-105 ease-in-out duration-300 transition"
            src={product.image}
            alt={product.description}
          />
        </div>
        <h5 className="text-md font-semibold text-center py-3">
          {product.title.slice(0, 20)}...
        </h5>
        <p className="font-semibold text-sm text-green-800 text-center mb-2">
          ${product.price}
        </p>
        <div className="text-center">
          <button className="text-sm bg-black text-white px-4 py-2 shadow-sm rounded active:scale-95 transition ease-in-out">
            Add to Bag
          </button>
        </div>
      </div>
    </>
  );
}
