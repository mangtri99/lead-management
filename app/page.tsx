import CardWidget from "@/components/CardWidget";
import DonutWidget from "@/components/DonutWidget";
import LayoutDashboard from "@/components/LayoutDashboard";
import http from "@/lib/http";
import { Metadata } from "next";
import FilterGroup from "./_filters/FilterGroup";

export const metadata: Metadata = {
  title: "Lead Management",
  description: "Lead Management",
};

async function getData(params?: string) {
  const url = params ? `/lead?all=true&${params}` : `/lead?all=true`;
  const { data: leads } = await http(url, {
    cache: "no-store",
  });
  const { data: status } = await http("/status");
  const { data: channel } = await http("/channel");
  const { data: media } = await http("/media");
  const { data: source } = await http("/source");

  return {
    leads: leads.data,
    status: status.data,
    channel: channel.data,
    media: media.data,
    source: source.data,
  };
}

export default async function Page(ctx: any) {
  const params = new URLSearchParams(ctx.searchParams).toString();
  const filterDate = {
    from: ctx.searchParams.date_start
      ? new Date(ctx.searchParams.date_start)
      : undefined,
    to: ctx.searchParams.date_end
      ? new Date(ctx.searchParams.date_end)
      : undefined,
  };

  const { leads, status, channel, media, source } = await getData(params);

  const channelCharts = channel.map((item: any) => {
    const data = leads.filter((lead: any) => lead.channel_id === item.id);
    if(data.length > 0) {
      return {
        name: item.name,
        value: data.length
      }
    }
  })
  let channelLabels = channelCharts.length > 0 ? channelCharts.map((item: any) => item?.name) : [];
  let channelSeries = channelCharts.length > 0 ? channelCharts.map((item: any) => item?.value) : [];
  // remove undefined
  channelLabels = channelLabels.filter((item: any) => item !== undefined);
  channelSeries = channelSeries.filter((item: any) => item !== undefined);

  const mediaCharts = media.map((item: any) => {
    const data = leads.filter((lead: any) => lead.media_id === item.id);
    if(data.length > 0) {
      return {
        name: item.name,
        value: data.length
      }
    }
  })

  let mediaLabels = mediaCharts.length > 0 ? mediaCharts.map((item: any) => item?.name) : [];
  let mediaSeries = mediaCharts.length > 0 ? mediaCharts.map((item: any) => item?.value) : [];
  // remove undefined
  mediaLabels = mediaLabels.filter((item: any) => item !== undefined);
  mediaSeries = mediaSeries.filter((item: any) => item !== undefined);


  const sourceCharts = source.map((item: any) => {
    const data = leads.filter((lead: any) => lead.source_id === item.id);
    if(data.length > 0) {
      return {
        name: item.name,
        value: data.length
      }
    }
  })
  let sourceLabels = sourceCharts.length > 0 ? sourceCharts.map((item: any) => item?.name) : [];
  let sourceSeries = sourceCharts.length > 0 ? sourceCharts.map((item: any) => item?.value) : [];
  // remove undefined
  sourceLabels = sourceLabels.filter((item: any) => item !== undefined);
  sourceSeries = sourceSeries.filter((item: any) => item !== undefined);

  return (
    <LayoutDashboard>
      <div className="space-y-4">
        <h1 className="text-2xl font-medium">Dashboard Lead</h1>
        <div className="my-6">
          <FilterGroup />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <CardWidget title="Total Leads" value={leads?.length} />
        </div>
        <div>
          <p className="text-xl font-medium mb-4">Total Leads By Status</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {status.map((item: any) => (
              <CardWidget
                key={item.id}
                title={`${item.name}`}
                value={leads.filter((lead: any) => lead.status_id === item.id).length}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
