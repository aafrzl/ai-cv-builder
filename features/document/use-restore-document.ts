import { toast } from "@/hooks/use-toast";
import { client } from "@/lib/hono-rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  typeof client.api.document.restore.archived.$patch
>;

type RequestType = InferRequestType<
  typeof client.api.document.restore.archived.$patch
>["json"];

const useRestoreDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.document.restore.archived.$patch({
        json,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["trashDocuments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
      queryClient.invalidateQueries({
        queryKey: ["document"],
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to restore document",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export default useRestoreDocument;
