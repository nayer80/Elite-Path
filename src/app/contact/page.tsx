'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2">Get in touch with our travel experts</p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-5xl mb-4">📞</div>
              <h3 className="font-bold text-xl mb-2">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
              <p className="text-gray-600">Available 24/7</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-5xl mb-4">📧</div>
              <h3 className="font-bold text-xl mb-2">Email</h3>
              <p className="text-gray-600">info@raynatours.com</p>
              <p className="text-gray-600">support@raynatours.com</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="font-bold text-xl mb-2">Address</h3>
              <p className="text-gray-600">123 Travel Street</p>
              <p className="text-gray-600">New York, NY 10001</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Your name"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Your email"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Message subject"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Your message"
                />
              </div>
              <button type="submit" className="w-full btn-primary text-lg py-3">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map or Additional Info */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Elite Path?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '✅', title: 'Expert Guides', desc: '20+ years of travel expertise' },
              { icon: '💯', title: '100% Satisfaction', desc: 'Money-back guarantee' },
              { icon: '🌍', title: 'Global Coverage', desc: 'Tours in 150+ countries' },
            ].map((reason, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-5xl mb-3">{reason.icon}</div>
                <h3 className="font-bold text-lg mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
