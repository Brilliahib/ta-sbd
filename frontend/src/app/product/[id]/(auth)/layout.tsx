"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function AuthProductLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();

      if (!session) {
        const callbackUrl = encodeURIComponent(window.location.pathname);
        router.push(`/login?callbackUrl=${callbackUrl}`);
      } else {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (loading) return null;

  return <>{children}</>;
}
