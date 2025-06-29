import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import ResourceDetail from "./pages/ResourceDetail";
import Contribute from "./pages/Contribute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/resource/:id" element={<ResourceDetail />} />
              <Route path="/contribute" element={<Contribute />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Footer */}
            <footer className="bg-white border-t mt-16">
              <div className="container mx-auto px-4 py-8">
                <div className="text-center text-gray-600">
                  <p className="mb-2">
                    Built with ❤️ by students, for students
                  </p>
                  <p className="text-sm">
                    Open source project • Contribute on{" "}
                    <a
                      href="https://github.com/your-username/resource-hub"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      GitHub
                    </a>
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
