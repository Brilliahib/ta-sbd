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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllCategoryProduct } from "@/http/category-product/get-all-category-product";
import { useEditProduct } from "@/http/product/edit-product";
import { Product } from "@/types/product/product";
import {
  productSchema,
  ProductType,
} from "@/validators/product/product-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormEditProductProps {
  id: string;
  data: Product;
  isLoading: boolean;
}

export default function FormEditProduct({
  id,
  data,
  isLoading,
}: FormEditProductProps) {
  const { data: category } = useGetAllCategoryProduct();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category_id: data.category.id ?? "",
      name: data.name ?? "",
      image_url: data.image_url ?? null,
      brand: data.brand ?? "",
      size: data.size ?? "",
      condition: data.condition ?? "",
      price: data.price ?? 0,
      description: data.description ?? "",
    },
    mode: "onChange",
  });

  const router = useRouter();

  const { mutate: editProductHandler, isPending } = useEditProduct({
    onError: () => {
      toast.error("Gagal menambahkan produk baru!");
    },
    onSuccess: async () => {
      toast.success("Berhasil menambahkan produk baru!");
      return router.push("/dashboard/product");
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      form.setValue("image_url", file);
      setImagePreview(URL.createObjectURL(file));
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  useEffect(() => {
    if (data.image_url) {
      setImagePreview(data.image_url);
    }
  }, [data.image_url]);

  const onSubmit = (body: ProductType) => {
    const isNewFile = body.image_url instanceof File;

    const payload = {
      ...body,
      image_url: isNewFile ? body.image_url : data.image_url,
    };

    editProductHandler({ id, body: payload });
  };

  const removeImage = () => {
    setImagePreview(null);
    form.setValue("image_url", null);
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
                      Nama Produk <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="name_product"
                        placeholder="Masukkan nama produk"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Kategori Produk <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih kategori produk" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Kategori Produk</SelectLabel>
                            {category?.data.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Harga Produk <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        id="name_product"
                        placeholder="Masukkan harga produk"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Produk</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="brand_product"
                        placeholder="Masukkan brand produk"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? null : e.target.value,
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Size Produk <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="size_product"
                        placeholder="Masukkan size produk"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Kondisi Produk <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="password"
                        placeholder="Masukkan kondisi produk"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Produk</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="brand_product"
                        placeholder="Masukkan deskripsi produk"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? null : e.target.value,
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image_url"
                render={() => (
                  <FormItem>
                    <FormLabel>
                      Gambar <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div>
                        <div
                          {...getRootProps()}
                          className={`flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-primary bg-primary/10 py-8 ${
                            isDragActive ? "border-gray-300" : "border-gray-300"
                          }`}
                        >
                          <Input {...getInputProps()} />
                          {imagePreview ? (
                            <div className="relative flex w-full justify-center">
                              <Image
                                src={imagePreview}
                                alt="Preview"
                                className="max-h-[200px] w-fit rounded-lg object-cover"
                                width={1000}
                                height={1000}
                              />
                              <Button
                                className="absolute right-2 top-2 px-3 shadow-lg"
                                variant="destructive"
                                onClick={removeImage}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : isDragActive ? (
                            <p className="text-blue-500">
                              Drop gambar di sini ...
                            </p>
                          ) : (
                            <div className="space-y-4 py-4 text-center">
                              <CloudUpload className="mx-auto h-10 w-10 text-primary" />
                              <p className="text-sm">
                                Drag & drop gambar ke sini, atau klik untuk
                                memilih
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
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
