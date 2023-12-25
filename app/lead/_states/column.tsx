"use client";

import { Lead } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const ActionComponent = ({ row }: { row: any }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.push(`/lead/${row.original.id}/detail`)}
        >
          Detail
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/lead/${row.original.id}/edit`)}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-700 hover:text-red-800 focus:text-red-800">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Lead>[] = [
  {
    id: "lead",
    header: "#Lead",
    cell(props) {
      const fullname = props.row.original.fullname;
      const address = props.row.original.address;
      const lead_number = props.row.original.lead_number;
      const branch = props.row.original.branch.name;
      return (
        <div className="space-y-2">
          <div>
            <p>{fullname}</p>
            <p>{address}</p>
          </div>
          <div>
            <p className="text-primary">#{lead_number}</p>
            <p className="whitespace-nowrap text-netral">{branch}</p>
          </div>
        </div>
      );
    },
  },
  {
    id: "primary_contact",
    header: "Primary Contact",
    cell(props) {
      const phone = props.row.original.phone_number;
      const email = props.row.original.email;
      return (
        <div>
          <p>{phone}</p>
          <p>{email}</p>
        </div>
      );
    },
  },
  {
    id: "info",
    header: "Info",
    cell(props) {
      const probability = props.row.original.probability.name;
      const status = props.row.original.status.name;
      return (
        <div className="space-y-2 whitespace-nowrap">
          <div>
            <p className="text-gray-400 mb-1">Probabilty</p>
            <Badge className="bg-cream text-cream-foreground hover:bg-cream hover:text-cream-foreground">
              {probability}
            </Badge>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Status</p>
            <Badge className="bg-info text-info-foreground hover:bg-info hover:text-info-foreground">
              {status}
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    id: "info_source",
    header: "Info Source",
    cell(props) {
      const channel = props.row.original.channel.name;
      const media = props.row.original.media?.name;
      const source = props.row.original.source?.name;
      return (
        <div className="space-y-2 whitespace-nowrap">
          {channel && (
            <div>
              <p className="text-gray-400 mb-1">Channel</p>
              <p className="font-medium">{channel}</p>
            </div>
          )}
          {media && (
            <div>
              <p className="text-gray-400 mb-1">Media</p>
              <p className="font-medium">{media}</p>
            </div>
          )}
          {source && (
            <div>
              <p className="text-gray-400 mb-1">Source</p>
              <p className="font-medium">{source}</p>
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: "Created At",
    cell(props) {
      const date = props.row.original.created_at;
      // format DD/MM/YYYY HH:MM
      const formattedDate = dayjs(date).format("DD/MM/YYYY HH:MM");
      return <div className="whitespace-nowrap">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell(props) {
      return <ActionComponent row={props.row} />;
    },
  },
];
