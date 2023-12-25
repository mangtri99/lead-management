import CardWidget from "@/components/CardWidget";
import DonutWidget from "@/components/DonutWidget";
import LayoutDashboard from "@/components/LayoutDashboard";
import { Card } from "@/components/ui/card";
import http from "@/lib/http";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Management",
  description: "Lead Management",
};

async function getData() {
  const { data: leads } = await http(`/lead`, {
    cache: "no-store",
  });
  const { data: status } = await http("/status");
  const { data: channel } = await http("/channel");
  const { data: media } = await http("/media");
  const { data: source } = await http("/source");

  return {
    leads: leads,
    status: status.data,
    channel: channel.data,
    media: media.data,
    source: source.data,
  };
}

export default async function Page() {
  const { leads, channel, media, status, source } = await getData();

  const channelSeries = channel.map((item: any) => Number(item.leads_count));
  const channelLabels = channel.map((item: any) => item.name);

  const mediaSeries = media.map((item: any) => Number(item.leads_count));
  const mediaLabels = media.map((item: any) => item.name);

  const sourceSeries = source.map((item: any) => Number(item.leads_count));
  const sourceLabels = source.map((item: any) => item.name);

  return (
    <LayoutDashboard>
      <div className="space-y-4">
        <h1 className="text-2xl font-medium mb-6">Dashboard Lead</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <CardWidget title="Total Leads" value={leads.meta.total} />
        </div>
        <div>
          <p className="text-xl font-medium mb-4">Total Leads By Status</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {status.map((item: any) => (
              <CardWidget
                key={item.id}
                title={`${item.name}`}
                value={item.leads_count}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <DonutWidget
              series={channelSeries}
              labels={channelLabels}
              title="Number leads by Channel"
            />
            <DonutWidget
              series={mediaSeries}
              labels={mediaLabels}
              title="Number leads by Media"
            />
            <DonutWidget
              series={sourceSeries}
              labels={sourceLabels}
              title="Number leads by Source"
            />
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
}
