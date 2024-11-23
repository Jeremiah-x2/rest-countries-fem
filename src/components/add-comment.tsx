import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import useAuth from "@/lib/hooks/useAuth";
import { Link } from "react-router-dom";
import { supabase } from "@/config/supabase";
import { useState } from "react";

export default function AddComment({
  countryName,
  refetch,
}: {
  countryName: string;
  refetch: () => void;
}) {
  const { isAuth, user } = useAuth();
  const [commentValue, setCommentValue] = useState<string>("");

  async function addComment() {
    try {
      const { data, error } = await supabase.from("comments").insert({
        user_id: user?.id,
        country_name: countryName,
        comment: commentValue,
      });
      console.log(data, error);
      refetch();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {isAuth ? (
        <div className="text-black p-3 dark:bg-darkBlue shadow-lg rounded-lg bg-white mt-8 lg:mt-0 space-y-4">
          <Textarea
            className="lg:min-h-28 shadow-lg dark:text-white"
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <div className="w-[50px] h-[50px] rounded-full bg-darkBlue"></div>
            <Button
              className="bg-moderateBlue dark:text-white font-semibold"
              onClick={() => addComment()}
            >
              Send
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-black p-3 rounded-lg bg-white mt-8 space-y-4">
          Login to add comments{" "}
          <Link
            to={"/sign-in"}
            className="px-4 py-1 bg-darkBlue text-white rounded-md"
          >
            Sign In
          </Link>
        </div>
      )}
    </>
  );
}
