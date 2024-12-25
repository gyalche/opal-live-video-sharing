import { MutationFunction, MutationKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationData = (
  mutationKey: MutationKey,
  mutationFn: MutationFunction<unknown, unknown>,
  queryKey?: string,
  onSuccess?: () => void,
) => {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess(data: unknown){
      if(onSuccess) onSuccess();
      return toast(data?.status === 200 ? 'Success' : 'Error', {
        description: data?.data
      })
    },
    onSettled: async() => {
      return await client.invalidateQueries({queryKey: [queryKey]});
    }
  })

  return { mutate, isPending }
};
