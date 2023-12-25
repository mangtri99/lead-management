"use client";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Trash } from "lucide-react";
import React, { useMemo, useState } from "react";
import useLeadFilter from "../_states/filter";
import http from "@/lib/http";

async function getOptions(params?: string): Promise<any> {
  const { data: branch } = await http("/branch");
  const { data: status } = await http("/status");

  const data = {
    branch: branch.data,
    status: status.data,
  };

  return data;
}

function FilterGroup() {
  const { filter, setFilter, handleFilter, resetFilter } = useLeadFilter();
  const [options, setOptions] = useState<any>({});

  useMemo(async () => {
    const data = await getOptions();
    setOptions(data);
  }, []);

  return (
    <div className="mt-6 flex flex-col lg:flex-row items-end w-full lg:gap-x-2 gap-y-2 lg:gap-y-0">
      {/* Search */}
      <div className="lg:w-1/6 w-full">
        <Label htmlFor="search">Search Text</Label>
        <Input
          id="search"
          placeholder="Search"
          value={filter.search}
          onChange={(e) =>
            setFilter({
              ...filter,
              search: e.target.value,
            })
          }
        />
      </div>

      {/* Date */}
      <div className="lg:w-[230px] w-full">
        <Label htmlFor="date">Date</Label>
        <DatePickerWithRange
          id="date"
          date={filter.date}
          setDate={(e) => {
            setFilter({
              ...filter,
              date: e as any,
            });
          }}
        />
      </div>

      {/* Status */}
      <div className="lg:w-1/6 w-full">
        <Label htmlFor="search">Status</Label>
        <Select
          defaultValue={filter.status}
          value={filter.status}
          onValueChange={(val) => {
            setFilter({
              ...filter,
              status: val,
            });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {options?.status?.map((item: any) => (
              <SelectItem key={item.id} value={String(item.id)}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Branch */}
      <div className="lg:w-1/6 w-full">
        <Label htmlFor="search">Branch Office</Label>
        <Select
          defaultValue={filter.branch}
          value={filter.branch}
          onValueChange={(val) => {
            setFilter({
              ...filter,
              branch: val,
            });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select branch" />
          </SelectTrigger>
          <SelectContent>
            {options?.branch?.map((item: any) => (
              <SelectItem key={item.id} value={String(item.id)}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Button Search */}
      <div className="flex items-center space-x-2">
        <Button type="button" onClick={handleFilter}>
          Search
          <Search className="w-6 h-6 ml-2" />
        </Button>

        <Button variant="secondary" type="button" onClick={resetFilter}>
          Reset
          <Trash className="w-6 h-6 ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default FilterGroup;
