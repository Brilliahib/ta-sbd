"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { Eye } from "lucide-react";
import { formatPrice } from "@/utils/format-price";
import { User } from "@/types/user/user";

export const usersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => {
      const data = row.original;
      return <p className="line-clamp-1 md:line-clamp-2">{data.name}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const data = row.original;
      return <p className="line-clamp-1 md:line-clamp-2">{data.email}</p>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const data = row.original;
      return <p className="line-clamp-1 md:line-clamp-2">{data.role}</p>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Bergabung",
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
            href={`/dashboard/admin/users/${data.id}`}
            className="flex items-center text-gray-700 hover:underline"
          >
            <Eye className="h-4 w-4" />
            <span className="ml-2">Detail</span>
          </Link>
        </div>
      );
    },
  },
];
