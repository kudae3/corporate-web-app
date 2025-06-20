import { CareerType } from "@/app/careers/Types/career";
import { Alert } from "@/app/components/AlertDialog";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const Delete = ({ career }: { career: CareerType }) => {
  const queryClient = useQueryClient();

  // mutation function
  const mutation = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`http://localhost:3000/api/careers/delete/${id}`),
    onSuccess: () => {
      console.log("Career deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["careers"] });
      toast.success("Career deleted successfully");
    },
    onError: (error) => {
      console.log("Failed to delete career", error);
      toast.error("Failed to delete career");
    },
  });

  const handleDelete = () => {
    mutation.mutate(career?._id);
  };

  return (
    <Alert
      title="Delete Career"
      action="Sure"
      onAction={handleDelete}
      trigger={
        <button className="text-red-600 hover:text-red-900 cursor-pointer">
          <TrashIcon />
        </button>
      }
    >
      <p className="text-sm dark:text-red-300 text-gray-300">
        Are you sure you want to delete this position,{" "}
        <span className="font-bold">{career.title}</span> ? This action cannot
        be undone.
      </p>
    </Alert>
  );
};

export default Delete;
