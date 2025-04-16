"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useEditCategoryProduct } from "@/http/category-product/edit-category-product";
import { CategoryProduct } from "@/types/category-product/category-product";
import {
  categoryProductSchema,
  CategoryProductType,
} from "@/validators/category-product/category-product-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormEditCategoryProductProps {
  id: string;
  data: CategoryProduct;
  isLoading: boolean;
}

export default function FormEditCategoryProduct({
  id,
  data,
  isLoading,
}: FormEditCategoryProductProps) {
  const form = useForm<CategoryProductType>({
    resolver: zodResolver(categoryProductSchema),
    defaultValues: {
      name: data.name ?? "",
    },
    mode: "onChange",
  });

  const router = useRouter();

  const { mutate: editCategoryProduct, isPending } = useEditCategoryProduct({
    onError: () => {
      toast.error("Gagal memperbarui kategori produk!");
    },
    onSuccess: async () => {
      toast.success("Berhasil memperbarui kategori produk!");
      return router.push("/dashboard/admin/category");
    },
  });

  const onSubmit = (body: CategoryProductType) => {
    editCategoryProduct({ id, body });
  };

  return (
    <Card>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <div className="flex justify-end">
              <Skeleton className="h-10 w-[120px]" />
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form
              className="space-y-5 md:space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Kategori Produk <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="name_product"
                        placeholder="Masukkan nama kategori produk"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Loading..." : "Simpan"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
