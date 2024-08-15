import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { ShoppingCartIcon } from "lucide-react";
import CartItem from "./cart-item";
import { EmptyCart } from "./empty-cart";
import CartDetails from "./details-cart";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/app/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { signIn, useSession } from "next-auth/react";
import { createOrder } from "@/app/actions/order";

const Cart = () => {
  const { data } = useSession();
  const { products, subTotal, total, totalDiscount } = useContext(CartContext);

  const handleFinishPurchaseClick = async () => {
    if (!data?.user) {
      return signIn("google");
    }

    const order = await createOrder(products, data.user.id);

    const checkout = await createCheckout(products, order.id);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        variant="outline"
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem]"
      >
        <ShoppingCartIcon size={18} />
        Carrinho
      </Badge>

      {products.length > 0 ? (
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-8">
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <EmptyCart />
      )}

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

          <Button
            className="mt-6 rounded-lg uppercase"
            onClick={handleFinishPurchaseClick}
          >
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
