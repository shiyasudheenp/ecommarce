import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all required fields");
      return;
    }

    alert("Thank you! Your message has been sent.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-black text-white text-center py-16 px-6">
        <h1 className="text-4xl font-serif mb-3">Contact Us</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          We'd love to hear from you. Reach out with any questions.
        </p>
      </div>

      <div className="px-6 md:px-10 py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-100 rounded-md shadow-sm p-6 md:p-8 flex flex-col gap-4"
          >
            <h2 className="text-xl font-semibold mb-2">Send us a Message</h2>

            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:border-yellow-600"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:border-yellow-600"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:border-yellow-600"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                placeholder="Write your message..."
                className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:border-yellow-600"
              />
            </div>

            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-white py-2.5 rounded-md font-medium transition-all mt-2"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-gray-100 rounded-md shadow-sm p-6 flex items-start gap-4">
              <span className="text-yellow-600 text-xl">📍</span>
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-gray-500 text-sm">
                  123 Gold Street, Malappuram, Kerala 625001
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-md shadow-sm p-6 flex items-start gap-4">
              <span className="text-yellow-600 text-xl">📞</span>
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-gray-500 text-sm">+91 98765 43210</p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-md shadow-sm p-6 flex items-start gap-4">
              <span className="text-yellow-600 text-xl">✉️</span>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-gray-500 text-sm">hello@shaajewels.com</p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-md shadow-sm p-6 flex items-start gap-4">
              <span className="text-yellow-600 text-xl">🕐</span>
              <div>
                <h3 className="font-semibold mb-1">Working Hours</h3>
                <p className="text-gray-500 text-sm">Mon–Sat: 10am – 7pm</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;