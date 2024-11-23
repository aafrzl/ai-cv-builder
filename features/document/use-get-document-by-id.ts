import { api } from "@/lib/hono-rpc";
import { useQuery } from "@tanstack/react-query";

const useGetDocumentById = (documentId: string) => {
  const query = useQuery({
    queryKey: ["document", documentId],
    queryFn: async () => {
      const endpoint = api.document[":documentId"];

      const response = await endpoint.$get({
        param: {
          documentId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch document");
      }

      const { data, success } = await response.json();

      return {
        data,
        success,
      };
    },
    retry: 3,
  });

  return query;
};

export default useGetDocumentById;