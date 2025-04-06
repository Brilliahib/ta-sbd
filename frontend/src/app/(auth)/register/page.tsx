import RegisterWrapperContent from "@/components/organisms/auth/register/RegisterWrapperContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar | Vintagee",
  description: "Daftar ke Vintagee untuk mengakses fitur-fitur yang tersedia.",
};

export default function AuthRegisterPage() {
  return <RegisterWrapperContent />;
}
