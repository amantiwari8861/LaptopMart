import { Heart, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../redux/slices/cartSlice";
import { Link } from "react-router";

// type ProductCardProps = {
//   title: string;
//   image: string;
//   price: number;
//   mrp: number;
//   discount: number;
//   deliveryDate: string;
// };
type ProductCardProps = {
  product: Product;
};

// function ProductCard(prodDetails) {
function ProductCard({ product }: ProductCardProps) {
  const { id, title, image, price, mrp, discount, deliveryDate } = product;
  const dispatch = useDispatch();

  return (
    <div className=" rounded-xl border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition">

      {/* Badge */}
      <span className="inline-block z-50 mb-2 rounded-full border border-black px-3 py-1 text-xs font-semibold">
        New Arrival
      </span>

      {/* Image */}
      <div className="flex justify-center items-center h-40">
        <img
          src={image}
          alt={title}
          className="h-full object-contain hover:scale-125"
        />
      </div>

      {/* Compare */}
      <div className="flex items-center gap-2 mt-2 text-sm">
        <input type="checkbox" />
        <span>Compare</span>
      </div>

      {/* Title */}
      <Link to={`/products/${id}`}>
        <h3 className="mt-2 text-sm font-medium line-clamp-2">
          {title}
        </h3>
      </Link>

      {/* Price */}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-lg font-bold">₹{price.toLocaleString()}</span>
        <span className="text-sm text-gray-500 line-through">
          ₹{mrp.toLocaleString()}
        </span>
        <span className="text-sm font-semibold text-green-600">
          {discount}% off
        </span>
        <span className="text-sm font-semibold text-green-600">
          {
            price > 50000 ? <p>pay with EMI</p> : <p> Pay With UPI</p>
          }
        </span>
      </div>

      {/* Extra Deals */}
      <span className="mt-2 rounded-md bg-green-50 px-2 py-1 text-xs text-green-700 font-medium w-fit">
        Extra Deals Available
      </span>

      {
        price > 50000 &&
        <span className="ms-2 mt-2 rounded-md bg-green-50 px-2 py-1 text-xs text-green-700 font-medium w-fit">
          Pay With EMI
        </span>
      }

      {/* Delivery */}
      <p className="mt-2 text-xs text-gray-600">
        Free delivery by <span className="font-semibold">{deliveryDate}</span>
      </p>

      {/* Actions */}
      <div className="mt-3 flex justify-between items-center">
        <button className="rounded-full border p-2 hover:bg-gray-100">
          <Heart size={18} />
        </button>

        <button className="rounded-full bg-black text-white p-2 hover:bg-gray-800"
          onClick={() => dispatch(addProductToCart(product))}
        >
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  );

  // console.log(prodDetails);
  // console.log(prodDetails.title);
  // console.log(title);

  // return null;
}

export default ProductCard;