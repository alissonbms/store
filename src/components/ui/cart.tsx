import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { ShoppingCartIcon } from "lucide-react";
import CartItem from "./cart-item";

const Cart = () => {
  const { products, cartBasePrice, cartTotalDiscount, cartTotalPrice } =
    useContext(CartContext);
  return (
    <div className="flex flex-col gap-8">
      <Badge
        variant="outline"
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem]"
      >
        <ShoppingCartIcon size={18} />
        Carrinho
      </Badge>

      <div className="flex flex-col gap-8">
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
