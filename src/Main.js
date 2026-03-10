import { Route, Routes } from 'react-router-dom';
import Register from './views/Auth/Register.jsx';
import Login from './views/Auth/Login.jsx';
import ContractorDashboard from './views/Contractor/ContractorDashboard.jsx';
import Logout from './views/Auth/Logout.jsx';
import GovernmentDashboard from './views/Government/GovernmentDashboard.jsx';
import ProtectedRoute from './Components/Shared/ProtectedRoute.jsx';

function Main({ role, setRole }) {
  return (
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login setRole={setRole} />} />
      <Route path='/logout' element={<Logout setRole={setRole} />} />

      <Route element={<ProtectedRoute allowedRoles={['government']} />}>
        <Route path="/government" element={<GovernmentDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['contractor']} />}>
        <Route path="/contractor" element={<ContractorDashboard />} />
      </Route>

      <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />
    </Routes>
  );
}

export default Main; 