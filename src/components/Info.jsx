import React, { useState } from 'react';

// Main App component
function Info() {
 const [activeTab, setActiveTab] = useState('fishTypes'); // State to manage active tab

  // Data for the different sections
  const fishData = {
    fishTypes: [
      "Siamese fighting fish", "Jawless fish", "Queen angelfish",
      "Airbreathing catfishes", "Wels catfish", "Blue ring angelfish",
      "Garfish", "Atlantic blue marlin", "Burbot",
      "Princess parrotfish", "King mackerel", "Sandbar shark",
      "Mozambique tilapia", "Oyster toadfish", "Ray-finned fishes",
      "Greater amberjack", "Squalius cephalus", "Cartilaginous fishes",
      "Black bullhead", "Alewife"
    ],
    fishFarming: [
      "Monoculture (raising one type of fish)", "Polyculture (raising multiple species)",
      "Monosex Culture (raising single-sex fish)", "Concrete Pond farming",
      "Culture Fishery (controlled cultivation)", "Cage system (using cages in water bodies)",
      "Classic fry farming (incubation of eggs and rearing fry)", "Integrated recycling system (tanks with water recirculation)",
      "Irrigation ditch or pond systems", "Pond aquaculture (artificial or natural ponds)",
      "Tarpaulin pond", "Earthen pond (near-natural environment)",
      "Freshwater fishery", "Integrated Multi-Trophic Aquaculture (IMTA)",
      "Organic aquaculture", "Pisciculture (general term for fish farming)"
    ],
    waterParameters: [
      { param: "pH", range: "6.0 - 7.0 (most freshwater aquariums)", ideal: "Neutral to slightly acidic for many species." },
      { param: "Temperature", range: "22 - 28°C (general freshwater)", ideal: "Varies by species, crucial for metabolism." },
      { param: "Ammonia (NH3)", range: "0 ppm", ideal: "Highly toxic, should always be zero." },
      { param: "Nitrite (NO2)", range: "0 - 10 ppb", ideal: "Toxic, should be kept as low as possible." },
      { param: "Nitrate (NO3)", range: "< 50 ppm (freshwater)", ideal: "Less toxic than ammonia/nitrite, but high levels can lead to algae blooms." },
      { param: "Alkalinity (KH)", range: "65 - 135 ppm (freshwater)", ideal: "Buffers pH changes, crucial for stable water." }
    ],
    fishDiseases: [
      "Dropsy (symptom of underlying issues like kidney/liver problems)",
      "Fin rot (bacterial disease, often due to poor water quality)",
      "Fungus (fluffy, grayish-white clumps on body or eggs)",
      "Furunculosis (bacterial infection, often in salmonids)",
      "Hemorrhagic septicemia (viral infection causing bleeding)",
      "Vibrio (bacterial infection, can cause discoloration, bulging eyes)",
      "Anchor worm (crustacean parasite, causes irritation and ulcers)",
      "Columnaris (bacterial infection, 'cotton mouth' appearance)",
      "Gill disorders (various causes including parasites like flukes)",
      "Gill mites (parasites attacking gills)",
      "Swim bladder disease (dysfunction leading to balance issues)",
      "Ammonia poisoning (due to high ammonia levels in water)",
      "Anemonefish disease (Brooklynellosis, caused by protozoa)",
      "Bacterial infections (general, often secondary to injury or stress)",
      "Cancer (fish can develop tumors)",
      "Edwardsiella (bacterial disease, affects catfish, zebrafish)",
      "Epizootic ulcerative syndrome (EUS) (fungal disease causing ulcers)",
      "Flukes (parasitic flatworms on skin or gills)",
      "Lymphocystis (viral infection causing raspberry-like growths)",
      "Slime disease (increased mucus production, often parasitic)",
      "Tail and fin rot (similar to fin rot, affecting tail)",
      "Velvet disease (Oodinium infection, dusty yellow appearance)",
      "White spot disease (Ich, highly contagious protozoan parasite)"
    ]
  };

  return (
    // Main container with responsive padding and background
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
      {/* Page Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-white mb-8 mt-4 drop-shadow-md">
        Fish Farming Essentials
      </h1>

      {/* Navigation Tabs */}
      <nav className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
        {/* Tab Button: Fish Types */}
        <button
          className={`px-5 py-2 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out shadow-md
            ${activeTab === 'fishTypes' ? 'bg-blue-600 text-white transform scale-105' : 'bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800'}`}
          onClick={() => setActiveTab('fishTypes')}
        >
          Fish Types
        </button>
        {/* Tab Button: Type of Fish Farming */}
        <button
          className={`px-5 py-2 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out shadow-md
            ${activeTab === 'fishFarming' ? 'bg-blue-600 text-white transform scale-105' : 'bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800'}`}
          onClick={() => setActiveTab('fishFarming')}
        >
          Fish Farming
        </button>
        {/* Tab Button: Optimal Water Parameters */}
        <button
          className={`px-5 py-2 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out shadow-md
            ${activeTab === 'waterParameters' ? 'bg-blue-600 text-white transform scale-105' : 'bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800'}`}
          onClick={() => setActiveTab('waterParameters')}
        >
          Water Parameters
        </button>
        {/* Tab Button: Fish Diseases */}
        <button
          className={`px-5 py-2 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out shadow-md
            ${activeTab === 'fishDiseases' ? 'bg-blue-600 text-white transform scale-105' : 'bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800'}`}
          onClick={() => setActiveTab('fishDiseases')}
        >
          Fish Diseases
        </button>
      </nav>

      {/* Content Display Area */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
        {/* Conditional rendering based on activeTab */}
        {activeTab === 'fishTypes' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-blue-700 mb-5 text-center">Common Fish Types</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 list-disc pl-5">
              {fishData.fishTypes.map((type, index) => (
                <li key={index} className="text-lg text-gray-700 leading-relaxed">
                  {type}
                </li>
              ))}
            </ul>
          </div>






        )}

        {activeTab === 'fishFarming' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-blue-700 mb-5 text-center">Types of Fish Farming</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc pl-5">
              {fishData.fishFarming.map((type, index) => (
                <li key={index} className="text-lg text-gray-700 leading-relaxed">
                  {type}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'waterParameters' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-blue-700 mb-5 text-center">Optimal Water Parameters</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-blue-50 border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider rounded-tl-lg">Parameter</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Typical Range</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider rounded-tr-lg">Importance</th>
                  </tr>
                </thead>
                <tbody>
                  {fishData.waterParameters.map((param, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-b-0">
                      <td className="py-3 px-4 text-lg text-gray-900 font-medium">{param.param}</td>
                      <td className="py-3 px-4 text-lg text-gray-700">{param.range}</td>
                      <td className="py-3 px-4 text-lg text-gray-700">{param.ideal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-center text-gray-600 text-sm italic">
              Note: Specific optimal ranges can vary significantly by fish species. Always research the needs of your particular fish.
            </p>
          </div>
        )}

        {activeTab === 'fishDiseases' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-blue-700 mb-5 text-center">Common Fish Diseases & Issues</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc pl-5">
              {fishData.fishDiseases.map((disease, index) => (
                <li key={index} className="text-lg text-gray-700 leading-relaxed">
                  {disease}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-center text-gray-600 text-sm italic">
              If you suspect your fish are ill, consult a veterinarian or an experienced aquarist.
            </p>
          </div>
        )}
      </div>

      {/* Tailwind CSS utility classes for animation (if needed for specific effects) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Info;
