import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-emerald-500">
        {/* Animated Background Shapes */}         v vvbvb
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400 rounded-full opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400 rounded-full opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Main Heading */}
          <div className="mb-8 animate-fadeIn">
            <h1 className="inline-block bg-white text-indigo-900 px-8 py-4 rounded-2xl shadow-lg text-3xl md:text-4xl lg:text-5xl font-bold leading-tight transform hover:scale-105 transition-transform duration-300">
              IoT infrastructure for inland fresh water fish farming
            </h1>
          </div>

          {/* Description Card */}
          <div className="max-w-4xl mx-auto mt-12 animate-slideUp">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-2xl border border-white/20">
              <div className="text-gray-700 text-lg md:text-xl leading-relaxed space-y-4">
                <p>
                  A network of <span className="font-semibold text-indigo-600">Sensor Nodes</span> spread across fish farms,
                  which continuously monitor the water parameters and concentration of toxic substances and report to the farms on time
                  to take the required action to improve productivity, improve the health of fish.
                </p>
                <p>
                  Also to detect or avoid water poisoning, fish mortality like activities.
                </p>
              </div>
              
              {/* Call to Action */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Learn More
                </button>
                <button className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;