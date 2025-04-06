"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddExchange } from "@/http/exchange/create-exchange";
import {
  exchangeSchema,
  ExchangeType,
} from "@/validators/exchange/exchange-validator";
import { useDropzone } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ExchangeCreateContentProps {
  id: string;
}

export default function ExchangeCreateContent({
  id,
}: ExchangeCreateContentProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const form = useForm<ExchangeType>({
    resolver: zodResolver(exchangeSchema),
    defaultValues: {
      product_id: id,
      name_product: "",
      image_url_product: "",
      brand_product: "",
      size_product: "",
      condition: "",
    },
    mode: "onChange",
  });

  const router = useRouter();

  const { mutate: addExchangeHandler, isPending } = useAddExchange({
    onError: () => {
      toast.error("Gagal melakukan tukar fashion!");
    },
    onSuccess: async () => {
      toast.success("Berhasil melakukan tukar fashion!");
      return router.push("/dashboard/exchange");
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      form.setValue("image_url_product", file);
      setImagePreview(URL.createObjectURL(file));
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const onSubmit = (body: ExchangeType) => {
    addExchangeHandler({ ...body });
  };

  const removeImage = () => {
    setImagePreview(null);
    form.setValue("image_url_product", null);
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
              name="name_product"
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
              name="brand_product"
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
              name="size_product"
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
                  <FormDescription>
                    Masukkan ukuran produk, bisa berupa huruf (contoh: S, M, L,
                    XL) atau angka (contoh: 38, 42, 44).
                  </FormDescription>
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
              name="image_url_product"
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
                {isPending ? "Loading..." : "Tawar Sekarang"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
