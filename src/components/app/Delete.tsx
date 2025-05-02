import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DeleteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const Delete = ({ open, onOpenChange }: DeleteProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[343px] sm:w-[400px] sm:h-[248px] flex flex-col items-center justify-center">
        <DialogHeader className="w-full text-center">
          <DialogTitle className="text-center">
            <p>Please confirm if you wish</p>
            <p>to delete the post</p>
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center text-center px-4">
          <p className="text-[#475467]">
            Are you sure you want to delete the post? Once deleted, it cannot be
            recovered.
          </p>
        </div>
        <DialogFooter className="w-full flex justify-center gap-4">
          <Button
            type="submit"
            className="sm:w-[170] bg-red-500 text-white hover:bg-red-700"
            onClick={() => onOpenChange(false)}
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
