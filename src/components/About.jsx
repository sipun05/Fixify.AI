import React from 'react';

const About = () => {
  return (
    // The entire page background is now the gradient from the first image
    <div className="min-h-screen bg-gradient-to-r from-[#2a2a6b] via-[#4d2d88] to-[#882d8d]">
      
      {/* The main "About Us" title, centered in a block that floats above the gradient, similar to the main title in image_729dce.png */}
      <div className="container mx-auto mt-16 p-8 bg-white rounded-lg shadow-xl text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">About Us</h1>
      </div>

      {/* Main content area for the description, also floating as a card on the gradient background */}
      <main className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl mb-8 max-w-4xl">
        <div className="prose lg:prose-lg mx-auto text-gray-800"> {/* Ensure text is visible on white background */}
          <p className="mb-4">
            Rural Development Centre (RDC) at IIT Hyderabad was established in July 2020 with a vision to support rural development initiatives of the Government through innovative technologies being developed at IIT Hyderabad. The main objectives of RDC are as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To identify the problems and needs of the rural people through direct interaction or with the help of reputed institutions/organizations/NGOs working for rural sectors.</li>
            <li>To strengthen the UBA activities conducted in the villages adopted by IITH.</li>
            <li>To help the NNS team to conduct activities in nearby villages.</li>
            <li>To facilitate the faculty/staff/students who are passionate to develop technologies to be used in the field such as agriculture, sanitation, drinking water, etc. in rural areas.</li>
            <li>To collaborate with institutions/industries interested to contribute meaningfully for the development of the rural sector.</li>
            <li>To organize training/workshops on skills development to educate the villagers.</li>
            <li>To spread awareness among rural people about the importance of hygiene and cleanliness.</li>
            <li>To develop an academic framework for working on societal problems, their solution, and delivery.</li>
            <li>To involve and motivate the students to work for the welfare of society.</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default About;