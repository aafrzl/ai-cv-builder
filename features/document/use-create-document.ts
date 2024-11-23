import { toast } from "@/hooks/use-toast";
import { client } from "@/lib/hono-rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.document.create.$post>;
type RequestType = InferRequestType<
  typeof client.api.document.create.$post
>["json"];

const useCreateDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.document.create.$post({ json });

      if (!response.ok) {
        throw new Error("Failed to create document");
      }

      return await response.json();
    },
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries({
        queryKey: ["documents"],
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

export default useCreateDocument;
