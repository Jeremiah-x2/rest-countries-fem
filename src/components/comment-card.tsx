import useAuth from "@/lib/hooks/useAuth";
import { Pen, Redo2, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/config/supabase";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

export interface IComment {
  id: string;
  comment: string;
  user_id: string;
}
export default function CommentCard({
  comment,
  refetch,
}: {
  comment: IComment;
  refetch: () => void;
}) {
  const [editComment, setEditComment] = useState<string>("");
  const { user } = useAuth();
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["user", comment],
    queryFn: async () => {
      const userQuery = await supabase
        .from("users")
        .select("*")
        .eq("user_id", comment.user_id)
        .single();
      return userQuery;
    },
  });

  async function deleteComment(comId: string) {
    try {
      const { data } = await supabase.from("comments").delete().eq("id", comId);
      refetch();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function editCommentFn() {
    try {
      const { data } = await supabase
        .from("comments")
        .update({ comment: editComment })
        .eq("id", comment.id)
        .eq("user_id", comment.user_id);
      console.log(data);
      refetch();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="py-4 px-4 dark:bg-darkBlue shadow-md bg-white rounded-lg mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {userData && (
            <>
              <div className="w-10 h-10 rounded-full bg-darkBlue">
                <Avatar>
                  <AvatarImage src={userData?.data.avatar} />
                  <AvatarFallback>DP</AvatarFallback>
                </Avatar>
              </div>
              <h3>{userData.data.email}</h3>
            </>
          )}
          {userLoading && <Skeleton className="flex-1 h-full" />}
        </div>
        <p></p>
      </div>
      <div className=" my-3 px-2">{comment.comment}</div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* <LikeButton comment={comment} refetch={refetch} /> */}
        </div>

        {user && comment.user_id === user?.id ? (
          <div className="space-x-2">
            <Button
              className="text-xs text-softRed bg-lightModeText font-semibold"
              onClick={() => deleteComment(comment.id)}
            >
              <Trash size={12} className="stroke-softRed" width={12} /> Delete
            </Button>
            <Dialog>
              <DialogTrigger className="text-xs rounded-lg bg-white text-veryDarkBlue">
                <Button className="">
                  <Pen size={12} className="stroke-moderateBlue" /> Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-lg">Edit Comment</DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
                  <Textarea
                    onChange={(e) => setEditComment(e.target.value)}
                  ></Textarea>
                  <Button
                    className="bg-moderateBlue font-semibold text-white"
                    onClick={editCommentFn}
                  >
                    Edit
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <Button className="text-xs">
            <Redo2 size={12} /> Reply
          </Button>
        )}
      </div>
    </div>
  );
}
