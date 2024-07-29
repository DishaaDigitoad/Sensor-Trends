import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Pages/Home";
import SensorOverview from "./components/Pages/SensorOverview";
import DataTrends from "./components/Pages/Graphs/DataTrends";
// import Share from "./components/Pages/Share";
import { registerLicense } from "@syncfusion/ej2-base";
import "./App.css";

import Error from "./components/Pages/Error.jsx";
import RouteLayout from "./RouteLayout.jsx";
import SignupPage from "./authentication/SignupPage.jsx";
import LoginPage from "./authentication/LoginPage.jsx";
import SampleLoader from "./components/Pages/SampleLoader.jsx";
import PrivateRoute from "./authentication/PrivateRoute.js";
import { AuthProvider } from "./authentication/AuthContext.js";
registerLicense(process.env.REACT_APP_SYNC_LICENSE_KEY);
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <AuthProvider>
      <div className="app-component">
        {isLoading ? (
          <SampleLoader />
        ) : (
          <Routes>
            <Route path="/" element={<RouteLayout />}>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />

              {/* <Route element={<PrivateRoute />}> */}
              <Route path="/navigate" element={<Navigate />} />
              <Route path="/sensor-overview" element={<SensorOverview />} />
              <Route path="/data-trends" element={<DataTrends />} />
              <Route path="/share" element={<Share />} />
              {/* </Route> */}
              <Route path="*" element={<Error />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        )}
      </div>
    </AuthProvider>
  );
};

export default App;
