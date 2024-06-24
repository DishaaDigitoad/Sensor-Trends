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
// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../firebase-config.js";
// import "./SensorOverview.css";

// const SensorOverview = () => {
//   const [sensorData, setSensorData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const sensorCollection = collection(db, "sensors");
//       const sensorSnapshot = await getDocs(sensorCollection);
//       const sensorList = sensorSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setSensorData(sensorList);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="sensor-overview">
//       {sensorData.map((sensor) => (
//         <div key={sensor.id} className="sensor-overview-container">
//           <h3>{sensor.name}</h3>
//           <p>Value: {sensor.value}</p>
//           <p>Status: {sensor.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SensorOverview;

// .sensor-overview {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   padding: 20px;
//   justify-content: center;
// }

// .sensor-overview-container {
//   box-shadow: 10px 10px 20px #babecc, -10px -10px 20px #ffffff;
//   padding: 20px;
//   border-radius: 10px;
//   background-color: #f0f0f3;
//   font-family: Arial, sans-serif;
//   color: #333;
//   width: calc(33.33% - 20px);
//   text-align: center;
// }
