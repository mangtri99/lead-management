"use client";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Option } from "@/lib/types";
import http from "@/lib/http";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Home, Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import useFormLead from "../_states/form";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

async function getOptions(params?: string): Promise<any> {
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

export default function FormGroup() {
  const params = useParams();
  const router = useRouter();
  const [options, setOptions] = useState<any>({});
  const { form, schema } = useFormLead();
  const { toast } = useToast();

  useMemo(async () => {
    const data = await getOptions();
    setOptions(data);
  }, []);

  function onChannelChange(val: number) {
    const getMedia = options?.channel?.find(
      (item: Option) => item.id === form.getValues("channel_id")
    );
    // setMediaOptions(getMedia?.medias);
    if (
      form.getValues("media_id") &&
      !getMedia?.medias?.find(
        (item: Option) => item.id === form.getValues("media_id")
      )
    ) {
      form.setValue("media_id", null);
    }
  }

  function onMediaChange(val: number) {
    const getMedia = options?.channel?.find(
      (item: Option) => item.id === form.getValues("channel_id")
    );
    const getMediaSource = getMedia?.medias?.find(
      (item: Option) => item.id === form.getValues("media_id")
    );
    // setSourceOptions(getMediaSource?.sources);
    if (
      form.getValues("source_id") &&
      !getMediaSource?.sources?.find(
        (item: Option) => item.id === form.getValues("source_id")
      )
    ) {
      form.setValue("source_id", null);
    }
  }

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof schema>) {
    let url = "/lead";
    if (params.id) {
      url = `/lead/${params.id}`;
    }
    const { data, isError } = await http(url, {
      method: params.id ? "PUT" : "POST",
      body: JSON.stringify(values),
    });

    if (isError) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      if (data.errors) {
        Object.keys(data.errors).forEach((key: any) => {
          form.setError(key, {
            type: "manual",
            message: data.errors[key][0],
          });
        });
      }
    } else {
      toast({
        title: "Success",
        description: params.id ? "Lead updated" : "Lead created",
      });

      router.push("/lead");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="p-4">
          <h2 className="mb-4 flex items-center text-xl">
            <Home className="mr-2" />
            General
          </h2>
          <div className="flex justify-between">
            <div className="w-full lg:w-1/2 space-y-4">
              {/* Branch */}
              <FormField
                control={form.control}
                name="branch_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch Office </FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      defaultValue={
                        field.value ? String(field.value) : undefined
                      }
                      value={field.value ? String(field.value) : undefined}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Ownership Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {options?.branch?.map((item: Option, idx: number) => (
                          <SelectItem key={idx} value={String(item.id)}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Fullname */}
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Type your email here"
                        {...field}
                        value={field.value ? String(field.value) : undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company */}
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g PT. Abadi Jaya"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g Jl Raya Kerobokan"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="e.g arbimdy@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="e.g 081123001002"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label htmlFor="date">Latitude & Longitude</Label>
                <div className="flex items-center gap-x-4">
                  {/* Latitude */}
                  <div className="w-full lg:w-1/2">
                    <FormField
                      control={form.control}
                      name="latitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="e.g -8.12341"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* longitude */}
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="longitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="e.g 115.12334"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="mb-4 flex items-center text-xl">
            <Info className="mr-2" />
            Other Information
          </h2>
          <div className="flex justify-between">
            <div className="w-1/2 space-y-4">
              {/* Status */}
              <FormField
                control={form.control}
                name="status_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      defaultValue={
                        field.value ? String(field.value) : undefined
                      }
                      value={field.value ? String(field.value) : undefined}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {options.status?.map((item: Option) => (
                          <SelectItem key={item.name} value={String(item.id)}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Probability */}
              <FormField
                control={form.control}
                name="probability_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Probability</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      defaultValue={
                        field.value ? String(field.value) : undefined
                      }
                      value={field.value ? String(field.value) : undefined}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {options.probability?.map((item: Option) => (
                          <SelectItem key={item.name} value={String(item.id)}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type */}
              <FormField
                control={form.control}
                name="type_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lead Type</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      defaultValue={
                        field.value ? String(field.value) : undefined
                      }
                      value={field.value ? String(field.value) : undefined}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {options?.type?.map((item: Option) => (
                          <SelectItem key={item.name} value={String(item.id)}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Channel */}
              <FormField
                control={form.control}
                name="channel_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lead Channel</FormLabel>
                    <Select
                      onValueChange={(val) => {
                        field.onChange(Number(val));
                        onChannelChange(Number(val));
                        form.trigger("channel_id");
                      }}
                      defaultValue={
                        field.value ? String(field.value) : undefined
                      }
                      value={field.value ? String(field.value) : undefined}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {options?.channel?.map((item: Option) => (
                          <SelectItem key={item.name} value={String(item.id)}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Media */}
              {form.getValues("channel_id") &&
                options?.media?.filter(
                  (item: any) =>
                    item.channel_id === form.getValues("channel_id")
                ).length > 0 && (
                  <FormField
                    control={form.control}
                    name="media_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lead Media</FormLabel>
                        <Select
                          onValueChange={(val) => {
                            field.onChange(Number(val));
                            onMediaChange(Number(val));
                            form.trigger("media_id");
                          }}
                          defaultValue={
                            field.value ? String(field.value) : undefined
                          }
                          value={field.value ? String(field.value) : undefined}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {form.getValues("channel_id") &&
                              options?.media
                                ?.filter(
                                  (item: any) =>
                                    item.channel_id ===
                                    form.getValues("channel_id")
                                )
                                ?.map((item: Option) => (
                                  <SelectItem
                                    key={item.name}
                                    value={String(item.id)}
                                  >
                                    {item.name}
                                  </SelectItem>
                                ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              {/* Source */}
              {form.getValues("media_id") &&
                options?.source?.filter(
                  (item: any) => item.media_id === form.getValues("media_id")
                ).length > 0 && (
                  <FormField
                    control={form.control}
                    name="source_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lead Source</FormLabel>
                        <Select
                          onValueChange={(val) => {
                            field.onChange(Number(val));
                            form.trigger("source_id");
                          }}
                          defaultValue={
                            field.value ? String(field.value) : undefined
                          }
                          value={field.value ? String(field.value) : undefined}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {form.getValues("media_id") &&
                              options?.source
                                ?.filter(
                                  (item: any) =>
                                    item.media_id === form.getValues("media_id")
                                )
                                ?.map((item: Option) => (
                                  <SelectItem
                                    key={item.name}
                                    value={String(item.id)}
                                  >
                                    {item.name}
                                  </SelectItem>
                                ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
            </div>
          </div>
        </Card>

        {/* <Button type="submit">Submit</Button> */}

        <Button type="submit"> Submit </Button>
      </form>
    </Form>
  );
}
