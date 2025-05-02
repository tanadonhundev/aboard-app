import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";

type AddCommentFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AddCommentForm = ({ open, onOpenChange }: AddCommentFormProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-left">Add Comments</DialogTitle>
        </DialogHeader>
        <div>
          <Textarea
            placeholder="What's on your mind..."
            className="w-full p-3 border rounded-md resize-none min-h-[120px]"
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-success text-white"
            onClick={() => onOpenChange(false)}
          >
            Post
          </Button>
          <Button
            variant={"outline"}
            type="submit"
            className="border-[#49A569] text-[#49A569] hover:bg-green-50"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCommentForm;
