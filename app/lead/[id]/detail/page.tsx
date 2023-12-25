import { Card } from "@/components/ui/card";
import http from "@/lib/http";
import { Lead } from "@/lib/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Show Lead",
  description: "Show Lead",
};

async function getData(id: string): Promise<Lead> {
  const { data } = await http(`/lead/${id}`, {
    method: "GET",
  });
  return data.data;
}

export default async function Page({ params }: { params: any }) {
  const data = await getData(params.id);

  return (
    <div>
      <Card className="p-4">
        <h1 className="text-2xl mb-6">Show Lead Number #{data.lead_number}</h1>
        <div className="flex flex-col lg:flex-row w-full items-center lg:gap-x-4 gap-x-0 space-y-4 lg:space-y-0">
          <div className="w-full lg:w-1/2 space-y-4">
            <div>
              <p className="font-medium">Branch</p>
              <p className="text-sm">{data.branch?.name}</p>
            </div>
            <div>
              <p className="font-medium">Full Name</p>
              <p className="text-sm">{data.fullname}</p>
            </div>
            <div>
              <p className="font-medium">Company Name</p>
              <p className="text-sm">{data.company_name}</p>
            </div>
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm">{data.email}</p>
            </div>
            <div>
              <p className="font-medium">Address</p>
              <p className="text-sm">{data.address}</p>
            </div>
            <div>
              <p className="font-medium">Phone Number</p>
              <p className="text-sm">{data.phone_number}</p>
            </div>
            <div>
              <p className="font-medium">Latitude & Longitude</p>
              <p className="text-sm">
                {data.latitude} - {data.longitude}
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <div>
              <p className="font-medium">Status</p>
              <p className="text-sm">{data.status?.name}</p>
            </div>
            <div>
              <p className="font-medium">Probability</p>
              <p className="text-sm">{data.probability?.name}</p>
            </div>
            <div>
              <p className="font-medium">Lead Type</p>
              <p className="text-sm">{data.type?.name}</p>
            </div>
            <div>
              <p className="font-medium">Lead Channel</p>
              <p className="text-sm">{data.channel?.name}</p>
            </div>
            <div>
              <p className="font-medium">Notes</p>
              <p className="text-sm">{data.notes}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
