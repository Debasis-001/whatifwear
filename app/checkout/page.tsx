"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    locality: "",
    landmark: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = async () => {
    setLoading(true);

    const { error } = await supabase.from("orders").insert([
      {
        customer_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phone,
        address: formData.address,
        locality: formData.locality,
        landmark: formData.landmark,
        city: formData.city,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode,
        total_amount: 999,
      },
    ]);

    setLoading(false);

    if (error) {
      console.log(error);
      alert(error.message);
    } else {
      alert("Order Placed Successfully!");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        locality: "",
        landmark: "",
        city: "",
        district: "",
        state: "",
        pincode: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#6E725F] py-10 px-4 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-[#F3EEE8] rounded-3xl p-8 md:p-12 shadow-2xl border border-[#D8D2C8]">

        <h1 className="text-4xl md:text-5xl font-serif text-[#6E725F] mb-2">
          Checkout
        </h1>

        <p className="text-[#6E725F]/70 mb-10 text-sm md:text-base">
          Fill in your delivery details carefully.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black transition-all"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black transition-all"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black transition-all"
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black transition-all"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black transition-all"
          />

          <input
            type="text"
            name="district"
            placeholder="District"
            value={formData.district}
            onChange={handleChange}
            className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black transition-all"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black transition-all"
          />

          <input
            type="text"
            name="locality"
            placeholder="Locality / Area"
            value={formData.locality}
            onChange={handleChange}
            className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black transition-all"
          />

        </div>

        <textarea
          name="address"
          placeholder="Full Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black transition-all mt-5 h-36 resize-none"
        />

        <input
          type="text"
          name="landmark"
          placeholder="Nearby Landmark"
          value={formData.landmark}
          onChange={handleChange}
          className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black transition-all mt-5"
        />

        <button
          onClick={handleOrder}
          disabled={loading}
          className="w-full mt-8 bg-black hover:bg-[#1a1a1a] text-white py-5 rounded-2xl text-lg font-medium tracking-wide transition-all"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

      </div>
    </div>
  );
}