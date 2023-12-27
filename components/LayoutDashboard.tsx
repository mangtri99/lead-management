"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useMedia } from "react-use";
import Sidebar from "@/components/Sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMedia("(max-width: 576px)");
  const [collapsed, setCollapsed] = useState(isMobile ? true : false);
  const router = useRouter();
  return (
    <div className="min-h-screen w-full">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <div
        className={cn(
          "transition-all min-h-screen flex flex-col",
          collapsed ? "ml-0" : "ml-60",
          isMobile ? "ml-0" : ""
        )}
      >
        {/* Navbar */}
        <div className="lg:px-6 px-4 flex items-center py-4 bg-white border-y">
          <div className="flex-1 flex items-center">
            <Button
              variant="link"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
            >
              <Menu className="h-4 w-4 text-black" />
            </Button>

            <p className="uppercase ml-6">Leads</p>
          </div>
          {/* Profile */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none hover:cursor-pointer">
                <Avatar>
                  <AvatarImage
                    src="`https://ui-avatars.com/api/?rounded=true&background=F5F5F5&name=${A+D}&size=32`"
                    alt="@shadcn"
                  />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="hover:cursor-pointer hover:bg-secondary" onClick={() => router.push("/login")}>
                  Logout
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Body */}
        <main className="px-4 py-4 flex-1 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
