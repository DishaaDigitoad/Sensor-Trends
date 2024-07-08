import React, { useEffect, useState } from "react";
import { database } from "../../../firebase-config.js";
import { ref, onValue } from "firebase/database";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./DataTrends.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const DataTrends = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
      },
      {
        label: "Humidity",
        data: [],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: false,
      },
    ],
  });

  useEffect(() => {
    const sensorDataRef = ref(database, "sensor_data");

    onValue(sensorDataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Fetched data:", data);
      if (data) {
        const labels = [];
        const temperatureData = [];
        const humidityData = [];

        const currentTime = Date.now();
        const tenSecondsAgo = currentTime - 10000;
        console.log("Current time:", currentTime);
        console.log("Ten seconds ago:", tenSecondsAgo);

        Object.keys(data).forEach((key) => {
          const entry = data[key];
          console.log("Data entry:", entry);

          const timestamp = entry.timestamp * 1000;
          console.log("Converted timestamp:", timestamp);

          if (timestamp >= tenSecondsAgo) {
            const date = new Date(timestamp);
            const formattedTime = date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            });

            labels.push(formattedTime);
            temperatureData.push(entry.temperature);
            humidityData.push(entry.humidity);
          }
        });

        console.log("Filtered labels:", labels);
        console.log("Filtered temperature data:", temperatureData);
        console.log("Filtered humidity data:", humidityData);

        setChartData({
          labels,
          datasets: [
            {
              label: "Temperature",
              data: temperatureData,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: false,
            },
            {
              label: "Humidity",
              data: humidityData,
              borderColor: "rgba(153, 102, 255, 1)",
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              fill: false,
            },
          ],
        });
      }
    });
  }, []);

  return (
    <div className="details">
      <div className="overview-container">
        <h2>Temperature and Humidity Trends</h2>
        <div className="chart-container">
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default DataTrends;
