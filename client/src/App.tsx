  import { useEffect, useState } from "react";
  import { Switch, Route } from "wouter";
  import { Toaster } from "@/components/ui/toaster";
  import NotFound from "@/pages/not-found";
  import Home from "@/pages/Home";
  import AdminMessagesPage from "@/pages/admin/messages";
  import AdminLogin from "@/pages/admin/login"; // ✅ Import login page
  import { ThemeProvider } from "./lib/themeUtils";
  import NewsletterAdminPage from "@/pages/admin/newsletter";
  import AdminBookingsPage from "@/pages/admin/bookings";

  function Router() {
    return ( // ✅ Added return statement
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin/messages" component={AdminMessagesPage} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/newsletter" component={NewsletterAdminPage} /> {/* ✅ Move up */}
        <Route path="/admin/bookings" component={AdminBookingsPage} />
        <Route component={NotFound} /> {/* Always keep this at the bottom */}
      </Switch>
    );
  }

  function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return (
        <div className="h-screen w-full flex items-center justify-center bg-background">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      );
    }

    return (
      <ThemeProvider>
        <Router />
        <Toaster />
      </ThemeProvider>
    );
  }

  export default App;