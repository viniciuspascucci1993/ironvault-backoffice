"use client";

import { useEffect } from "react";

export default function TokenRefresher() {
  useEffect(() => {
    const interval = setInterval(
      async () => {
        try {
          await fetch("/api/auth/refresh", { method: "POST" });
        } catch {
          // silently fail
        }
      },
      1000 * 60 * 60 * 23,
    ); // renova a cada 23 horas

    return () => clearInterval(interval);
  }, []);

  return null;
}
