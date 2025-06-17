import { useEffect, useState } from "react";
import DataGraph from "../components/Graph";
import Cookies from "js-cookie";

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString();
}

function DashboardTable() {
  const [data, setData] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const token = Cookies.get("token") || "default-token";

  const [visibleParameters, setVisibleParameters] = useState({
    temperature: true,
    ph: true,
    tds: true,
    orp: true,
  });

  const allParameters = [
    { key: "temperature", name: "Temperature" },
    { key: "ph", name: "pH" },
    { key: "tds", name: "TDS" },
    { key: "orp", name: "ORP" },
  ];

  const fetchData = async () => {
    try {
      const endpoint =
        startTime && endTime
          ? `https://api.mizuguna.in/api/betweenData?start=${startTime}&end=${endTime}`
          : "https://api.mizuguna.in/api/dashboard";

      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // useEffect(() => {
  //   fetchData();
  //   const interval = setInterval(fetchData, 5000);
  //   return () => clearInterval(interval);
  // }, [token]);

  useEffect(() => {
    // Only fetch once on initial load
    fetchData();
  }, []);


  const handleCheckboxChange = (paramKey) => {
    setVisibleParameters((prev) => ({
      ...prev,
      [paramKey]: !prev[paramKey],
    }));
  };

  const filteredGraphData = data.map((row) => {
    const newRow = { dateTime: row.dateTime };
    for (const param of allParameters) {
      if (visibleParameters[param.key]) {
        newRow[param.key] = row[param.key];
      }
    }
    return newRow;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8a2be2] via-[#a855f7] to-[#d8b4fe] py-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16 max-w-6xl mx-auto my-8">
        {/* <h2 className="mb-16 text-center text-5xl font-extrabold text-gray-800 tracking-tight leading-tight">
          IoT infrastructure for inland fresh water fish farming
        </h2> */}

        <h3 className="mb-8 text-center text-4xl font-bold text-gray-700">
          Sensor Data Dashboard
        </h3>

        {/* Time Range Filter */}
        {/* Time Range Filter with Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8 bg-gray-50 p-4 rounded-lg shadow-sm">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Start Time:</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">End Time:</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <button
              onClick={fetchData}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-semibold shadow"
            >
              Fetch
            </button>

            <button
              onClick={() => {
                setStartTime("");
                setEndTime("");
                setData([]); // optional: clears stale filtered data
                fetchData(); // will default to /api/dashboard
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded font-semibold shadow"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Parameter Checkbox Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-6 p-4 bg-gray-50 rounded-lg shadow-sm">
          <span className="text-gray-700 font-semibold text-lg mr-4">Show/Hide Parameters:</span>
          {allParameters.map((param) => (
            <div key={param.key} className="flex items-center">
              <input
                type="checkbox"
                id={param.key}
                checked={visibleParameters[param.key]}
                onChange={() => handleCheckboxChange(param.key)}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor={param.key} className="ml-2 text-lg text-gray-800 font-medium cursor-pointer">
                {param.name}
              </label>
            </div>
          ))}
        </div>

        {/* Data Table */}
        <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg shadow-md mb-8">
          <table className="w-full border-collapse min-w-full">
            <thead className="sticky top-0 bg-gray-100 z-10 shadow-sm">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  DateTime
                </th>
                {allParameters.map((param) =>
                  visibleParameters[param.key] ? (
                    <th
                      key={param.key}
                      className="py-3 px-4 text-left font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200"
                    >
                      {param.name}
                    </th>
                  ) : null
                )}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={1 + Object.values(visibleParameters).filter(Boolean).length} className="text-center py-4 text-gray-500">
                    Loading data...
                  </td>
                </tr>
              ) : (
                data.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition duration-150 ease-in-out`}
                  >
                    <td className="py-3 px-4 border-b border-gray-100 whitespace-nowrap">
                      {formatDate(row.dateTime)}
                    </td>
                    {allParameters.map((param) =>
                      visibleParameters[param.key] ? (
                        <td key={param.key} className="py-3 px-4 border-b border-gray-100">
                          {row[param.key]}
                        </td>
                      ) : null
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pass filtered data to DataGraph */}
        <div className="mt-8 mb-12">
          <DataGraph data={filteredGraphData} visibleParameters={visibleParameters} />
        </div>
      </div>
    </div>
  );
}

export default DashboardTable;