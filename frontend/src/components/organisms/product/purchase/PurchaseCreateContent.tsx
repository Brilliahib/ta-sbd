"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, Trash2, Copy } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  purchaseSchema,
  PurchaseType,
} from "@/validators/purchase/purchase-validator";
import { useAddPurchase } from "@/http/purchases/create-purchase";

interface PurchaseCreateContentProps {
  id: string;
}

export default function PurchaseCreateContent({
  id,
}: PurchaseCreateContentProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const form = useForm<PurchaseType>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      product_id: id,
      payment_proof_url: "",
    },
    mode: "onChange",
  });

  const router = useRouter();

  const { mutate: addExchangeHandler, isPending } = useAddPurchase({
    onError: () => {
      toast.error("Gagal melakukan order!");
    },
    onSuccess: async () => {
      toast.success("Berhasil melakukan order!");
      return router.push("/dashboard/purchase");
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      form.setValue("payment_proof_url", file);
      setImagePreview(URL.createObjectURL(file));
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const onSubmit = (body: PurchaseType) => {
    addExchangeHandler({ ...body });
  };

  const removeImage = () => {
    setImagePreview(null);
    form.setValue("payment_proof_url", null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Nomor rekening disalin!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Silahkan Lakukan Pembayaran</CardTitle>
        <CardDescription>
          <div className="mb-4">
            Pilih nomor rekening dan transfer sesuai dengan harga produk.
          </div>
          <div className="flex items-center gap-1">
            <span>BNI 124 135 199 0</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard("1241351990")}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <span>BRI 122 333 000 666 999</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard("122333000666999")}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-5 md:space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="payment_proof_url"
              render={() => (
                <FormItem>
                  <FormLabel>
                    Bukti Pembayaran <span className="text-red-500">*</span>
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
                {isPending ? "Loading..." : "Beli Sekarang"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
