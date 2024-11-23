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
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function signIn(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (data.user) {
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
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occured",
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <main className="w-full min-h-[90dvh] flex items-center justify-center ">
      <div className="w-[400px] bg-white py-8 px-4 rounded-lg shadow-lg dark:bg-darkBlue">
        <h5 className="text-center text-2xl font-bold mb-4">Sign In</h5>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(signIn)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Email" className="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-semibold disabled:bg-opacity-80 disabled:text-opacity-80"
            >
              {!isSubmitting ? (
                "Sign In"
              ) : (
                <>
                  Submitting... <Oval />
                </>
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4">
          Don&apos;t have an account?{" "}
          <Link
            to={"/sign-up"}
            className="font-semibold text-sm underline text-blue-600 dark:text-softRed"
          >
            Create account
          </Link>
        </div>
      </div>
    </main>
  );
}
