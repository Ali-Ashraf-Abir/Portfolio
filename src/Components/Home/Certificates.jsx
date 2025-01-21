import React from 'react';

const EducationAndCertifications = () => {
  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "National University",
      year: "2020 - current",
    },
    {
      degree: "High School Certificate",
      institution: "Rajarbag Policelines School And College",
      year: "2018 - 2020",
    },
  ];

  const certifications = [
    {
      title: "MERN Stack Development (BlackBelt) Certification",
      issuer: "Programming Hero",
      year: "2022",
    },
    {
      title: "Blender 3D Modeling Certification",
      issuer: "Udemy",
      year: "2024",
    },
  ];

  return (
    <section className="bg-[rgb(0,0,0,0.2)] py-12 font-nunito " id="education">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Education & Certifications</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-200 mb-4">Education</h3>
            <ul className="space-y-6">
              {education.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 mt-2 mr-4 bg-blue-500 rounded-full"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#F2A07B]">{item.degree}</h4>
                    <p className="text-gray-[#F2A07B]">{item.institution}</p>
                    <p className="text-gray-[#F2A07B] text-sm">{item.year}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications Section */}
          <div>
            <h3 className="text-2xl font-semibold text-white-700 mb-4">Certifications</h3>
            <ul className="space-y-6">
              {certifications.map((cert, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 mt-2 mr-4 bg-green-500 rounded-full"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#F2A07B]">{cert.title}</h4>
                    <p className="text-white-600">{cert.issuer}</p>
                    <p className="text-white-500 text-sm">{cert.year}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationAndCertifications;
