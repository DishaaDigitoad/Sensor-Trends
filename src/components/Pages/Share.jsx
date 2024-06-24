import React from 'react'

const Share = () => {
  const handleExport = () => {
    // Logic to export data
    fetch('/api/export-data')
      .then(response => response.json())
      .then(data => {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sensor-data.json';
        a.click();
      });
  };

  return (
    <div>
      <h1>Export Data</h1>
      <button onClick={handleExport}>Export Data as JSON</button>
    </div>
  );
};


export default Share
