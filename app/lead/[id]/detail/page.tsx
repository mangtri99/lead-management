import http from "@/lib/http";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Show Lead",
  description: "Show Lead",
};

async function getData(id: string): Promise<any> {
  const { data } = await http(`/lead/${id}`, {
    method: "GET",
  });
  return data.data;
}

export default async function Page({ params }: { params: any }) {
  const data = await getData(params.id);

  return (
    <div>
      <h1 className="text-2xl mb-6">Show Lead {data.lead_number}</h1>
    </div>
  );
}
