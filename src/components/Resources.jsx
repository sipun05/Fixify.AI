// App.js
import React from 'react';
import Device1 from '../assests/FieldWork/Device1.jpg';
import Device2 from '../assests/FieldWork/Device2.jpg';
import Device3 from '../assests/FieldWork/Device3.jpg';
function Resources() {
  const resources = [
    {
      id: 1,
      image: Device1, // Using the actual file name
      title: 'Device 1: Modular Buoy Design',
      description: 'This image showcases the modular design of a buoy, featuring two distinct sections. The left section, primarily yellow with a perforated top, appears to be a housing for internal components, possibly for sensors or electronics. The right section, also yellow but with a prominent blue stripe, suggests a different functional area, perhaps for flotation or a battery compartment. The overall design emphasizes a compact and robust structure suitable for aquatic environments. The four yellow cylindrical protrusions on top of the right section might be mounts for additional equipment or protective covers. The textured surface on the left section could aid in ventilation or offer grip.',
    },
    {
      id: 2,
      image: Device2, // Using the actual file name
      title: 'Device 2: System Overview',
      description: 'This image provides a comprehensive overview of the system setup, displaying "MVP 1," "MVP 2," and "Aggregator" components. "MVP 2" is identified as the modular buoy design shown in Device 1, while "MVP 1" appears to be a transparent enclosure with multiple vertical supports, likely housing sensitive electronics. The "Aggregator" unit on the left and right sides suggests data collection points, potentially connected to the MVP units via cables. Insets highlight "MVP 2" and a "Sensor Node," providing a closer look at their internal configurations. The "Sensor Node" within the buoy reveals various electronic boards and wiring, indicating its function in data acquisition. The overall arrangement suggests a distributed sensing system with centralized data aggregation.',
    },
    {
      id: 3,
      image: Device3, // Using the actual file name
      title: 'Device 3: Detailed Components',
      description: 'This image offers a more detailed view of individual system components, building upon the overview in Device 2. It shows the "Aggregator" and "MVP 1" from multiple angles, emphasizing their structural and electronic details. The "MVP 1" is presented with a clear top, allowing visibility into its internal wiring and circuit boards, while the "Aggregator" reveals its enclosed components. This detailed view aids in understanding the physical characteristics and interconnections of each part within the larger system.',
    },
  ];

  return (
    // Main container with gradient background
    <div className="min-h-screen font-inter p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-purple-700 via-blue-500 to-green-500">
      <header className="text-center py-8">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
          Our Resources
        </h1>
        <p className="mt-4 text-lg text-gray-200">
          Explore the key components and designs of our innovative projects.
        </p>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        {resources.map((resource, index) => (
          <div
            key={resource.id}
            className={`flex flex-col rounded-xl shadow-lg overflow-hidden bg-white ${
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            }`}
          >
            {/* Image Section */}
            <div className="lg:w-1/2 p-4 flex items-center justify-center bg-gray-50">
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-auto object-cover rounded-lg shadow-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/600x400/CCCCCC/000000?text=Image+Not+Found`;
                }}
              />
            </div>

            {/* Information Section */}
            <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {resource.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                {resource.description}
              </p>
            </div>
          </div>
        ))}
      </main>

      <footer className="text-center py-8 text-gray-200 text-sm">
        <p>&copy; {new Date().getFullYear()} MizuGuna @2025.</p>
      </footer>
    </div>
  );
}

export default Resources;