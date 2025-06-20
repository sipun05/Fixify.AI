import React from 'react';
import Building1 from '../assests/FieldWork/Building_Image1.jpg'

const About = () => {
  return (
  
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Building1})` }} 
    >
      {/* A semi-transparent overlay to make text more readable on the background image */}
      <div className="min-h-screen bg-black bg-opacity-40 flex flex-col items-center justify-center py-8">
        {/* The main "About Us" title, centered in a block that floats above the gradient, similar to the main title in image_729dce.png */}
        <div className="container mx-auto mt-16 p-8 bg-white bg-opacity-75 rounded-lg shadow-xl text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">About Us</h1>
        </div>

        <main className="container mx-auto mt-8 p-6 bg-white bg-opacity-75 rounded-lg shadow-xl mb-8 max-w-4xl">
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
    </div>
  );
};

export default About;