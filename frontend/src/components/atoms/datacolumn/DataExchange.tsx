"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Exchange } from "@/types/exchange/exchange";
import Image from "next/image";

export const exchangeColumns: ColumnDef<Exchange>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "image",
    header: "Foto Produk",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Image
          src={data.image_url_product}
          alt={data.name_product}
          width={100}
          height={100}
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Nama Produk",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p className="line-clamp-1 md:line-clamp-2">{data.name_product}</p>
      );
    },
  },
  {
    accessorKey: "brand_product",
    header: "Brand Produk",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p className="line-clamp-1 md:line-clamp-2">{data.brand_product}</p>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Size Produk",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p className="line-clamp-1 md:line-clamp-2">{data.size_product}</p>
      );
    },
  },
  {
    accessorKey: "condition",
    header: "Kondisi Produk",
    cell: ({ row }) => {
      const data = row.original;
      return <p className="line-clamp-1 md:line-clamp-2">{data.condition}</p>;
    },
  },
  {
    accessorKey: "is_accepted",
    header: "Status",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Badge variant={data.is_accepted ? "success" : "destructive"}>
          {data.is_accepted ? "Setuju" : "Tidak Setuju"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <ActionButton>
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={`/dashboard/purchase/${data.id}`}
              className="flex items-center text-gray-700"
            >
              <Eye className="h-4 w-4" />
              <span className="ml-2">Detail Pembelian</span>
            </Link>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
