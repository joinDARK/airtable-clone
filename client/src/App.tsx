import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { queryClient } from "./modules/api/queryClient";
import { Sidebar } from "./shared/components/Sidebar";
import AuthPage from "./shared/pages/AuthPage";
import OrdersPage from "./shared/pages/OrdersPage";
import ManagersPage from "./shared/pages/ManagersPage";
import ContragentsPage from "./shared/pages/ContragentsPage";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";
import Loader from "./shared/components/Loader";
import useLoaderStore from "./shared/store/useLoaderStore";
import AgentsPage from "./shared/pages/AgentsPage";
import ClientsPage from "./shared/pages/ClientsPage";
import CountriesPage from "./shared/pages/CountriesPage";
import SubagentsPage from "./shared/pages/SubagentsPage";
import SubagentPayersPage from "./shared/pages/SubagentPayersPage";
import { ApolloProvider } from "@apollo/client";
import { client } from "./modules/graphql";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = (state: boolean) => {
    setIsLogin(state);
  };

  const isLoading = useLoaderStore(store => store.isLoading)

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="flex h-screen">
            {isLogin && <Sidebar exitApp={handleLogin} />}
            
            <main className="flex-1 transition-all duration-300 p-8 relative">
              <div className="lg:max-w-5xl 2xl:max-w-6xl mx-auto overflow-auto h-full rounded-lg">
                <Routes>
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route path="/login" element={<AuthPage onLogin={handleLogin} />} />
                  
                  <Route element={<ProtectedRoute isAuthenticated={isLogin} />}>
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/managers" element={<ManagersPage />} />
                    <Route path="/contagents" element={<ContragentsPage />} />
                    <Route path="/agents" element={<AgentsPage />} />
                    <Route path="/clients" element={<ClientsPage />} />
                    <Route path="/countries" element={<CountriesPage />} />
                    <Route path="/subagents" element={<SubagentsPage />} />
                    <Route
                      path="/subagent-payers"
                      element={<SubagentPayersPage />}
                    />
                  </Route>
                </Routes>
              </div>

              {isLoading && <Loader />}
            </main>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default App;
