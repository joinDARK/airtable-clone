import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import {QueryClientProvider} from "react-query"
import {ToastContainer} from "react-toastify"
import {queryClient} from "./shared/lib/queryClient"
import {Sidebar} from "./shared/components/Sidebar"
import {OrdersPage} from "./shared/pages/OrdersPage"
import {ManagersPage} from "./shared/pages/ManagersPage"
import {ContractorsPage} from "./shared/pages/ContractorsPage"
import {AgentsPage} from "./shared/pages/agent/AgentsPage"
import {ClientsPage} from "./shared/pages/ClientsPage"
import {CountriesPage} from "./shared/pages/CountriesPage"
import {SubagentsPage} from "./shared/pages/SubagentsPage"
import {SubagentPayersPage} from "./shared/pages/SubagentPayersPage"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className='flex max-h-screen'>
          <Sidebar />
          <main className='flex-1 transition-all duration-300 p-8'>
            <div className='lg:max-w-5xl 2xl:max-w-6xl mx-auto overflow-auto max-h-full rounded-lg'>
              <Routes>
                <Route path='/' element={<Navigate to='/orders' replace />} />
                <Route path='/orders' element={<OrdersPage />} />
                <Route path='/managers' element={<ManagersPage />} />
                <Route path='/contractors' element={<ContractorsPage />} />
                <Route path='/agents' element={<AgentsPage />} />
                <Route path='/clients' element={<ClientsPage />} />
                <Route path='/countries' element={<CountriesPage />} />
                <Route path='/subagents' element={<SubagentsPage />} />
                <Route path='/subagent-payers' element={<SubagentPayersPage />} />
              </Routes>
            </div>
          </main>
          <ToastContainer
            position='top-right'
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
  )
}

export default App