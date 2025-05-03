import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";

type DeleteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
};

const Delete = ({ open, onOpenChange, id }: DeleteProps) => {
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(`/api/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 201) {
        toast.success(res.data.message);
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[343px] sm:w-[400px] sm:h-[248px]">
        <DialogHeader className="text-center">
          <DialogTitle className="text-center">
            <p>Please confirm if you wish</p>
            <p>to delete the post</p>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center text-center">
          <p className="text-[#475467]">
            Are you sure you want to delete the post? Once deleted, it cannot be
            recovered.
          </p>
        </div>
        <DialogFooter className="flex justify-center gap-4">
          <Button
            type="submit"
            className="sm:w-[170] bg-red-500 text-white hover:bg-red-700"
            onClick={() => {
              handleDelete(id);
              onOpenChange(false);
            }}
          >
            Delete
          </Button>
          <Button
            variant={"outline"}
            type="submit"
            className="sm:w-[170] border-[#DADADA] text-[#5B5B5B] hover:bg-gray-300"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
