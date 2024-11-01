import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ updatedCabin, id }) => updateCabin(updatedCabin, id),
    onSuccess: () => {
      toast.success("Cabin is updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, editCabin };
}
