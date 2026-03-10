import { useSelector } from "react-redux"
import type { RootState } from "../redux/store";
import ProductCard from "../components/ProductCard";

const Cart = () => {
    const products = useSelector((state: RootState) => state.cart.value);
    return (
        <div>
            <h1 className="text-3xl text-center">Products in Cart</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-8 py-12 gap-2">

                {
                    products.length > 0 ? (
                        <>
                            {
                                products.map((p, i) => <ProductCard product={p} key={i} />)
                            }

                        </>
                    ) : <h1>Cart is Empty! </h1>
                }
            </div>

        </div>
    )
}

export default Cart