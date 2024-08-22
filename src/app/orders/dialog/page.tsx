"use client";

import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { FileWarningIcon, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OrdersDialogPage = () => {
  const [open, setOpen] = useState(true);
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    return router.push("/");
  }

  const handleCloseClick = () => {
    setOpen(false);
    router.push("/orders");
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <Dialog open={open} defaultOpen>
        <DialogContent className="flex flex-col gap-5 rounded-xl bg-accent p-10">
          <DialogHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-1">
              <h3 className="text-2xl">Aviso</h3> <FileWarningIcon size={24} />
            </div>
            <X
              className="cursor-pointer"
              size={24}
              onClick={() => handleCloseClick()}
              color={"#DC2626"}
            />
          </DialogHeader>

          <div className="flex max-w-[25rem] flex-col gap-2">
            <p>
              Seja bem-vindo ao local onde você irá encontrar seus pedidos
              feitos, bem como aqueles que foram inicialmente requeridos, mas
              que por alguma razão, não tiveram o pagamento confirmado.
            </p>
            <p>
              Aqui, portanto, você pode pagá-los ou simplesmente excluí-los.
              <span className="mt-2 block font-bold">
                Obs: todos os pedidos são excluídos periodicamente.
              </span>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersDialogPage;
