'use client';

import { useState } from 'react';

export default function LeadFormBlock({ data }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    companySize: '',
    department: '',
    products: [],
    financeAck: false,
    accessibilityAck: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleProductChange = (product) => {
    setFormData((prev) => {
      const exists = prev.products.includes(product);

      return {
        ...prev,
        products: exists
          ? prev.products.filter((p) => p !== product)
          : [...prev.products, product],
      };
    });
  };

  const buildRoutingPods = () => {
    const pods = [];

    const companySize = Number(formData.companySize);

    if (
      companySize > 500 ||
      formData.products.includes('CrumbTrail Analytics')
    ) {
      pods.push('enterprise_pod');
    } else {
      pods.push('smb_pod');
    }

    if (formData.products.includes('C.A.R.B. Fleet')) {
      pods.push('hardware_specialist_pod');
    }

    return pods;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      sales_routing_pods: buildRoutingPods(),
    };

    console.log(payload);

    alert('Lead submitted successfully');
  };

  return (
    <section className="py-20 px-6 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">
          {data.heading}
        </h2>

        <p className="mb-10 text-gray-600">
          {data.description}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-2xl"
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="email"
            name="workEmail"
            placeholder="Work Email"
            required
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <select
            name="companySize"
            required
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          >
            <option value="">Company Size</option>
            <option value="50">1-50</option>
            <option value="250">51-250</option>
            <option value="500">251-500</option>
            <option value="1000">500+</option>
          </select>

          <select
            name="department"
            required
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          >
            <option value="">Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales</option>
            <option value="Operations">Operations</option>
          </select>

          <div>
            <p className="font-semibold mb-3">
              Product Interest
            </p>

            {[
              'C.A.R.B. Fleet',
              'PantryOS',
              'CrumbTrail Analytics',
            ].map((product) => (
              <label
                key={product}
                className="flex items-center gap-3 mb-2"
              >
                <input
                  type="checkbox"
                  onChange={() => handleProductChange(product)}
                />

                {product}
              </label>
            ))}
          </div>

          {formData.department === 'Finance' && (
            <label className="flex gap-3 items-start">
              <input
                type="checkbox"
                name="financeAck"
                required
                onChange={handleChange}
              />

              SnackOverflow is not liable for audit errors caused by sugar rushes.
            </label>
          )}

          {formData.products.includes('C.A.R.B. Fleet') && (
            <label className="flex gap-3 items-start">
              <input
                type="checkbox"
                name="accessibilityAck"
                required
                onChange={handleChange}
              />

              Our office floors are flat and wheelchair accessible.
            </label>
          )}

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            {data.submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}