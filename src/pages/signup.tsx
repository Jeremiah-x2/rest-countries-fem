import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/config/supabase";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Oval } from "react-loader-spinner";

const formSchema = z.object({
  email: z.string().email({ message: "Provide a valid email address" }),
  password: z
    .string({ message: "Password required" })
    .min(6, { message: "Password should contain at least 6 characters" }),
});

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function signUp(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    setIsSubmitting(true);
    try {
      const { data: signUpData, error: signUpErr } = await supabase.auth.signUp(
        { email, password }
      );
      console.log(signUpData, signUpErr);
      const { data, error } = await supabase.from("users").insert({
        user_id: signUpData.user?.id,
        email: signUpData.user?.email,
      });
      if (signUpData.user) {
        toast({
          title: "Success",
          description: "Sign in successful",
          duration: 2000,
        });
        navigate("/");
      }
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          duration: 2000,
        });
      }
      console.log(data, error);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <main className="w-full min-h-[90dvh] flex items-center justify-center">
      <div className="w-[400px] bg-white py-8 px-4 rounded-lg shadow-lg dark:bg-darkBlue">
        <h5 className="text-center text-2xl font-bold mb-4">Create Account</h5>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(signUp)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-lg dark:text-white text-darkBlue">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Email" className="" />
                  </FormControl>
                  <FormMessage className="text-softRed" />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-lg dark:text-white text-darkBlue font-bold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter password"
                      type="password"
                      className=""
                    />
                  </FormControl>
                  <FormMessage className="text-softRed" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-semibold disabled:bg-opacity-80 disabled:text-opacity-80"
            >
              {!isSubmitting ? (
                "Create Acount"
              ) : (
                <>
                  Submitting... <Oval />
                </>
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4">
          Already have an account?{" "}
          <Link
            to={"/sign-in"}
            className="font-semibold text-sm underline text-blue-600"
          >
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
