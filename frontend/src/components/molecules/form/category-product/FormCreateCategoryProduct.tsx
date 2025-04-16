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
import { useAddNewCategoryProduct } from "@/http/category-product/create-category-product";
import {
  categoryProductSchema,
  CategoryProductType,
} from "@/validators/category-product/category-product-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormCreateCategoryProduct() {
  const form = useForm<CategoryProductType>({
    resolver: zodResolver(categoryProductSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const router = useRouter();

  const { mutate: addCategoryProductHandler, isPending } =
    useAddNewCategoryProduct({
      onError: () => {
        toast.error("Gagal menambahkan kategori produk baru!");
      },
      onSuccess: async () => {
        toast.success("Berhasil menambahkan kategori produk baru!");
        return router.push("/dashboard/admin/category");
      },
    });

  const onSubmit = (body: CategoryProductType) => {
    addCategoryProductHandler({ ...body });
  };

  return (
    <Card>
      <CardContent className="p-6">
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
                    Nama Kategori <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="name_product"
                      placeholder="Masukkan nama kategori"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Tambahkan"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
