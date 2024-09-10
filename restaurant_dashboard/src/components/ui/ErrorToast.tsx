"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function ErrorToast({ error }: { error: string }) {
  useEffect(() => {
    if (error) {
      toast.error(error,{
        id: error
      });
    }
  }, [error]);

  return null;
}
