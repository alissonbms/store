"use client";

import { Button } from "@/components/ui/button";
import { CartContext } from "@/providers/cart";
import { CheckCircleIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const PurchaseSuccessPage = () => {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart();
  }, []);

  const router = useRouter();

  const handleButtonClick = (destination: string) => {
    router.push(destination);
  };

  const { status } = useSession();

  if (status === "unauthenticated") {
    return router.push("/");
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-12 lg:flex-row">
      <div className="flex h-full w-full flex-1 flex-col items-center gap-20 px-10 lg:gap-52 lg:py-28">
        <div className="mt-8 flex flex-col items-center justify-center gap-2">
          <CheckCircleIcon size={48} />
          <h2 className="mt-2 text-center text-[2rem] font-bold">
            Compra realizada com sucesso!
          </h2>
          <p className="opacity-80">A parte mais difícil já foi!</p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-center opacity-80">
            Em seguida, para onde deseja ir?
          </p>

          <div className="flex flex-row gap-2">
            <Button
              onClick={() => handleButtonClick("/")}
              variant="outline"
              className="border-[#DC2626] hover:bg-[#DC2626]"
            >
              <h2 className="text-[1.1rem] font-semibold">Página Inicial</h2>
            </Button>
            <Button
              onClick={() => handleButtonClick("/orders/dialog")}
              className="border border-solid border-[#DC2626] hover:bg-[#0A0A0A]"
            >
              <h2 className="text-[1.1rem] font-semibold">Verificar pedidos</h2>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Image
          width={0}
          height={0}
          alt={"compra relizada com sucesso"}
          src="/success.svg"
          className="h-full max-h-[75vh] w-full"
        />
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
