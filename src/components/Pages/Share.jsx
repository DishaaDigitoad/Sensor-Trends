import React, { useState, useEffect } from "react";
import { database, ref, onValue } from "../../firebase-config";
import { json2csv } from "json2csv";
import { saveAs } from "file-saver";

const Share = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(database, "/");
        onValue(dbRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setData(data);
          } else {
            console.log("No data available");
          }
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExport = () => {
    try {
      const csv = json2csv(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "data.csv");
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Data from Firebase</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={handleExport}>Export Data</button>
    </div>
  );
};

export default Share;
