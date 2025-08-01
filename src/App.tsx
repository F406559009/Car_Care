import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import EmployeeTasks from "./pages/EmployeeTasks";
import DataManagement from "./pages/DataManagement";
import WalkInService from "./pages/WalkInService";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee-tasks" element={<EmployeeTasks />} />
          <Route path="/data-management" element={<DataManagement />} />
          <Route path="/walk-in-service" element={<WalkInService />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
