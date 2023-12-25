import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { APIResponsePagination, Lead } from "@/lib/types";
import { columns } from "./_states/column";
import http from "@/lib/http";
import FilterGroup from "./_filters/FilterGroup";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

async function getData(
  params?: string
): Promise<APIResponsePagination<Lead[]>> {
  const url = params ? `/lead?${params}` : `/lead`;

  const { data } = await http(url, {
    method: "GET",
    cache: "no-store",
  });
  return data;
}

export default async function Page(ctx: any) {
  // convert object to string
  const params = new URLSearchParams(ctx.searchParams).toString();
  console.log(ctx);

  const data = await getData(params);

  function handleChangePage(page: string): string {
    let qs = ctx.searchParams;
    if (page === "prev") {
      qs = {
        ...qs,
        page: String(data?.meta?.current_page - 1),
      };
    } else if (page === "next") {
      qs = {
        ...qs,
        page: String(data?.meta?.current_page + 1),
      };
    } else {
      qs = {
        ...qs,
        page: page,
      };
    }

    const qsString = new URLSearchParams(qs).toString();
    return `/lead?${qsString}`;
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <h1>Lead Manage</h1>
        <Link href="/lead/create">
          <Button>
            Add New <Plus className="w-6 h-6 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <FilterGroup />

      <div className="mt-6">
        <DataTable columns={columns} data={data.data} />
        <div className="mt-4 flex w-full justify-end">
          <Pagination className="justify-end">
            <PaginationContent>
              {data?.meta?.links &&
                data?.meta?.links?.map((link: any, idx: number) => {
                  const isFirstIndex = idx === 0;
                  const isLastIndex = idx === data?.meta?.links.length - 1;
                  return (
                    <div className="flex" key={idx}>
                      {isFirstIndex && (
                        <PaginationItem>
                          {link.active ? (
                            <Link href={handleChangePage("prev")}>
                              <PaginationPrevious />
                            </Link>
                          ) : (
                            <PaginationPrevious className="hover:cursor-not-allowed" />
                          )}
                        </PaginationItem>
                      )}

                      {!isFirstIndex && !isLastIndex && (
                        <PaginationItem>
                          <Link href={handleChangePage(link.label)}>
                            <PaginationLink
                              className={cn({
                                "bg-secondary ":
                                  String(data?.meta?.current_page) ===
                                  link.label,
                              })}
                            >
                              {link.label}
                            </PaginationLink>
                          </Link>
                        </PaginationItem>
                      )}

                      {isLastIndex && (
                        <PaginationItem>
                          {link.active ? (
                            <Link href={handleChangePage("next")}>
                              <PaginationNext />
                            </Link>
                          ) : (
                            <PaginationNext className="hover:cursor-not-allowed" />
                          )}
                        </PaginationItem>
                      )}
                    </div>
                  );
                })}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Card>
  );
}
