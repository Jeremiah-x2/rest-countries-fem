"use client";
import { supabase } from "@/config/supabase";
import useAuth from "@/lib/hooks/useAuth";
import { ThumbsUp } from "lucide-react";
import { IComment } from "./comment-card";
import { useQuery } from "@tanstack/react-query";

export default function LikeButton({
  comment,
  refetch,
}: {
  comment: IComment;
  refetch: () => void;
}) {
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["like"],
    queryFn: async () => {
      const { data } = await supabase
        .from("comments")
        .select("liked_by")
        .eq("id", comment.id)
        .single();
      return data;
    },
  });
  console.log(data?.liked_by.length);
  async function likeComment() {
    try {
      // Fetch the current `liked_by` array for the comment
      const { data, error } = await supabase
        .from("comments")
        .select("liked_by")
        .eq("id", comment.id)
        .single();

      if (error) {
        console.error("Error fetching comment:", error.message);
        return;
      }

      const currentLikes = data?.liked_by || [];
      let updatedLikes;

      // Check if the user ID is already in the array
      if (currentLikes.includes(user?.id)) {
        // Remove the user ID if it exists
        updatedLikes = currentLikes.filter((id: string) => id !== user?.id);
      } else {
        // Add the user ID if it doesn't exist
        updatedLikes = [...currentLikes, user?.id];
      }

      // Update the `liked_by` column in the database
      const { error: updateError } = await supabase
        .from("comments")
        .update({ liked_by: updatedLikes })
        .eq("id", comment.id);

      if (updateError) {
        console.error("Error updating likes:", updateError.message);
        return;
      }

      console.log("Successfully toggled like:", updatedLikes);
      refetch();
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  }
  return (
    <span className="flex text-sm items-center" onClick={likeComment}>
      <ThumbsUp /> {data?.liked_by && <>{data.liked_by.length}</>}
    </span>
  );
}
