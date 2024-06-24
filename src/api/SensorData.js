// import React, { useEffect, useState } from 'react';

// const SensorData = () => {
//   const [sensorData, setSensorData] = useState([]);

//   useEffect(() => {
//     const dummySensorData = [
//       { id: 1, type: 'Temperature', value: 25 },
//       { id: 2, type: 'Humidity', value: 60 },
//       { id: 3, type: 'Pressure', value: 1013 },
//       // Add more sensor data objects as needed
//     ];
//     setSensorData(dummySensorData);
//   }, []);

//   return (
//     <div>
//       <h1>Sensor Data</h1>
//       <ul>
//         {sensorData.map(sensor => (
//           <li key={sensor.id}>{sensor.type}: {sensor.value}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SensorData;
