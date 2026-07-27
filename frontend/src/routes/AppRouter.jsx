import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Vehicles from "../pages/Vehicles/Vehicles";
import Drivers from "../pages/Drivers/Drivers";
import Maintenance from "../pages/Maintenance/Maintenance";
import Safety from "../pages/Safety/Safety";
import Reports from "../pages/Reports/Reports";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainLayout />}>

          <Route index element={<Dashboard />} />

          <Route
            path="vehicles"
            element={<Vehicles />}
          />

          <Route
            path="drivers"
            element={<Drivers />}
          />

          <Route
            path="maintenance"
            element={<Maintenance />}
          />

          <Route
            path="safety"
            element={<Safety />}
          />

          <Route
            path="reports"
            element={<Reports />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;