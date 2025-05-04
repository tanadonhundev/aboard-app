import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

type AddCommentFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  refreshData: () => void;
};

const commentSchema = z.object({
  content: z.string().min(1, { message: "Content ห้ามเว้นว่าง" }).trim(),
});

type formValues = z.infer<typeof commentSchema>;

const AddCommentForm = ({
  open,
  onOpenChange,
  id,
  refreshData,
}: AddCommentFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: formValues) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return router.replace("sign-in");
      }

      const formData = {
        comment: data.content,
        postId: id,
      };

      const res = await axios.post("/api/comment", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 201) {
        toast.success(res.data.message);
        reset();
        refreshData();
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-left">Add Comments</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Textarea
              placeholder="What's on your mind..."
              className="w-full p-3 border rounded-md resize-none min-h-[120px]"
              {...register("content")}
            />
            {errors.content && (
              <p className="text-red-500 px-2">{errors.content.message}</p>
            )}
          </div>
          <DialogFooter className="mt-2">
            <Button
              type="submit"
              className="bg-success text-white"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "กำลังPost" : "Post"}
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
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCommentForm;
