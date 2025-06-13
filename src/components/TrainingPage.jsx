import React, { useState } from 'react';

// Assuming these images are correctly path-ed in your project
import deviceOverviewImage from '../assests/FieldWork/Device1.jpg';
import fishermanLaunchingImage from '../assests/FieldWork/FILED6.jpg';
import fishermanMappingImage from '../assests/FieldWork/FILED7.jpg';
import fishermanUsingControllerImage from '../assests/FieldWork/FIELD2.jpg';

// Reusable Modal Component (no changes needed here, it's functional)
const ImageModal = ({ imageUrl, altText, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <img
          src={imageUrl}
          alt={altText}
          className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold hover:bg-gray-200 focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
};


const TrainingPage = () => {
  const [modalImage, setModalImage] = useState(null);

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    // Adjusted background gradient to match the image
    <div className="min-h-screen bg-gradient-to-br from-[#8A2BE2] via-[#6A5ACD] to-[#483D8B] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Main Title - Color adjusted to darker blue/purple for contrast */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#483D8B] pt-10 pb-6 leading-tight text-center">
          Training for Fishermen
        </h1>

        {/* Section 1 */}
        <section className="p-6 sm:p-8 mb-8 mx-6 bg-gray-50 rounded-lg shadow-inner">
          {/* Subtitle - Color adjusted to match the blue in the image */}
          <h2 className="text-3xl font-bold text-[#4169E1] mb-6 pb-2 border-b-2 border-[#A7C7E7]">
            1. Understanding Your MizuGuna Sensor Device
          </h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="md:w-2/3">
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                The MizuGuna system uses small "sensor nodes" (aggregators) that collect vital water quality data directly from your lake. These devices are robust, designed specifically for aquatic environments, and are made for easy use.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Features:</h3>
              <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
                <li><strong>Autonomous Swimming:</strong> The device is designed to move on its own, navigating the lake to collect comprehensive data.</li>
                <li><strong>Advanced Data Collection:</strong> It precisely gathers information on critical parameters like water temperature, pH levels, dissolved oxygen, ammonia concentrations, and more, providing a complete picture of your lake's health.</li>
                <li><strong>Enhanced Buoyancy:</strong> Equipped with buoyant thermocol components, the device is engineered to float reliably and resist sinking easily, ensuring it stays on the surface for optimal operation and easy retrieval.</li>
              </ul>
            </div>
            <div className="md:w-1/3 flex flex-col items-center">
              <img
                src={deviceOverviewImage}
                alt="MizuGuna Sensor Device Components Overview"
                className="w-full h-auto rounded-lg shadow-md border border-gray-200 cursor-pointer transition-transform duration-200 hover:scale-105"
                onClick={() => openModal(deviceOverviewImage)}
              />
              <p className="text-sm text-gray-600 mt-2 text-center">A detailed look at the MizuGuna sensor node and its components.</p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="p-6 sm:p-8 mb-8 mx-6 bg-blue-50 rounded-lg shadow-inner">
          {/* Subtitle - Color adjusted to match the blue in the image */}
          <h2 className="text-3xl font-bold text-[#4169E1] mb-6 pb-2 border-b-2 border-[#A7C7E7]">
            2. Safe Handling and Launching Procedures
          </h2>
          <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8">
            <div className="md:w-2/3">
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                Proper handling of the MizuGuna device ensures its longevity and accurate data collection. Always follow these guidelines:
              </p>
              <ol className="list-decimal list-inside text-gray-700 text-lg space-y-2">
                <li><strong>Gentle Approach:</strong> When retrieving or launching the device (the "aggregator" in our MVP), always handle it with extreme care. Avoid sudden movements or dropping it.</li>
                <li><strong>Secure Placement:</strong> Before releasing it into the water, ensure the device is stable and properly oriented. Verify all connections are secure and nothing is loose.</li>
                <li><strong>Trust the Buoyancy (but be cautious):</strong> Remember, the device has built-in thermocol support, making it highly buoyant and resistant to sinking easily. However, it's crucial to always exercise caution and keep an eye on it, especially in strong currents or windy conditions.</li>
              </ol>
              <p className="text-gray-700 text-lg mt-4 leading-relaxed">
                Think of it as a small, valuable piece of equipment; guide it gently and allow it to perform its critical environmental monitoring work.
              </p>
            </div>
            <div className="md:w-1/3 flex flex-col items-center">
              <img
                src={fishermanLaunchingImage}
                alt="Fisherman gently launching MizuGuna device"
                className="w-full h-auto rounded-lg shadow-md border border-gray-200 cursor-pointer transition-transform duration-200 hover:scale-105"
                onClick={() => openModal(fishermanLaunchingImage)}
              />
              <p className="text-sm text-gray-600 mt-2 text-center">Collaboration with Our team, alongside the local community of Fishermen for the Testing of the Device.</p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="p-6 sm:p-8 mb-8 mx-6 bg-gray-50 rounded-lg shadow-inner">
          {/* Subtitle - Color adjusted to match the blue in the image */}
          <h2 className="text-3xl font-bold text-[#4169E1] mb-6 pb-2 border-b-2 border-[#A7C7E7]">
            3. Mapping Your Lake for Comprehensive Data
          </h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="md:w-2/3">
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                To obtain the most accurate and complete data about your entire lake's water quality, it's essential to guide the device to cover all relevant areas systematically.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Effective Mapping Strategy:</h3>
              <ol className="list-decimal list-inside text-gray-700 text-lg space-y-2">
                <li><strong>Slow and Steady Movement:</strong> Guide the device slowly and deliberately. Rushing its movement can lead to missed data points or an incomplete survey of the area.</li>
                <li><strong>Cover All Critical Areas:</strong> Ensure the device visits every corner of the lake, including shallow areas, deeper sections, inlets, and outlets. A grid or zigzag pattern is often recommended for thorough coverage.</li>
                <li><strong>Constant Observation:</strong> While the device swims, continuously observe its movement and the data collection progress (if visible). This helps in verifying it's functioning correctly and accurately mapping the desired path.</li>
              </ol>
              <p className="text-gray-700 text-lg mt-4 leading-relaxed">
                By systematically guiding the device, we create a detailed and reliable "water quality map" of the lake, which is vital for informed decision-making in fish farming.
              </p>
            </div>
            <div className="md:w-1/3 flex flex-col items-center">
              <img
                src={fishermanMappingImage}
                alt="Fisherman guiding device for lake mapping"
                className="w-full h-auto rounded-lg shadow-md border border-gray-200 cursor-pointer transition-transform duration-200 hover:scale-105"
                onClick={() => openModal(fishermanMappingImage)}
              />
              <p className="text-sm text-gray-600 mt-2 text-center">Instructions given to the fisherman for effective mapping.</p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="p-6 sm:p-8 mb-8 mx-6 bg-blue-50 rounded-lg shadow-inner">
          {/* Subtitle - Color adjusted to match the blue in the image */}
          <h2 className="text-3xl font-bold text-[#4169E1] mb-6 pb-2 border-b-2 border-[#A7C7E7]">
            4. Basic Control of the Sensor Node
          </h2>
          <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8">
            <div className="md:w-2/3">
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                While the MizuGuna device is designed for autonomous operation, you might have a simple handheld controller or app interface to guide its direction or activate specific functions.
              </p>
              <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
                <li><strong>Directional Controls:</strong> Familiarize yourself with basic controls such as forward, backward, left, and right. These are typically intuitive buttons or joystick movements.</li>
                <li><strong>Function Buttons:</strong> Understand any specific buttons for starting/stopping data collection, returning to a home point, or emergency shutdown.</li>
                <li><strong>Immediate Feedback:</strong> Observe how the device responds to your inputs immediately. If it doesn't respond as expected, refer to troubleshooting or contact support.</li>
              </ul>
              <p className="text-gray-700 text-lg mt-4 leading-relaxed">
                Always ensure the controller's battery is charged before use. If there are specific lights or indicators on the device or controller, understand what they mean (e.g., data being collected, low battery).
              </p>
            </div>
            <div className="md:w-1/3 flex flex-col items-center">
              <img
                src={fishermanUsingControllerImage}
                alt="Fisherman using MizuGuna controller"
                className="w-full h-auto rounded-lg shadow-md border border-gray-200 cursor-pointer transition-transform duration-200 hover:scale-105"
                onClick={() => openModal(fishermanUsingControllerImage)}
              />
              <p className="text-sm text-gray-600 mt-2 text-center">A fisherman demonstrating the use of the MizuGuna controller.</p>
            </div>
          </div>
        </section>

        {/* Important Reminders & Support Section */}
        <section className="bg-green-50 border-l-4 border-green-500 p-6 sm:p-8 mx-6 rounded-lg shadow-md mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4 pb-2 border-b-2 border-green-200">
            Important Reminders & Support
          </h2>
          <ul className="list-disc list-inside text-gray-800 text-lg space-y-2 mb-6">
            <li>Always handle the MizuGuna device with utmost care to ensure its proper function and longevity.</li>
            <li>Ensure all relevant parts of your lake are thoroughly covered during mapping for the most accurate data.</li>
            <li>If you encounter any operational issues, unexpected behavior, or have any questions, please do not hesitate to contact the MizuGuna support team immediately.</li>
          </ul>
          <p className="text-xl sm:text-2xl font-bold text-green-800 text-center mt-6 leading-relaxed">
            Thank you for being a vital part of Project MizuGuna. Your dedicated efforts directly contribute to building a healthier and more productive aquaculture environment for our community!
          </p>
        </section>
      </div>

      {/* Render the ImageModal if modalImage is set */}
      <ImageModal
        imageUrl={modalImage}
        altText="Zoomed image"
        onClose={closeModal}
      />
    </div>
  );
};

export default TrainingPage;