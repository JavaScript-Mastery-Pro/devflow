"use client";

import { useEffect } from "react";

import { toast } from "@/hooks/use-toast";
import { incrementViews } from "@/lib/actions/question.action";

const Views = ({ questionId }: { questionId: string }) => {
  const handleIncrement = async () => {
    const result = await incrementViews({ questionId });
    if (result.success) {
      toast({
        title: "Success",
        description: "Views incremented successfully",
      });
    } else {
      toast({
        title: "Error",
        description: result.error?.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    handleIncrement();
  }, []);

  return null;
};

export default Views;
