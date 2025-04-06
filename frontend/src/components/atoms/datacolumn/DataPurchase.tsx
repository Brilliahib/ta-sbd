"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Purchase } from "@/types/purchases/purchase";
import { formatPrice } from "@/utils/format-price";
import { Badge } from "@/components/ui/badge";

export const purchaseColumns: ColumnDef<Purchase>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Nama Produk",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p className="line-clamp-1 md:line-clamp-2">{data.product.name}</p>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Kategori",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p className="line-clamp-1 md:line-clamp-2">
          {data.product.category.name}
        </p>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p className="line-clamp-1 md:line-clamp-2">
          {formatPrice(data.product.price)}
        </p>
      );
    },
  },
  {
    accessorKey: "is_paid",
    header: "Status Pembayaran",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Badge variant={data.is_paid ? "success" : "destructive"}>
          {data.is_paid ? "Sudah Dibayar" : "Menunggu Konfirmasi"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Pembelian",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning>
          {format(new Date(data.created_at), "EEEE, d MMMM yyyy", {
            locale: id,
          })}
        </p>
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
