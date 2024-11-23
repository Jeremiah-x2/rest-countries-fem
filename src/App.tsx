import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/header";
import CountryDetailPage from "./pages/details";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import { Toaster } from "./components/ui/toaster";
function App() {
  const client = new QueryClient();
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <Header />
          <div className="px-8 py-8 lg:px-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/country/:countryName"
                element={<CountryDetailPage />}
              />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
            <Toaster />
          </div>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
