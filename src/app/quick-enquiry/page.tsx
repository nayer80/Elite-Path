'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QuickEnquiryPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    nationality: 'Egyptian',
    date: '',
    dialCode: '+20',
    mobile: '',
    remark: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
    // After success redirect to home or close
    setTimeout(() => {
      router.push('/');
    }, 1400);
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-12 bg-gray-50">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
        <div className="border rounded-md p-4 mb-6">
          <h2 className="text-xl font-semibold text-center mb-3">Quick Enquiry</h2>
          <div className="flex items-center justify-between text-center gap-4">
            <div className="flex-1">
              <div className="text-sm">🇦🇪</div>
              <div className="font-semibold">+971509787748</div>
            </div>
            <div className="flex-1">
              <div className="text-sm">🇪🇬</div>
              <div className="font-semibold">+201020430122</div>
            </div>
            <div className="flex-1">
              <a href="https://wa.me/201020430122" target="_blank" rel="noopener noreferrer" className="inline-flex flex-col items-center gap-1">
                <div className="text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.52 3.48A11.94 11.94 0 0012 .5 11.92 11.92 0 003.75 3.75 11.94 11.94 0 00.5 12c0 2.11.55 4.08 1.6 5.86L.5 23.5l5.9-1.55A11.94 11.94 0 0012 23.5c6.6 0 11.99-5.39 11.99-12 0-3.2-1.25-6.19-3.47-8.02zM12 21.5a9.78 9.78 0 01-5.2-1.46l-.37-.22-3.48.94.94-3.36-.22-.35A9.78 9.78 0 1112 21.5z" />
                    <path d="M17.5 14.5c-.3 0-1.78-.9-2.06-1-.28-.1-.48-.14-.68.14-.2.28-.78 1-.95 1.2-.17.2-.34.25-.63.08-.3-.17-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.62.13-.13.3-.34.45-.51.15-.17.2-.28.3-.46.1-.17.05-.33-.02-.46-.07-.12-.68-1.64-.93-2.26-.24-.6-.48-.52-.66-.53-.17-.01-.37-.01-.57-.01s-.46.07-.7.33c-.24.26-.92.9-.92 2.2 0 1.3.95 2.56 1.08 2.74.13.17 1.86 2.84 4.52 3.87 3.36 1.35 4.06 1.09 4.79 1.02.29-.03.9-.36 1.03-.71.13-.35.13-.65.09-.71-.05-.06-.18-.09-.38-.16-.2-.07-1.17-.43-1.35-.48-.18-.05-.31-.07-.51.05-.2.12-.78.45-.95.6-.18.14-.36.07-.65.03z" />
                  </svg>
                </div>
                <div className="font-semibold">+201020430122</div>
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm mb-1 block text-gray-600">First Name*</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} required className="w-full rounded-md border px-4 py-3" placeholder="First Name" />
          </div>
          <div>
            <label className="text-sm mb-1 block text-gray-600">Last Name*</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} required className="w-full rounded-md border px-4 py-3" placeholder="Last Name" />
          </div>

          <div>
            <label className="text-sm mb-1 block text-gray-600">Email Address*</label>
            <input name="email" value={form.email} onChange={handleChange} type="email" required className="w-full rounded-md border px-4 py-3" placeholder="Email Address" />
          </div>
          <div>
            <label className="text-sm mb-1 block text-gray-600">Nationality</label>
            <select name="nationality" value={form.nationality} onChange={handleChange} className="w-full rounded-md border px-4 py-3">
              <option>Egyptian</option>
              <option>UAE</option>
              <option>Indian</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm mb-1 block text-gray-600">Travel Date</label>
            <input name="date" value={form.date} onChange={handleChange} type="date" className="w-full rounded-md border px-4 py-3" />
          </div>
          <div className="flex gap-2">
            <div className="w-1/4">
              <label className="text-sm mb-1 block text-gray-600">Dial</label>
              <select name="dialCode" value={form.dialCode} onChange={handleChange} className="w-full rounded-md border px-3 py-2">
                <option>+20</option>
                <option>+971</option>
                <option>+91</option>
              </select>
            </div>
            <div className="w-3/4">
              <label className="text-sm mb-1 block text-gray-600">Mobile Number*</label>
              <input name="mobile" value={form.mobile} onChange={handleChange} required className="w-full rounded-md border px-4 py-3" placeholder="Mobile Number" />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm mb-1 block text-gray-600">Put Your Remark Here *</label>
            <textarea name="remark" value={form.remark} onChange={handleChange} className="w-full rounded-md border px-4 py-3 h-28" placeholder="Put Your Remark Here"></textarea>
          </div>

          <div className="md:col-span-2 text-center">
            <button type="submit" disabled={loading} className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 transition">
              {loading ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </div>
        </form>

        {success && (
          <div className="mt-4 text-center text-green-600">Enquiry submitted — our travel expert will contact you shortly.</div>
        )}
      </div>
    </section>
  );
}
