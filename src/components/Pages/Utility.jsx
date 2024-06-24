// export const generateDummySensorData = (hours = 24) => {
//   const data = [];
//   const now = new Date();

//   for (let i = 0; i < hours * 60; i++) {
//     const timestamp = new Date(now.getTime() - i * 60000); // 60000 ms in a minute
//     data.push(
//       { id: i + 1, type: 'Temperature', value: (20 + Math.random() * 10).toFixed(2), timestamp },
//       { id: i + 1, type: 'Humidity', value: (50 + Math.random() * 20).toFixed(2), timestamp },
//       { id: i + 1, type: 'Pressure', value: (1000 + Math.random() * 30).toFixed(2), timestamp }
//     );
//   }

//   return data.reverse();
// };
