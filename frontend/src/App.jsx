import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SiteNavbar from "./components/Navbar";
import Home from "./pages/Home";
import VehicleDetails from "./pages/VehicleDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLayout from "./components/AdminLayout";
import AdminVehicles from "./pages/AdminVehicles";
import AdminFinance from "./pages/AdminFinance";
import SoldVehicles from "./pages/SoldVehicles";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./store/authContext.jsx";

function ProtectedAdminRoute({ children }) {
  const { isAdmin, loading } = useAuth();
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div style={{ textAlign: "center", color: "var(--text-2)" }}>Loading...</div>
      </div>
    );
  }
  if (!isAdmin) return <Navigate to="/login" replace />;
  return children;
}

function AppContent() {
  return (
    <>
      <SiteNavbar />
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<Navigate to="vehicles" replace />} />
            <Route path="vehicles" element={<AdminVehicles />} />
            <Route path="finance" element={<AdminFinance />} />
            <Route path="sold" element={<SoldVehicles />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
