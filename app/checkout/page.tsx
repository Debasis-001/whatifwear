"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useStore } from "@/app/context/store-context";
import { products } from "@/app/lib/products";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useStore();

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

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);

    // SAVE ORDER
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
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
          total_amount: cartTotal,
        },
      ])
      .select();

    if (orderError) {
      console.log(orderError);
      alert(orderError.message);
      setLoading(false);
      return;
    }

    const orderId = orderData[0].id;

    // SAVE ORDER ITEMS
    const orderItems = cart.map((item) => {
      const product = products.find((p) => p.id === item.id);

      return {
        order_id: orderId,
        product_name: product?.name || "Unknown Product",
        quantity: item.quantity,
        price: product?.price || 0,
      };
    });

    const { error: itemError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemError) {
      console.log(itemError);
      alert(itemError.message);
      setLoading(false);
      return;
    }

    setLoading(false);

    // RAZORPAY
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

      amount: cartTotal * 100,

      currency: "INR",

      name: "WHAT IF WEAR",

      description: "Luxury Fashion Purchase",

      handler: function () {
        alert("Payment Successful!");

        clearCart();

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
      },

      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },

      theme: {
        color: "#000000",
      },
    };

    const razor = new window.Razorpay(options);

    razor.open();
  };

  return (
    <div className="min-h-screen bg-[#6E725F] py-10 px-4 flex justify-center items-center">
      <div className="w-full max-w-6xl grid md:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="md:col-span-2 bg-[#F3EEE8] rounded-3xl p-8 md:p-12 shadow-2xl border border-[#D8D2C8]">

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
              className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black"
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black"
            />

            <input
              type="text"
              name="district"
              placeholder="District"
              value={formData.district}
              onChange={handleChange}
              className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black"
            />

            <input
              type="text"
              name="locality"
              placeholder="Locality / Area"
              value={formData.locality}
              onChange={handleChange}
              className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black"
            />

          </div>

          <textarea
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black mt-5 h-36 resize-none"
          />

          <input
            type="text"
            name="landmark"
            placeholder="Nearby Landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="w-full border border-[#B7B29F] bg-transparent p-4 rounded-xl outline-none focus:border-black mt-5"
          />

          <button
            onClick={handleOrder}
            disabled={loading}
            className="w-full mt-8 bg-black hover:bg-[#1a1a1a] text-white py-5 rounded-2xl text-lg font-medium tracking-wide transition-all"
          >
            {loading ? "Processing..." : `Pay ₹${cartTotal}`}
          </button>

        </div>

        {/* RIGHT */}
        <div className="bg-[#F3EEE8] rounded-3xl p-8 shadow-2xl border border-[#D8D2C8] h-fit sticky top-10">

          <h2 className="text-2xl font-serif text-[#6E725F] mb-6">
            Order Summary
          </h2>

          <div className="space-y-5">

            {cart.map((item) => {
              const product = products.find((p) => p.id === item.id);

              if (!product) return null;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-[#D8D2C8] pb-4"
                >
                  <div>

                    <h3 className="font-medium text-black">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <p className="font-semibold">
                    ₹{product.price * item.quantity}
                  </p>

                </div>
              );
            })}

          </div>

          <div className="mt-8 border-t border-[#D8D2C8] pt-5 flex justify-between items-center">

            <h3 className="text-xl font-semibold">
              Total
            </h3>

            <p className="text-2xl font-bold">
              ₹{cartTotal}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}