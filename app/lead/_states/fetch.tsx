import http from "@/lib/http";

export default async function getOptions(params?: string): Promise<any> {
  const { data: branch } = await http("/branch");
  const { data: status } = await http("/status");
  const { data: probability } = await http("/probability");
  const { data: type } = await http("/type");
  const { data: channel } = await http("/channel");
  const { data: media } = await http("/media");
  const { data: source } = await http("/source");

  const data = {
    branch: branch.data,
    status: status.data,
    probability: probability.data,
    type: type.data,
    channel: channel.data,
    media: media.data,
    source: source.data,
  };

  return data;
}