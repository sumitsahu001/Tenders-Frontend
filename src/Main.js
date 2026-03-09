import { Route, Routes } from 'react-router-dom';
import Register from './Components/pages/Register.js';
import Login from './Components/pages/Login.js';
import Usercomponent from './Components/pages/Usercomponent.js';
import Logout from './Components/pages/Logout.js';
import Admin from './Components/pages/Admin.js';
import ProtectedRoute from './Components/pages/ProtectedRoute.js';

function Main({ role, setRole }) {
  return (
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login setRole={setRole} />} />
      <Route path='/logout' element={<Logout setRole={setRole} />} />

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<Admin />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route path="/user" element={<Usercomponent />} />
      </Route>
      
      <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />
    </Routes>
  );
}

export default Main; 