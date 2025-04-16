"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import { formatPrice } from "@/utils/format-price";
import { CategoryProduct } from "@/types/category-product/category-product";

export const categoryProductColumns = (
  deleteCategoryProductHandler: (data: CategoryProduct) => void,
): ColumnDef<CategoryProduct>[] => [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Nama Kategori",
    cell: ({ row }) => {
      const data = row.original;
      return <p className="line-clamp-1 md:line-clamp-2">{data.name}</p>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
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
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/admin/category/${data.id}`}
            className="flex items-center text-gray-700 hover:underline"
          >
            <Eye className="h-4 w-4" />
            <span className="ml-2">Detail</span>
          </Link>
          <Link
            href={`/dashboard/admin/category/${data.id}/edit`}
            className="flex items-center text-yellow-600 hover:text-yellow-800 hover:underline"
          >
            <SquarePen className="h-4 w-4" />
            <span className="ml-2">Edit</span>
          </Link>
          <div
            className="flex cursor-pointer items-center text-red-600 hover:text-red-800 hover:underline"
            onClick={() => deleteCategoryProductHandler(data)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="ml-2">Hapus</span>
          </div>
        </div>
      );
    },
  },
];
