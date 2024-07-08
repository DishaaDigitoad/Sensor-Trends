import React, { useEffect, useState } from "react";
import { database } from "../../firebase-config.js";
import { ref, onValue } from "firebase/database";
import "./SensorOverview.css";

const SensorOverview = () => {
  const [temperatureData, setTemperatureData] = useState(null);

  useEffect(() => {
    const temperatureRef = ref(database, "sensor_data");
    onValue(temperatureRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const latestDataKey = Object.keys(data).sort().reverse()[0];
        const latestData = data[latestDataKey];
        setTemperatureData(latestData);
      }
    });
  }, []);

  return (
    <div className="sensor-details">
      <div className="sensor-overview-container">
        <h1>Real-Time Temperature Sensor Data</h1>
        {temperatureData ? (
          <div className="sensor-data-entry">
            <p>Temperature: {temperatureData.temperature}°C</p>
            <p>Humidity: {temperatureData.humidity}%</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SensorOverview;
