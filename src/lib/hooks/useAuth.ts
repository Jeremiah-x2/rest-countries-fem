import { supabase } from "@/config/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    async function checkUser() {
      const { data: user } = await supabase.auth.getSession();
      if (user.session?.user) {
        setIsAuth(true);
        setUser(user.session.user);
      }
    }
    checkUser();
  }, []);
  return { isAuth, user };
}
