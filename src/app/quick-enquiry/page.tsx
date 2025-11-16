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
              <div className="text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-4" viewBox="0 0 60 36" aria-hidden="true" role="img">
                  <title>United Arab Emirates flag</title>
                  <rect width="60" height="36" fill="#00732F" />
                  <rect y="12" width="60" height="12" fill="#FFFFFF" />
                  <rect y="24" width="60" height="12" fill="#000000" />
                  <rect width="12" height="36" fill="#D80027" />
                </svg>
              </div>
              <div className="font-semibold">+971509787748</div>
            </div>
            <div className="flex-1">
              <div className="text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-4" viewBox="0 0 60 36" aria-hidden="true" role="img">
                  <title>Egypt flag</title>
                  <rect width="60" height="12" fill="#CE1126" />
                  <rect y="12" width="60" height="12" fill="#FFFFFF" />
                  <rect y="24" width="60" height="12" fill="#000000" />
                </svg>
              </div>
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
              <option>Afghanistan</option>
              <option>Albania</option>
              <option>Algeria</option>
              <option>Andorra</option>
              <option>Angola</option>
              <option>Antigua and Barbuda</option>
              <option>Argentina</option>
              <option>Armenia</option>
              <option>Australia</option>
              <option>Austria</option>
              <option>Azerbaijan</option>
              <option>Bahamas</option>
              <option>Bahrain</option>
              <option>Bangladesh</option>
              <option>Barbados</option>
              <option>Belarus</option>
              <option>Belgium</option>
              <option>Belize</option>
              <option>Benin</option>
              <option>Bhutan</option>
              <option>Bolivia</option>
              <option>Bosnia and Herzegovina</option>
              <option>Botswana</option>
              <option>Brazil</option>
              <option>Brunei</option>
              <option>Bulgaria</option>
              <option>Burkina Faso</option>
              <option>Burundi</option>
              <option>Cabo Verde</option>
              <option>Cambodia</option>
              <option>Cameroon</option>
              <option>Canada</option>
              <option>Central African Republic</option>
              <option>Chad</option>
              <option>Chile</option>
              <option>China</option>
              <option>Colombia</option>
              <option>Comoros</option>
              <option>Costa Rica</option>
              <option>Côte d'Ivoire</option>
              <option>Croatia</option>
              <option>Cuba</option>
              <option>Cyprus</option>
              <option>Czech Republic</option>
              <option>Democratic Republic of the Congo</option>
              <option>Denmark</option>
              <option>Djibouti</option>
              <option>Dominica</option>
              <option>Dominican Republic</option>
              <option>Ecuador</option>
              <option>Egypt</option>
              <option>El Salvador</option>
              <option>Equatorial Guinea</option>
              <option>Eritrea</option>
              <option>Estonia</option>
              <option>Eswatini</option>
              <option>Ethiopia</option>
              <option>Fiji</option>
              <option>Finland</option>
              <option>France</option>
              <option>Gabon</option>
              <option>Gambia</option>
              <option>Georgia</option>
              <option>Germany</option>
              <option>Ghana</option>
              <option>Greece</option>
              <option>Grenada</option>
              <option>Guatemala</option>
              <option>Guinea</option>
              <option>Guinea-Bissau</option>
              <option>Guyana</option>
              <option>Haiti</option>
              <option>Honduras</option>
              <option>Hungary</option>
              <option>Iceland</option>
              <option>India</option>
              <option>Indonesia</option>
              <option>Iran</option>
              <option>Iraq</option>
              <option>Ireland</option>
              <option>Israel</option>
              <option>Italy</option>
              <option>Jamaica</option>
              <option>Japan</option>
              <option>Jordan</option>
              <option>Kazakhstan</option>
              <option>Kenya</option>
              <option>Kiribati</option>
              <option>Kuwait</option>
              <option>Kyrgyzstan</option>
              <option>Laos</option>
              <option>Latvia</option>
              <option>Lebanon</option>
              <option>Lesotho</option>
              <option>Liberia</option>
              <option>Libya</option>
              <option>Liechtenstein</option>
              <option>Lithuania</option>
              <option>Luxembourg</option>
              <option>Madagascar</option>
              <option>Malawi</option>
              <option>Malaysia</option>
              <option>Maldives</option>
              <option>Mali</option>
              <option>Malta</option>
              <option>Marshall Islands</option>
              <option>Mauritania</option>
              <option>Mauritius</option>
              <option>Mexico</option>
              <option>Micronesia</option>
              <option>Moldova</option>
              <option>Monaco</option>
              <option>Mongolia</option>
              <option>Montenegro</option>
              <option>Morocco</option>
              <option>Mozambique</option>
              <option>Myanmar</option>
              <option>Namibia</option>
              <option>Nauru</option>
              <option>Nepal</option>
              <option>Netherlands</option>
              <option>New Zealand</option>
              <option>Nicaragua</option>
              <option>Niger</option>
              <option>Nigeria</option>
              <option>North Macedonia</option>
              <option>Norway</option>
              <option>Oman</option>
              <option>Pakistan</option>
              <option>Palau</option>
              <option>Panama</option>
              <option>Papua New Guinea</option>
              <option>Paraguay</option>
              <option>Peru</option>
              <option>Philippines</option>
              <option>Poland</option>
              <option>Portugal</option>
              <option>Qatar</option>
              <option>Romania</option>
              <option>Russia</option>
              <option>Rwanda</option>
              <option>Saint Kitts and Nevis</option>
              <option>Saint Lucia</option>
              <option>Saint Vincent and the Grenadines</option>
              <option>Samoa</option>
              <option>San Marino</option>
              <option>Sao Tome and Principe</option>
              <option>Saudi Arabia</option>
              <option>Senegal</option>
              <option>Serbia</option>
              <option>Seychelles</option>
              <option>Sierra Leone</option>
              <option>Singapore</option>
              <option>Slovakia</option>
              <option>Slovenia</option>
              <option>Solomon Islands</option>
              <option>Somalia</option>
              <option>South Africa</option>
              <option>Spain</option>
              <option>Sri Lanka</option>
              <option>Sudan</option>
              <option>Suriname</option>
              <option>Sweden</option>
              <option>Switzerland</option>
              <option>Syria</option>
              <option>Taiwan</option>
              <option>Tajikistan</option>
              <option>Tanzania</option>
              <option>Thailand</option>
              <option>Timor-Leste</option>
              <option>Togo</option>
              <option>Tonga</option>
              <option>Trinidad and Tobago</option>
              <option>Tunisia</option>
              <option>Turkey</option>
              <option>Turkmenistan</option>
              <option>Tuvalu</option>
              <option>Uganda</option>
              <option>Ukraine</option>
              <option>United Arab Emirates</option>
              <option>United Kingdom</option>
              <option>United States</option>
              <option>Uruguay</option>
              <option>Uzbekistan</option>
              <option>Vanuatu</option>
              <option>Vatican City</option>
              <option>Venezuela</option>
              <option>Vietnam</option>
              <option>Yemen</option>
              <option>Zambia</option>
              <option>Zimbabwe</option>
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
                  <option>+1</option>
                  <option>+7</option>
                  <option>+20</option>
                  <option>+27</option>
                  <option>+30</option>
                  <option>+31</option>
                  <option>+32</option>
                  <option>+33</option>
                  <option>+34</option>
                  <option>+36</option>
                  <option>+39</option>
                  <option>+40</option>
                  <option>+41</option>
                  <option>+43</option>
                  <option>+44</option>
                  <option>+45</option>
                  <option>+46</option>
                  <option>+47</option>
                  <option>+48</option>
                  <option>+49</option>
                  <option>+51</option>
                  <option>+52</option>
                  <option>+53</option>
                  <option>+54</option>
                  <option>+55</option>
                  <option>+56</option>
                  <option>+57</option>
                  <option>+58</option>
                  <option>+60</option>
                  <option>+61</option>
                  <option>+62</option>
                  <option>+63</option>
                  <option>+64</option>
                  <option>+65</option>
                  <option>+66</option>
                  <option>+81</option>
                  <option>+82</option>
                  <option>+84</option>
                  <option>+86</option>
                  <option>+90</option>
                  <option>+91</option>
                  <option>+92</option>
                  <option>+93</option>
                  <option>+94</option>
                  <option>+95</option>
                  <option>+98</option>
                  <option>+211</option>
                  <option>+212</option>
                  <option>+213</option>
                  <option>+216</option>
                  <option>+218</option>
                  <option>+220</option>
                  <option>+221</option>
                  <option>+222</option>
                  <option>+223</option>
                  <option>+224</option>
                  <option>+225</option>
                  <option>+226</option>
                  <option>+227</option>
                  <option>+228</option>
                  <option>+229</option>
                  <option>+230</option>
                  <option>+231</option>
                  <option>+232</option>
                  <option>+233</option>
                  <option>+234</option>
                  <option>+235</option>
                  <option>+236</option>
                  <option>+237</option>
                  <option>+238</option>
                  <option>+239</option>
                  <option>+240</option>
                  <option>+241</option>
                  <option>+242</option>
                  <option>+243</option>
                  <option>+244</option>
                  <option>+245</option>
                  <option>+246</option>
                  <option>+248</option>
                  <option>+249</option>
                  <option>+250</option>
                  <option>+251</option>
                  <option>+252</option>
                  <option>+253</option>
                  <option>+254</option>
                  <option>+255</option>
                  <option>+256</option>
                  <option>+257</option>
                  <option>+258</option>
                  <option>+260</option>
                  <option>+261</option>
                  <option>+262</option>
                  <option>+263</option>
                  <option>+264</option>
                  <option>+265</option>
                  <option>+266</option>
                  <option>+267</option>
                  <option>+268</option>
                  <option>+269</option>
                  <option>+290</option>
                  <option>+291</option>
                  <option>+297</option>
                  <option>+298</option>
                  <option>+299</option>
                  <option>+350</option>
                  <option>+351</option>
                  <option>+352</option>
                  <option>+353</option>
                  <option>+354</option>
                  <option>+355</option>
                  <option>+356</option>
                  <option>+357</option>
                  <option>+358</option>
                  <option>+359</option>
                  <option>+370</option>
                  <option>+371</option>
                  <option>+372</option>
                  <option>+373</option>
                  <option>+374</option>
                  <option>+375</option>
                  <option>+376</option>
                  <option>+377</option>
                  <option>+378</option>
                  <option>+379</option>
                  <option>+380</option>
                  <option>+381</option>
                  <option>+382</option>
                  <option>+383</option>
                  <option>+385</option>
                  <option>+386</option>
                  <option>+387</option>
                  <option>+389</option>
                  <option>+420</option>
                  <option>+421</option>
                  <option>+423</option>
                  <option>+500</option>
                  <option>+501</option>
                  <option>+502</option>
                  <option>+503</option>
                  <option>+504</option>
                  <option>+505</option>
                  <option>+506</option>
                  <option>+507</option>
                  <option>+508</option>
                  <option>+509</option>
                  <option>+590</option>
                  <option>+591</option>
                  <option>+592</option>
                  <option>+593</option>
                  <option>+594</option>
                  <option>+595</option>
                  <option>+596</option>
                  <option>+597</option>
                  <option>+598</option>
                  <option>+599</option>
                  <option>+670</option>
                  <option>+672</option>
                  <option>+673</option>
                  <option>+674</option>
                  <option>+675</option>
                  <option>+676</option>
                  <option>+677</option>
                  <option>+678</option>
                  <option>+679</option>
                  <option>+680</option>
                  <option>+681</option>
                  <option>+682</option>
                  <option>+683</option>
                  <option>+685</option>
                  <option>+686</option>
                  <option>+687</option>
                  <option>+688</option>
                  <option>+689</option>
                  <option>+690</option>
                  <option>+691</option>
                  <option>+692</option>
                  <option>+850</option>
                  <option>+851</option>
                  <option>+852</option>
                  <option>+853</option>
                  <option>+855</option>
                  <option>+856</option>
                  <option>+880</option>
                  <option>+886</option>
                  <option>+960</option>
                  <option>+961</option>
                  <option>+962</option>
                  <option>+963</option>
                  <option>+964</option>
                  <option>+965</option>
                  <option>+966</option>
                  <option>+967</option>
                  <option>+968</option>
                  <option>+969</option>
                  <option>+970</option>
                  <option>+971</option>
                  <option>+972</option>
                  <option>+973</option>
                  <option>+974</option>
                  <option>+975</option>
                  <option>+976</option>
                  <option>+977</option>
                  <option>+978</option>
                  <option>+979</option>
                  <option>+992</option>
                  <option>+993</option>
                  <option>+994</option>
                  <option>+995</option>
                  <option>+996</option>
                  <option>+998</option>
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
