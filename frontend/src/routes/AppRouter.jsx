import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Vehicles from "../pages/Vehicles/Vehicles";
import Drivers from "../pages/Drivers/Drivers";
import Maintenance from "../pages/Maintenance/Maintenance";
import Safety from "../pages/Safety/Safety";
import Reports from "../pages/Reports/Reports";
import ReportViewer from "../pages/Reports/ReportViewer";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainLayout />}>

          <Route index element={<Dashboard />} />

          <Route
                path="vehicles"
                element={
                    <ProtectedRoute>
                        <Vehicles />
                    </ProtectedRoute>
                }
            />

          <Route
                path="drivers"
                element={
                    <ProtectedRoute>
                        <Drivers />
                    </ProtectedRoute>
                }
            />

          <Route
                path="maintenance"
                element={
                    <ProtectedRoute>
                        <Maintenance />
                    </ProtectedRoute>
                }
            />

          <Route
                path="safety"
                element={
                    <ProtectedRoute>
                        <Safety />
                    </ProtectedRoute>
                }
            />

          <Route
              path="reports"
              element={
                  <ProtectedRoute>
                      <Reports />
                  </ProtectedRoute>
              }
          />

          <Route
                path="reports/:report"
                element={
                    <ProtectedRoute>
                        <ReportViewer />
                    </ProtectedRoute>
                }
            />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;