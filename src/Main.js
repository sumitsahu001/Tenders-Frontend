import { Route, Routes } from 'react-router-dom';
import Register from './views/Auth/Register.jsx';
import Login from './views/Auth/Login.jsx';
import ContractorDashboard from './views/Contractor/ContractorDashboard.jsx';
import ContractorBrowseTenders from './views/Contractor/ContractorBrowseTenders.jsx';
import ContractorMyApplications from './views/Contractor/ContractorMyApplications.jsx';
import Logout from './views/Auth/Logout.jsx';
import GovernmentDashboard from './views/Government/GovernmentDashboard.jsx';
import GovernmentCreateTender from './views/Government/GovernmentCreateTender.jsx';
import GovernmentManageTenders from './views/Government/GovernmentManageTenders.jsx';
import GovernmentContractors from './views/Government/GovernmentContractors.jsx';
import GovernmentAnalytics from './views/Government/GovernmentAnalytics.jsx';
import ProtectedRoute from './Components/Shared/ProtectedRoute.jsx';

function Main({ role, setRole }) {
  return (
    <Routes>
      <Route path='/register' element={<Register setRole={setRole} />} />
      <Route path='/login' element={<Login setRole={setRole} />} />
      <Route path='/logout' element={<Logout setRole={setRole} />} />

      <Route element={<ProtectedRoute allowedRoles={['government']} />}>
        <Route path="/government" element={<GovernmentDashboard />} />
        <Route path="/government/create-tender" element={<GovernmentCreateTender />} />
        <Route path="/government/tenders" element={<GovernmentManageTenders />} />
        <Route path="/government/contractors" element={<GovernmentContractors />} />
        <Route path="/government/analytics" element={<GovernmentAnalytics />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['contractor']} />}>
        <Route path="/contractor" element={<ContractorDashboard />} />
        <Route path="/contractor/tenders" element={<ContractorBrowseTenders />} />
        <Route path="/contractor/applications" element={<ContractorMyApplications />} />
      </Route>

      <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />
    </Routes>
  );
}

export default Main; 