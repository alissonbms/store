"use client";

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import ModeToggle from "./mode-toggle";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";

const Header = () => {
  const { status, data } = useSession();
  const handleLoginClick = async () => await signIn("google");
  const handleLogoutClick = async () => await signOut();

  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <div className="flex">
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent side="left">
              <SheetHeader className="text-left text-lg font-semibold">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              {status === "authenticated" && data?.user && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 py-4">
                    <Avatar>
                      <AvatarFallback>
                        {data.user.name?.[0].toUpperCase()}
                      </AvatarFallback>

                      {data.user.image && <AvatarImage src={data.user.image} />}
                    </Avatar>

                    <div className="flex flex-col">
                      <p className="font-medium">{data?.user?.name}</p>
                      <p className="text-sm opacity-75">Boas compras!</p>
                    </div>
                  </div>
                  <Separator />
                </div>
              )}

              <div className="mt-4 flex flex-col gap-2">
                {status === "unauthenticated" ? (
                  <Button
                    onClick={handleLoginClick}
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <LogInIcon size={18} />
                    Fazer Login
                  </Button>
                ) : (
                  status === "authenticated" && (
                    <Button
                      onClick={handleLogoutClick}
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <LogOutIcon size={18} />
                      Fazer Logout
                    </Button>
                  )
                )}

                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <HomeIcon size={18} />
                  Início
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <PercentIcon size={18} />
                  Ofertas
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <ListOrderedIcon size={18} />
                  Catálogo
                </Button>

                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:block">
          <ModeToggle />
        </div>
      </div>

      <h1 className="text-lg font-semibold">
        <span className="text-primary">Valeryian</span> Store
      </h1>

      <Button size="icon" variant="outline">
        <ShoppingCartIcon />
      </Button>
    </Card>
  );
};

export default Header;
