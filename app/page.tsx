import LayoutDashboard from "@/components/LayoutDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Management",
  description: "Lead Management",
};

export default async function Home() {
  return (
    <LayoutDashboard>
      <div>MAIN</div>
    </LayoutDashboard>
  );
}
