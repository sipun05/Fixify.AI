import React, { useState, useEffect, useRef } from 'react';

const DashboardNew = () => {
    const [sensorData, setSensorData] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [error, setError] = useState(null);
    const intervalRef = useRef(null);
    const maxDataPoints = 50; // Keep last 50 readings

    // Configuration
    const API_ENDPOINT = 'http://localhost:5754/api/data'; // Replace with your actual endpoint
    const POLLING_INTERVAL = 5000; // Poll every 5 seconds

    // HTTP fetch function
    const fetchWaterQualityData = async () => {
        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any authentication headers if needed
                    // 'Authorization': 'Bearer your-token-here',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Handle both single object and array of objects
            const readings = Array.isArray(data) ? data : [data];

            // Process each reading to ensure it has the required fields
            const processedReadings = readings.map(reading => ({
                dateTime: reading.dateTime || new Date().toISOString(),
                temperature: parseFloat(reading.temperature) || 0,
                ph: parseFloat(reading.ph) || 0,
                tds: parseFloat(reading.tds) || 0,
                orp: parseInt(reading.orp) || 0
            }));

            setSensorData(prev => {
                const updated = [...prev, ...processedReadings];
                return updated.length > maxDataPoints ? updated.slice(-maxDataPoints) : updated;
            });

            setLastUpdate(new Date());
            setIsConnected(true);
            setError(null);

        } catch (err) {
            console.error('Error fetching water quality data:', err);
            setError(err.message);
            setIsConnected(false);
        }
    };

    // Alternative: Fetch historical data endpoint
    const fetchHistoricalData = async (limit = 50) => {
        try {
            const response = await fetch(`${API_ENDPOINT}/history?limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            const processedReadings = data.map(reading => ({
                dateTime: reading.dateTime || new Date().toISOString(),
                temperature: parseFloat(reading.temperature) || 0,
                ph: parseFloat(reading.ph) || 0,
                tds: parseFloat(reading.tds) || 0,
                orp: parseInt(reading.orp) || 0
            }));

            setSensorData(processedReadings);
            setLastUpdate(new Date());
            setIsConnected(true);
            setError(null);

        } catch (err) {
            console.error('Error fetching historical data:', err);
            setError(err.message);
            setIsConnected(false);
        }
    };

    // Setup HTTP polling
    useEffect(() => {
        // Initial fetch
        fetchWaterQualityData();

        // Uncomment the line below if you want to fetch historical data on component mount
        // fetchHistoricalData();

        // Set up polling interval
        intervalRef.current = setInterval(() => {
            fetchWaterQualityData();
        }, POLLING_INTERVAL);

        // Cleanup function
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Manual refresh function
    const handleRefresh = () => {
        fetchWaterQualityData();
    };

    // Create SVG line chart component
    const LineChart = ({ data, color, title, unit, yMin, yMax }) => {
        if (!data || data.length === 0) return null;

        const width = 400;
        const height = 200;
        const padding = 40;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;

        // Calculate scales
        const xScale = chartWidth / (data.length - 1 || 1);
        const yRange = yMax - yMin;
        const yScale = chartHeight / yRange;

        // Create path for line
        const pathData = data.map((point, index) => {
            const x = padding + index * xScale;
            const y = padding + chartHeight - ((point - yMin) * yScale);
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');

        // Create area fill path
        const areaPath = `${pathData} L ${padding + (data.length - 1) * xScale} ${padding + chartHeight} L ${padding} ${padding + chartHeight} Z`;

        return (
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
                <svg width={width} height={height} className="w-full h-auto">
                    {/* Grid lines */}
                    <defs>
                        <pattern id={`grid-${title}`} width="40" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width={width} height={height} fill={`url(#grid-${title})`} opacity="0.3" />

                    {/* Area fill */}
                    <path
                        d={areaPath}
                        fill={color}
                        fillOpacity="0.1"
                    />

                    {/* Line */}
                    <path
                        d={pathData}
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Data points */}
                    {data.map((point, index) => {
                        const x = padding + index * xScale;
                        const y = padding + chartHeight - ((point - yMin) * yScale);
                        return (
                            <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r="3"
                                fill={color}
                                stroke="white"
                                strokeWidth="2"
                            />
                        );
                    })}

                    {/* Y-axis labels */}
                    <text x={padding - 10} y={padding + 5} textAnchor="end" className="text-xs fill-gray-600">
                        {yMax.toFixed(1)}{unit}
                    </text>
                    <text x={padding - 10} y={padding + chartHeight + 5} textAnchor="end" className="text-xs fill-gray-600">
                        {yMin.toFixed(1)}{unit}
                    </text>

                    {/* Latest value */}
                    <text x={width - padding} y={20} textAnchor="end" className="text-sm font-bold" fill={color}>
                        {data[data.length - 1]?.toFixed(2)}{unit}
                    </text>
                </svg>
            </div>
        );
    };

    // Get latest values for display
    const latestReading = sensorData[sensorData.length - 1];

    // Extract data for charts
    const temperatureData = sensorData.map(item => item.temperature);
    const phData = sensorData.map(item => item.ph);
    const tdsData = sensorData.map(item => item.tds);
    const orpData = sensorData.map(item => item.orp);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Water Quality Monitoring Dashboard
                    </h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                            <span className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                                {isConnected ? 'Connected' : 'Disconnected'}
                            </span>
                        </div>
                        {lastUpdate && (
                            <span className="text-sm text-gray-500">
                                Last update: {lastUpdate.toLocaleTimeString()}
                            </span>
                        )}
                        <span className="text-sm text-gray-500">
                            Readings: {sensorData.length}
                        </span>
                        <button
                            onClick={handleRefresh}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                            Refresh
                        </button>
                    </div>

                    {/* Error display */}
                    {error && (
                        <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            Error: {error}
                        </div>
                    )}
                </div>

                {/* Current Values Cards */}
                {latestReading && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Temperature</h3>
                                    <p className="text-3xl font-bold text-blue-600">
                                        {latestReading.temperature.toFixed(2)}°C
                                    </p>
                                </div>
                                <div className="text-blue-500">
                                    🌡️
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">pH Level</h3>
                                    <p className="text-3xl font-bold text-green-600">
                                        {latestReading.ph.toFixed(2)}
                                    </p>
                                </div>
                                <div className="text-green-500">
                                    🧪
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">TDS</h3>
                                    <p className="text-3xl font-bold text-purple-600">
                                        {latestReading.tds.toFixed(1)} ppm
                                    </p>
                                </div>
                                <div className="text-purple-500">
                                    💧
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">ORP</h3>
                                    <p className="text-3xl font-bold text-orange-600">
                                        {latestReading.orp} mV
                                    </p>
                                </div>
                                <div className="text-orange-500">
                                    ⚡
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* No data message */}
                {sensorData.length === 0 && !error && (
                    <div className="text-center py-12">
                        <div className="text-gray-500 text-lg">
                            No data available. Check your API connection.
                        </div>
                    </div>
                )}

                {/* Charts */}
                {sensorData.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <LineChart
                            data={temperatureData}
                            color="#3b82f6"
                            title="Temperature"
                            unit="°C"
                            yMin={20}
                            yMax={30}
                        />
                        <LineChart
                            data={phData}
                            color="#22c55e"
                            title="pH Level"
                            unit=""
                            yMin={0}
                            yMax={16}
                        />
                        <LineChart
                            data={tdsData}
                            color="#a855f7"
                            title="Total Dissolved Solids"
                            unit=" ppm"
                            yMin={0}
                            yMax={20}
                        />
                        <LineChart
                            data={orpData}
                            color="#f97316"
                            title="Oxidation Reduction Potential"
                            unit=" mV"
                            yMin={280}
                            yMax={300}
                        />
                    </div>
                )}

                {/* Trend Analysis */}
                {sensorData.length > 1 && (
                    <div className="bg-white p-6 rounded-lg shadow mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Trend Analysis</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {latestReading && sensorData.length > 1 && (
                                <>
                                    <div className="text-center">
                                        <h4 className="text-sm font-medium text-gray-500">Temperature Trend</h4>
                                        <div className={`text-2xl ${temperatureData[temperatureData.length - 1] > temperatureData[temperatureData.length - 2] ? 'text-red-500' : 'text-blue-500'}`}>
                                            {temperatureData[temperatureData.length - 1] > temperatureData[temperatureData.length - 2] ? '↗️' : '↘️'}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-sm font-medium text-gray-500">pH Trend</h4>
                                        <div className={`text-2xl ${phData[phData.length - 1] > phData[phData.length - 2] ? 'text-green-500' : 'text-red-500'}`}>
                                            {phData[phData.length - 1] > phData[phData.length - 2] ? '↗️' : '↘️'}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-sm font-medium text-gray-500">TDS Trend</h4>
                                        <div className={`text-2xl ${tdsData[tdsData.length - 1] > tdsData[tdsData.length - 2] ? 'text-purple-500' : 'text-blue-500'}`}>
                                            {tdsData[tdsData.length - 1] > tdsData[tdsData.length - 2] ? '↗️' : '↘️'}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-sm font-medium text-gray-500">ORP Trend</h4>
                                        <div className={`text-2xl ${orpData[orpData.length - 1] > orpData[orpData.length - 2] ? 'text-green-500' : 'text-orange-500'}`}>
                                            {orpData[orpData.length - 1] > orpData[orpData.length - 2] ? '↗️' : '↘️'}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Data Table */}
                {sensorData.length > 0 && (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Readings</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature (°C)</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">pH</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TDS (ppm)</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ORP (mV)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {sensorData.slice(-10).reverse().map((reading, index) => (
                                            <tr key={index} className={index === 0 ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {new Date(reading.dateTime).toLocaleTimeString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                                                    {reading.temperature.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                                                    {reading.ph.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">
                                                    {reading.tds.toFixed(1)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-medium">
                                                    {reading.orp}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardNew;