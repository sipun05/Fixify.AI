import React from 'react';
import { Waves, Activity, Shield, BarChart3, AlertTriangle, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Waves,
      title: 'Water Quality Monitoring',
      description: 'Continuous monitoring of pH, dissolved oxygen, temperature, and other critical water parameters.'
    },
    {
      icon: Activity,
      title: 'Real-time Analytics',
      description: 'Live data visualization and trend analysis to optimize fish farm operations.'
    },
    {
      icon: Shield,
      title: 'Toxic Substance Detection',
      description: 'Early detection of harmful chemicals and pollutants to protect fish health.'
    },
    {
      icon: BarChart3,
      title: 'Productivity Insights',
      description: 'Data-driven insights to maximize fish growth and farm productivity.'
    },
    {
      icon: AlertTriangle,
      title: 'Early Warning System',
      description: 'Instant alerts for critical conditions to prevent fish mortality.'
    },
    {
      icon: Zap,
      title: 'IoT Integration',
      description: 'Seamless integration with existing farm infrastructure and management systems.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Aquaculture Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing fish farming with cutting-edge IoT technology for sustainable and profitable aquaculture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-2xl mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;