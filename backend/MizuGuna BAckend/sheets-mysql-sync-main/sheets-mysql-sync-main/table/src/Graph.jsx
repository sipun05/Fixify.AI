import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

function DataGraph({ data }) {
    const formattedData = data.map((row) => ({
        ...row,
        datetime: new Date(row.dateTime).toLocaleString("en-IN", {
            dateStyle: "short",
            timeStyle: "short",
        }),
    }));

    const chartStyle = { width: "100%", height: 300, marginTop: "2rem" };

    return (
        <>
            {/* Temperature Chart */}
            <h3>Temperature vs Time</h3>
            <div style={chartStyle}>
                <ResponsiveContainer>
                    <LineChart data={formattedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="datetime" angle={-45} textAnchor="end" height={60} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* pH Chart */}
            <h3>pH vs Time</h3>
            <div style={chartStyle}>
                <ResponsiveContainer>
                    <LineChart data={formattedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="datetime" angle={-45} textAnchor="end" height={60} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="ph" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* TDS Chart */}
            <h3>TDS vs Time</h3>
            <div style={chartStyle}>
                <ResponsiveContainer>
                    <LineChart data={formattedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="datetime" angle={-45} textAnchor="end" height={60} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="tds" stroke="#ff7300" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* ORP Chart */}
            <h3>ORP vs Time</h3>
            <div style={chartStyle}>
                <ResponsiveContainer>
                    <LineChart data={formattedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="datetime" angle={-45} textAnchor="end" height={60} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="orp" stroke="#ff0000" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

export default DataGraph;

// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// function DataGraph({ data }) {
//     const formattedData = data.map((row) => ({
//         ...row,
//         datetime: new Date(row.dateTime).toLocaleString("en-IN", {
//             dateStyle: "short",
//             timeStyle: "short",
//         }),
//     }));

//     return (
//         <div style={{ width: "100%", height: 400, marginTop: "2rem" }}>
//             <ResponsiveContainer>
//                 <LineChart data={formattedData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="datetime" angle={-45} textAnchor="end" height={60} />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
//                     <Line type="monotone" dataKey="ph" stroke="#82ca9d" />
//                     <Line type="monotone" dataKey="tds" stroke="#ff7300" />
//                     <Line type="monotone" dataKey="orp" stroke="#ff0000" />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// }

// export default DataGraph;
