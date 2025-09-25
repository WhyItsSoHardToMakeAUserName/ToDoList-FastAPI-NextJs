"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("Bearer");
    setToken(savedToken);
    setLoading(false);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("Bearer", newToken);
    setToken(newToken);
    router.push("/tasks");
  };

  const logout = () => {
    localStorage.removeItem("Bearer");
    setToken(null);
    router.push("/");
  };

  return { token, loading, login, logout };
};
