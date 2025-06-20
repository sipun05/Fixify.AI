import React from 'react';

const Contact = () => {
  return (
   
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-12">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information Section */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We'd love to hear from you! Whether you have a question about our project, need support, or just want to connect, feel free to reach out.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                {/* Changed icon color to match "Learn More" button/darker indigo */}
                <svg
                  className="h-8 w-8 text-indigo-700 mr-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Our Location</h3>
                  <p className="text-gray-600">
                    IIT Hyderabad, Kandi, Sangareddy,
                    <br />
                    Telangana 502285, India
                  </p>
                </div>
              </div>

              <div className="flex items-center">
               
                <svg
                  className="h-8 w-8 text-indigo-700 mr-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Email Us</h3>
                  <a href="mailto:info@iith.ac.in" className="text-indigo-600 hover:underline">
                    info@iith.ac.in
                  </a>
                 
                </div>
              </div>

              <div className="flex items-center">
                {/* Changed icon color */}
                <svg
                  className="h-8 w-8 text-indigo-700 mr-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.135a11.042 11.042 0 005.516 5.516l1.135-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Call Us</h3>
                  <a href="tel:+914023016033" className="text-indigo-600 hover:underline">
                    +91 (40) 2301 6033
                  </a>
                  {/* Official IIT Hyderabad phone number */}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                  placeholder="Regarding your project..."
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition duration-300 ease-in-out"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Section - IIT Hyderabad Location */}
        <div className="mt-16 bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Find Us on the Map</h2>
          <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden">
           <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3803.379784440937!2d78.11724017493947!3d17.58469148333649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbf1007e345c65%3A0xe32b239145061491!2sIIT%20Hyderabad!5e0!3m2!1sen!2sin!4v1750046502759!5m2!1sen!2sin"
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="IIT Hyderabad Location Updated"
/>

          </div>
          <p className="text-center text-gray-500 mt-4">
            Indian Institute of Technology Hyderabad (IIT Hyderabad)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;