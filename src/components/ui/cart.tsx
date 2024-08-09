import { ReceiptTextIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";

const Cart = () => {
  const { products, cartBasePrice, cartTotalDiscount, cartTotalPrice } =
    useContext(CartContext);
  return (
    <div>
      <Badge
        variant="outline"
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem]"
      >
        <ReceiptTextIcon size={18} />
        Menu
      </Badge>

      {products.map((product) => (
        <h1 key={product.id}>
          {product.name} {"---"} {product.quantity}
        </h1>
      ))}
    </div>
  );
};

export default Cart;
