"use client";

import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function useLeadFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [filter, setFilter] = useState({
    search: searchParams.get("search") || "",
    date: {
      from: searchParams.get("date_start")
        ? new Date(searchParams.get("date_start") as string)
        : undefined,
      to: searchParams.get("date_end")
        ? new Date(searchParams.get("date_end") as string)
        : undefined,
    },
    status: searchParams.get("status") || "",
    branch: searchParams.get("branch") || "",
  });

  function handleFilter() {
    const qs = new URLSearchParams(searchParams);

    // sync filter to url
    if (filter.search) {
      qs.set("search", filter.search);
    } else {
      qs.delete("search");
    }

    if (filter.date?.from) {
      qs.set("date_start", dayjs(filter.date.from).format("YYYY-MM-DD"));
    } else {
      qs.delete("date_start");
    }

    if (filter.date?.to) {
      qs.set("date_end", dayjs(filter.date.to).format("YYYY-MM-DD"));
    } else {
      qs.delete("date_end");
    }

    if (filter.status) {
      qs.set("status", filter.status);
    } else {
      qs.delete("status");
    }

    if (filter.branch) {
      qs.set("branch", filter.branch);
    } else {
      qs.delete("branch");
    }

    router.push(pathname + "?" + qs.toString());
  }

  function resetFilter() {
    setFilter({
      search: "",
      date: {
        from: undefined,
        to: undefined,
      },
      status: "",
      branch: "",
    });

    router.push(pathname);
  }

  return {
    filter,
    setFilter,
    handleFilter,
    resetFilter,
  };
}
