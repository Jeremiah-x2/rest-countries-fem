import useAuth from "@/lib/hooks/useAuth";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { supabase } from "@/config/supabase";

export default function Header() {
  const [theme, setTheme] = useState<string>("light");
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "light");
    }
  }, []);

  useEffect(() => {
    // select html elem
    const html = document.querySelector("html");
    //add or remove class dark in html elem according to theme in localstorage.
    if (localStorage.getItem("theme") === "dark") {
      html!.classList.add("dark");
      setTheme("dark");
    } else {
      html!.classList.remove("dark");
      setTheme("light");
    }
  }, [theme]);

  // handle switch theme
  const handleThemeSwitch = () => {
    if (localStorage.getItem("theme") === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };
  return (
    <div>
      <div className="dark:bg-darkBlue flex justify-center">
        {isAuth ? (
          <Button
            onClick={async () => {
              try {
                const signout = await supabase.auth.signOut();
                if (signout) {
                  navigate(0);
                }
                location.reload();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Log out
          </Button>
        ) : (
          <div className="flex justify-center items-center gap-4">
            <Link to={"/sign-in"} className="">
              <Button
                variant={"outline"}
                className="bg-transparent font-semibold hover:scale-95 border-moderateBlue"
              >
                Sign In
              </Button>
            </Link>
            <Link to={"/sign-up"}>
              <Button className="bg-softRed text-white font-bold hover:bg-opacity-90 hover:scale-95 hover:bg-softRed">
                Create account
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="px-4 py-6 cursor-pointer dark:bg-darkBlue bg-white shadow-[0px_0px_12px_rgba(0,0,0,0.5)] flex items-center justify-between text-sm">
        <Link
          to={"/"}
          className="font-bold dark:text-white text-lg text-lightModeText"
        >
          Where in the World?
        </Link>
        <div
          className="flex items-center gap-2 font-bold"
          onClick={handleThemeSwitch}
        >
          {theme === "light" ? (
            <>
              <Moon size={18} />
              Dark Mode
            </>
          ) : (
            <>
              <Sun size={18} /> Light Mode
            </>
          )}
        </div>
      </div>
    </div>
  );
}
