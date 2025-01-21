import React, { useState } from 'react';
import emailjs from "emailjs-com";
const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_hoh4vpt", // Replace with your EmailJS service ID
        "template_p36w5x9", // Replace with your EmailJS template ID
        formData, // Pass form data
        "o6K8M19rUzEnkqAq-" // Replace with your EmailJS public key
      )
      .then(() => {
        setFormStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setFormStatus("Failed to send the message. Please try again.");
      });
  };

  return (
    <section className="bg-[rgb(0,0,0,0.2)] py-12 font-nunito mr-[40vw] text-[3vh]" id="contact">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Contact Me</h2>
        <div className="max-w-lg mx-auto bg-[rgb(0,0,0,0.5)] p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-white font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows="5"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Send Message
            </button>
          </form>
          {formStatus && (
            <p className="mt-4 text-center text-sm text-white">{formStatus}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
