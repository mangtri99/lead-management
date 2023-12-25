"use client";
import LayoutDashboard from "@/components/LayoutDashboard";

export default function LeadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutDashboard>{children}</LayoutDashboard>;
}
