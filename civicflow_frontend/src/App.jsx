import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login'; // ensure import matches actual filename casing (login.jsx)
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReportIssue from './pages/ReportIssue';
import IssueDetail from "./pages/IssueDetail";
import PrivateRoutes from './utils/PrivateRoutes';
import LandingPage from './pages/Landing';
import CitizenDashboard from './pages/citizen/CitizenDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoutes />}>
          {/* --- CITIZEN ROUTES --- */}
          <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
          <Route path="/citizen/report" element={<ReportIssue />} /> {/* Ye update kiya */}
          <Route path="/citizen/issue/:id" element={<IssueDetail />} /> {/* Ye update kiya */}
          
          {/* --- ADMIN ROUTES --- */}
          <Route path="/dashboard" element={<Dashboard />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;