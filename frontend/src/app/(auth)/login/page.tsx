import LoginWrapperContent from "@/components/organisms/auth/login/LoginWrapperContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk | Vintagee",
  description: "Masuk ke Vintagee untuk mengakses fitur-fitur yang tersedia.",
};

export default function AuthLoginPage() {
  return <LoginWrapperContent />;
}
