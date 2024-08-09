import { CartProduct } from "@/providers/cart";

const CartItem = ({ ...product }: CartProduct) => {
  console.log(product.quantity);
  return <div></div>;
};

export default CartItem;
