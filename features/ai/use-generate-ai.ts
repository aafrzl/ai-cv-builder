import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/hono-rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof api.ai.$post, 200>;
type RequestType = InferRequestType<typeof api.ai.$post>["json"];

const useGenerateAI = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await api.ai.$post({ json });

      if (!response.ok) {
        throw new Error("Failed to create generate AI");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Summary generated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create document",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export default useGenerateAI;
