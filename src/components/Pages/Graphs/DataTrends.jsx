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
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-date-fns"; // For date/time handling
import "./DataTrends.css";

// Register Chart.js components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
  TimeScale,
  zoomPlugin
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
      if (data) {
        const labels = [];
        const temperatureData = [];
        const humidityData = [];

        const currentTime = Date.now();
        const tenSecondsAgo = currentTime - 10000;

        Object.keys(data).forEach((key) => {
          const entry = data[key];
          const timestamp = entry.timestamp * 1000;

          if (timestamp >= tenSecondsAgo) {
            labels.push(timestamp);
            temperatureData.push(entry.temperature);
            humidityData.push(entry.humidity);
          }
        });

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Temperature and Humidity Trends",
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "second",
          tooltipFormat: "PPpp",
          displayFormats: {
            second: "HH:mm:ss",
          },
        },
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div className="details">
      <div className="overview-container">
        <h2>Temperature and Humidity Trends</h2>
        <div className="chart-container">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DataTrends;
