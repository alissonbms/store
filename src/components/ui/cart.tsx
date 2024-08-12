import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { ShoppingCartIcon } from "lucide-react";
import CartItem from "./cart-item";
import { EmptyCart } from "../empty-cart";
import CartDetails from "./details-cart";

const Cart = () => {
  const { products, subTotal, total, totalDiscount } = useContext(CartContext);
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
        {products.length > 0 ? (
          products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))
        ) : (
          <EmptyCart />
        )}
      </div>

      {products.length > 0 && (
        <div className="flex flex-col gap-3">
          <CartDetails title={"Subtotal:"} value={subTotal} />
          <CartDetails title={"Entrega:"} text={"GRÁTIS"} type={"shipment"} />
          <CartDetails
            title={"Descontos:"}
            value={totalDiscount}
            type={"discount"}
          />
          <div className="text-2xl">
            <CartDetails title={"Total:"} value={total} type="total" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
