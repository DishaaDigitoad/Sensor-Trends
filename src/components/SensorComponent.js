// import React, { useEffect, useState } from 'react';
// import { fetchSensorData } from './api/SensorData';
// import { Line } from 'react-chartjs-2';

// const SensorComponent = () => {
//   const [sensorData, setSensorData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchSensorData();
//         setSensorData(data);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Prepare data for the line chart
//   const chartData = {
//     labels: sensorData.map(sensor => sensor.type),
//     datasets: [
//       {
//         label: 'Sensor Values',
//         data: sensorData.map(sensor => sensor.value),
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1,
//       },
//     ],
//   };

//   return (
//     <div>
//       <h1>Sensor Data</h1>
//       <ul>
//         {sensorData.map(sensor => (
//           <li key={sensor.id}>
//             {sensor.type}: {sensor.value}
//           </li>
//         ))}
//       </ul>
//       <div style={{ marginTop: '20px' }}>
//         <Line data={chartData} />
//       </div>
//     </div>
//   );
// };

// export default SensorComponent;

