"use client";

import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import useDashboardFilter from "../_states/filter";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function FilterGroup() {
  const { filter, setFilter, handleFilter } = useDashboardFilter();
  return (
    <div className="flex items-end space-x-4">
      {/* Date */}
      <div className="lg:w-[230px] w-full">
        <Label htmlFor="date">Filter data by Date</Label>
        <DatePickerWithRange
          id="date"
          date={filter.date}
          setDate={(val) => {
            setFilter({
              ...filter,
              date: val as any,
            });
          }}
        />
      </div>
      <div>
        <Button type="button" onClick={handleFilter}>
          Search
          <Search className="w-6 h-6 ml-2" />
        </Button>
      </div>
    </div>
  );
}
