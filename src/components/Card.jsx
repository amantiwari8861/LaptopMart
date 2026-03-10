import { Heart, ShoppingCart } from "lucide-react";

// function Card(prodDetails) {
function Card({ product }) {
  const { title, image, price, mrp, discount, deliveryDate } = product;

  return (
    <div className=" rounded-xl border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition">
      {/* Badge */}
      <span className="inline-block mb-2 rounded-full border border-black px-3 py-1 text-xs font-semibold">
        New Arrival
      </span>

      {/* Image */}
      <div className="flex justify-center items-center h-40">
        <img src={image} alt={title} className="h-full object-contain" />
      </div>

      {/* Title */}
      <h3 className="mt-2 text-sm font-medium line-clamp-2">{title}</h3>

      {/* Price */}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-lg font-bold">₹{price.toLocaleString()}</span>
        <span className="text-sm text-gray-500 line-through">
          ₹{mrp.toLocaleString()}
        </span>
        <span className="text-sm font-semibold text-green-600">
          {discount}% off
        </span>
      </div>

      {/* Extra Deals */}
      <div className="mt-2 rounded-md bg-green-50 px-2 py-1 text-xs text-green-700 font-medium w-fit">
        Extra Deals Available
      </div>

      {/* Delivery */}
      <p className="mt-2 text-xs text-gray-600">
        Free delivery by <span className="font-semibold">{deliveryDate}</span>
      </p>

      {/* Actions */}
      <div className="mt-3 flex justify-between items-center">
        <button className="rounded-full border p-2 hover:bg-gray-100">
          <Heart size={18} />
        </button>

        <button className="rounded-full bg-black text-white p-2 hover:bg-gray-800">
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  );

}

export default Card;
