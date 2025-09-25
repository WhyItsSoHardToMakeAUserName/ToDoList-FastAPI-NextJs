"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push("/auth");
    }
  }, [token, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
