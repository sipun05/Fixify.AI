// import { useEffect, useState } from "react";
// import DataGraph from "./Graph";

// function formatDate(isoString) {
//   const date = new Date(isoString);
//   return date.toLocaleString(); // or toLocaleDateString(), toLocaleTimeString()
// }

// function DashboardTable() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       // const res = await fetch('http://192.168.234.207:5754/api/data');
//       const res = await fetch('http://localhost:5754/api/data', {
//         method: 'get',
//         headers: new Headers({
//           "ngrok-skip-browser-warning": 69420,
//         })
//       });
//       const data = await res.json();
//       setData(data); // assume you're storing it in state
//     };

//     fetchData(); // initial fetch
//     const interval = setInterval(fetchData, 5000); // poll every 5 seconds

//     return () => clearInterval(interval); // cleanup
//   }, []);

//   return (
//     <>
//       <table>
//         <thead>
//           <tr>
//             <th>sno</th>
//             <th>datetime</th>
//             <th>temperature</th>
//             <th>ph</th>
//             <th>tds</th>
//             <th>orp</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, idx) => (
//             <tr key={idx}>
//               <td>{row.sno}</td>
//               <td>{formatDate(row.dateTime)}</td>
//               <td>{row.temperature}</td>
//               <td>{row.ph}</td>
//               <td>{row.tds}</td>
//               <td>{row.orp}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <DataGraph data={data} />
//     </>
//   );
// }

// export default DashboardTable;
import { useEffect, useState } from "react";
import DataGraph from "./Graph";

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString();
}

function DashboardTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://10.9.65.129:5754/api/data", {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": 69420,
        }),
      });
      const data = await res.json();
      setData(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      paddingInline: "8rem"
    }
    }>
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ marginTop: "3rem", marginBottom: "5rem", textAlign: "center", fontSize: "4rem" }}>Sensor Data Dashboard</h2>

        <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #ccc", borderRadius: "8px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
            <thead style={{ position: "sticky", top: 0, backgroundColor: "#f2f2f2", zIndex: 1 }}>
              <tr>
                {["datetime", "temperature", "ph", "tds", "orp"].map((heading) => (
                  <th
                    key={heading}
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #ddd",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={cellStyle}>{formatDate(row.dateTime)}</td>
                  <td style={cellStyle}>{row.temperature}</td>
                  <td style={cellStyle}>{row.ph}</td>
                  <td style={cellStyle}>{row.tds}</td>
                  <td style={cellStyle}>{row.orp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "2rem", marginBottom: "3rem" }} >
          <DataGraph data={data} />
        </div>
      </div>
    </div >
  );
}

const cellStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

export default DashboardTable;
