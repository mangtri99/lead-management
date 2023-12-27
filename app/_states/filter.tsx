"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import dayjs from "dayjs";

export default function useDashboardFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [filter, setFilter] = useState({
    // if no query param, set default value from = current month first date
    // if no query param, set default value to = current month last date
    date: {
      from: searchParams.get("date_start")
        ? new Date(searchParams.get("date_start") as string)
        : new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      to: searchParams.get("date_end")
        ? new Date(searchParams.get("date_end") as string)
        : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    },
  });

  function handleFilter() {
    const qs = new URLSearchParams(searchParams);

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

    router.push(pathname + "?" + qs.toString());
  }

  return {
    filter,
    setFilter,
    handleFilter,
  };
}
