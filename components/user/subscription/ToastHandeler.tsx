"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export function ToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const paymentStatus = searchParams.get("payment");

    // console.log(searchParams);

    // console.log("paymentStatus", paymentStatus);

    if (paymentStatus === "success") {
      toast.success("Payment successful! Your plan has been upgraded.");

      // Clean the URL so the toast doesn't pop up again on refresh
      const params = new URLSearchParams(searchParams.toString());
      params.delete("payment");
      router.replace(`/dashboard?${params.toString()}`);
    }

    if (paymentStatus === "cancelled") {
      toast.error("Payment cancelled. No changes were made to your account.");

      const params = new URLSearchParams(searchParams.toString());
      params.delete("payment");
      router.replace(`/dashboard?${params.toString()}`);
    }
  }, [searchParams, router]);

  return null;
}
