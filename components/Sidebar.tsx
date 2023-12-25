"use client";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { useClickAway, useMedia } from "react-use";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar(props: SidebarProps) {
  const router = useRouter();
  const { collapsed, setCollapsed } = props;
  const isMobile = useMedia("(max-width: 576px)");
  const sidebar = useRef(null);
  useClickAway(sidebar, () => {
    if (isMobile) {
      setCollapsed(true);
    }
  });
  return (
    <aside
      ref={sidebar}
      className={cn([
        "fixed top-0 left-0 z-40 h-screen transition-all w-60",
        collapsed ? "w-0" : "w-60",
      ])}
    >
      {!collapsed && (
        <div className="flex flex-col items-center h-full bg-white border-r w-full">
          <div className="flex flex-col items-center py-4">
            <Image src="/img/logo.svg" alt="logo" width={200} height={100} />
          </div>
          <div className="flex flex-col w-full px-4 mt-8">
            <h2 className="mb-4 text-lg font-semibold tracking-tight">
              Leads Management
            </h2>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start space-x-2"
                onClick={() => router.push("/")}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start space-x-2"
                onClick={() => router.push("/lead")}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Lead</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
