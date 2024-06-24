import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Pages/Home";
import Navigate from "./components/Pages/Navigate";
import SensorOverview from "./components/Pages/SensorOverview";
import DataTrends from "./components/Pages/DataTrends";
import Share from "./components/Pages/Share";
import "./App.css";
import SensorData from "./api/SensorData.js";
import Error from "./components/Pages/Error.jsx";
import RouteLayout from "./RouteLayout.jsx";
import SignupPage from "./authentication/SignupPage.jsx";
import LoginPage from "./authentication/LoginPage.jsx";
import SampleLoader from "./components/Pages/SampleLoader.jsx";
import PrivateRoute from "./authentication/PrivateRoute.js";
import { AuthProvider } from "./authentication/AuthContext.js";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to demonstrate the loading state
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
              <Route path="/sensor-data" element={<SensorData />} />
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
