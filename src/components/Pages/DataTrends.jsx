import React, { useEffect, useState } from "react";
import { database } from "../../firebase-config.js";
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
import { RangeNavigatorComponent } from "@syncfusion/ej2-react-charts";
import "./DataTrends.css";

// Register the necessary components
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
  const [labels, setLabels] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    const temperatureRef = ref(database, "sensor_data");
    onValue(temperatureRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sortedKeys = Object.keys(data).sort();
        const labels = sortedKeys.map((key) =>
          new Date(data[key].timestamp).toLocaleTimeString()
        );
        const temperatures = sortedKeys.map((key) => data[key].temperature);
        const humidities = sortedKeys.map((key) => data[key].humidity);

        setLabels(labels);
        setTemperatureData(temperatures);
        setHumidityData(humidities);
      }
    });
  }, []);

  const handleRangeChanged = (args) => {
    setStartTime(args.start);
    setEndTime(args.end);

    // Filter the data based on the selected time range
    const filteredLabels = labels.filter((label, index) => {
      const timestamp = new Date(labels[index]);
      return timestamp >= args.start && timestamp <= args.end;
    });
    const filteredTemperatureData = temperatureData.filter((_, index) => {
      const timestamp = new Date(labels[index]);
      return timestamp >= args.start && timestamp <= args.end;
    });
    const filteredHumidityData = humidityData.filter((_, index) => {
      const timestamp = new Date(labels[index]);
      return timestamp >= args.start && timestamp <= args.end;
    });

    setLabels(filteredLabels);
    setTemperatureData(filteredTemperatureData);
    setHumidityData(filteredHumidityData);
  };

  const lineData = {
    labels: labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatureData,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        lineTension: 0.5,
      },
      {
        label: "Humidity (%)",
        data: humidityData,
        fill: false,
        borderColor: "rgba(153,102,255,1)",
        lineTension: 0.5,
      },
    ],
  };

  return (
    <div className="details">
      <div className="overview-container">
        <h2>Temperature and Humidity Trends</h2>
        <RangeNavigatorComponent
          dataSource={labels}
          xName="timestamp"
          yName="temperature"
          valueType="DateTime"
          enableDeferredUpdate={true}
          onRangeChanged={handleRangeChanged}
        />
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default DataTrends;
