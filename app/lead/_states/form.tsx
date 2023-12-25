"use client";
import http from "@/lib/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useFormLead() {
  const params = useParams();

  // Login Schema
  const schema = z.object({
    branch_id: z
      .number()
      .nullable()
      .refine((val) => val !== null, { message: "Branch is required" }),
    fullname: z.string().refine((val) => val !== "", {
      message: "Fullname is required",
    }),
    company_name: z.string().refine((val) => val !== "", {
      message: "Company Name is required",
    }),
    address: z.string().refine((val) => val !== "", {
      message: "Address is required",
    }),
    email: z.string().email(),
    phone_number: z
      .string()
      .min(11, { message: "Phone Number must be at least 11 characters" })
      .max(13, { message: "Phone Number must be at most 13 characters" })
      .regex(/^[0-9]+$/, { message: "Phone Number must be numeric" }),
    latitude: z.string().refine((val) => val !== "", {
      message: "Latitude is required",
    }),
    longitude: z.string().refine((val) => val !== "", {
      message: "Longitude is required",
    }),
    status_id: z
      .number()
      .nullable()
      .refine((val) => val !== null, { message: "Status is required" }),
    probability_id: z
      .number()
      .nullable()
      .refine((val) => val !== null, { message: "Probability is required" }),
    type_id: z
      .number()
      .nullable()
      .refine((val) => val !== null, { message: "Type is required" }),
    channel_id: z
      .number()
      .nullable()
      .refine((val) => val !== null, { message: "Channel is required" }),
    media_id: z.number().nullable(),
    source_id: z.number().nullable(),
    notes: z.string().nullable(),
  });

  const [defaultValues, setDefaultValues] = useState<z.infer<typeof schema>>({
    branch_id: null,
    fullname: "",
    address: "",
    email: "",
    company_name: "",
    phone_number: "",
    latitude: "",
    longitude: "",
    status_id: null,
    probability_id: null,
    type_id: null,
    channel_id: null,
    media_id: null,
    source_id: null,
    notes: null,
  });

  // Form Resolver
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: async () => {
      // if edit or detail, get data from api
      if (params.id) {
        const { data, isError } = await http(`/lead/${params.id}`);
        if (!isError) {
          const defaultFormValues = {
            branch_id: data.data.branch_id,
            fullname: data.data.fullname,
            address: data.data.address,
            email: data.data.email,
            company_name: data.data.company_name,
            phone_number: data.data.phone_number,
            latitude: data.data.latitude,
            longitude: data.data.longitude,
            status_id: data.data.status_id,
            probability_id: data.data.probability_id,
            type_id: data.data.type_id,
            channel_id: data.data.channel_id,
            media_id: data.data.media_id,
            source_id: data.data.source_id,
            notes: data.data.notes,
          };
          setDefaultValues(defaultFormValues);
          return defaultFormValues;
        } else {
          return defaultValues;
        }
      } else {
        return defaultValues;
      }
    },
  });

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  return {
    form,
    schema,
  };
}
