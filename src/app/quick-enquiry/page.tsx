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
              <div className="font-semibold">+971 42087445</div>
            </div>
            <div className="flex-1">
              <div className="text-sm">🇮🇳</div>
              <div className="font-semibold">+91 2066838877</div>
            </div>
            <div className="flex-1">
              <div className="text-sm">💬</div>
              <div className="font-semibold">+971 561794005</div>
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
