"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import {
  ShieldCheck,
  Truck,
  Lock,
  Minus,
  Plus,
  Trash2,
  Tag,
  MapPinned,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { useStore } from "@/app/context/store-context";
import { products } from "@/app/lib/products";
import { supabase } from "@/lib/supabase";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useStore();

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    pincode: "",
    house: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] =
    useState<any>({});

  const [rememberAddress, setRememberAddress] =
    useState(false);

  useEffect(() => {
    const savedAddress = localStorage.getItem(
      "whatifwear_address",
    );

    if (savedAddress) {
      const parsed = JSON.parse(savedAddress);

      setFormData(parsed);
      setRememberAddress(true);
    }
  }, []);

  useEffect(() => {
    if (rememberAddress) {
      localStorage.setItem(
        "whatifwear_address",
        JSON.stringify(formData),
      );
    }
  }, [formData, rememberAddress]);

  useEffect(() => {
    const script = document.createElement(
      "script",
    );

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    document.body.appendChild(script);
  }, []);

  const shippingFee =
    cartTotal >= 1499 ? 0 : 79;

  const discount =
    appliedCoupon === "WHATIF10"
      ? 100
      : 0;

  const finalTotal =
    cartTotal + shippingFee - discount;

    const autoAddress =
    formData.fullName ||
    formData.house ||
    formData.area ||
    formData.landmark ||
    formData.city ||
    formData.state ||
    formData.pincode ||
    formData.phone
      ? `
  ${formData.fullName}
  ${formData.house}
  ${formData.area}
  ${formData.landmark}
  ${formData.city}
  ${formData.state}${
          formData.pincode
            ? ` - ${formData.pincode}`
            : ""
        }
  ${
    formData.phone
      ? `Phone: ${formData.phone}`
      : ""
  }
  `.trim()
      : "";
  const cartProducts = useMemo(() => {
    return cart.map((item) => {
      const product = products.find(
        (p) => p.id === item.id,
      );

      return {
        ...product,
        quantity: item.quantity,
      };
    });
  }, [cart]);

  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numeric = value
        .replace(/\D/g, "")
        .slice(0, 10);

      setFormData((prev) => ({
        ...prev,
        [name]: numeric,
      }));

      return;
    }

    if (name === "pincode") {
      const numeric = value
        .replace(/\D/g, "")
        .slice(0, 6);

      setFormData((prev) => ({
        ...prev,
        [name]: numeric,
      }));

      if (numeric.length === 6) {
        try {
          const res = await fetch(
            `https://api.postalpincode.in/pincode/${numeric}`,
          );

          const data = await res.json();

          const office =
            data?.[0]?.PostOffice?.[0];

          if (office) {
            setFormData((prev) => ({
              ...prev,
              pincode: numeric,
              city: office.District,
              state: office.State,
            }));
          }
        } catch (err) {
          console.log(err);
        }
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        "Full name required";
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email =
        "Valid email required";
    }

    if (formData.phone.length !== 10) {
      newErrors.phone =
        "Enter valid 10 digit number";
    }

    if (formData.pincode.length !== 6) {
      newErrors.pincode =
        "Enter valid pincode";
    }

    if (!formData.house.trim()) {
      newErrors.house = "Required";
    }

    if (!formData.area.trim()) {
      newErrors.area = "Required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "Required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const applyCoupon = () => {
    const formatted =
      coupon.trim().toUpperCase();

    if (formatted === "WHATIF10") {
      setAppliedCoupon(formatted);

      alert(
        "Coupon applied successfully",
      );
    } else {
      setAppliedCoupon("");

      alert("Invalid coupon code");
    }
  };

  const useLiveLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat =
          position.coords.latitude;

        const lon =
          position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
          );

          const data =
            await response.json();

          const address = data.address;

          setFormData((prev) => ({
            ...prev,
            house:
              address.house_number || "",
            area:
              address.suburb ||
              address.neighbourhood ||
              "",
            landmark: address.road || "",
            city:
              address.city ||
              address.town ||
              address.village ||
              "",
            state:
              address.state || "",
            pincode:
              address.postcode || "",
          }));
        } catch (error) {
          console.log(error);
        }
      },
      () => {
        alert(
          "Location permission denied",
        );
      },
    );
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const orderData = {
        customer_name:
          formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: autoAddress,
        products: cartProducts,
        subtotal: cartTotal,
        shipping: shippingFee,
        discount,
        total: finalTotal,
        coupon: appliedCoupon,
        payment_status: "paid",
      };

      const options = {
        key:
          process.env
            .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: finalTotal * 100,

        currency: "INR",

        name: "WHAT IF WEAR",

        description:
          "Secure Premium Checkout",

        handler: async function (
          response: any,
        ) {
          const { error } =
            await supabase
              .from("orders")
              .insert([
                {
                  ...orderData,
                  razorpay_payment_id:
                    response.razorpay_payment_id,
                },
              ]);

              if (error) {
                console.log(error);
              
                alert(JSON.stringify(error));
              
                return;
              }

          clearCart();

          alert(
            "Payment Successful",
          );

          router.push(
            "/order-success",
          );
        },

        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },

        theme: {
          color: "#134B42",
        },
      };

      const razor =
        new window.Razorpay(options);

      razor.open();
    } catch (err) {
      console.log(err);

      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#f8f6f1] text-[#134B42]">
      {/* HEADER */}

      <header className="border-b border-[#134B42]/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <Link
            href="/"
            className="
              text-[16px]
              font-black
              tracking-[0.30em]
              text-[#134B42]
              md:text-[22px]
            "
          >
            WHAT IF WEAR
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <div className="flex items-center gap-2 text-[11px] text-[#134B42]/70">
              <ShieldCheck size={15} />
              Secure Checkout
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#134B42]/70">
              <Truck size={15} />
              Fast Delivery
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#134B42]/70">
              <Lock size={15} />
              Encrypted Payment
            </div>
          </div>
        </div>
      </header>

      {/* BODY */}

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[1fr_400px] md:px-8">
        {/* LEFT */}

        <div className="rounded-[30px] border border-[#134B42]/10 bg-white p-5 md:p-8">
          <h1
            className="
              text-[28px]
              font-black
              tracking-[-0.04em]
              text-[#134B42]
              md:text-[48px]
            "
          >
            CHECKOUT
          </h1>

          {/* PERSONAL */}

          <div className="mt-10">
            <h2 className="text-[18px] font-semibold">
              Personal Information
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.20em] text-[#134B42]/60">
                  Full Name *
                </label>

                <input
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="h-14 w-full rounded-2xl border border-[#134B42]/10 bg-[#f8f6f1] px-5 text-[14px] outline-none focus:border-[#EEA83B]"
                />

                {errors.fullName && (
                  <p className="mt-2 text-[12px] text-red-500">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.20em] text-[#134B42]/60">
                  Email Address *
                </label>

                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="abc@gmail.com"
                  className="h-14 w-full rounded-2xl border border-[#134B42]/10 bg-[#f8f6f1] px-5 text-[14px] outline-none focus:border-[#EEA83B]"
                />

                {errors.email && (
                  <p className="mt-2 text-[12px] text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.20em] text-[#134B42]/60">
                  Phone Number *
                </label>

                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10 digit number"
                  className="h-14 w-full rounded-2xl border border-[#134B42]/10 bg-[#f8f6f1] px-5 text-[14px] outline-none focus:border-[#EEA83B]"
                />

                {errors.phone && (
                  <p className="mt-2 text-[12px] text-red-500">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.20em] text-[#134B42]/60">
                  Pincode *
                </label>

                <input
                  required
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="6 digit pincode"
                  className="h-14 w-full rounded-2xl border border-[#134B42]/10 bg-[#f8f6f1] px-5 text-[14px] outline-none focus:border-[#EEA83B]"
                />

                {errors.pincode && (
                  <p className="mt-2 text-[12px] text-red-500">
                    {errors.pincode}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* SHIPPING */}

          <div className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-semibold">
                Shipping Information *
              </h2>

              <button
                type="button"
                onClick={useLiveLocation}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#134B42]
                  px-4
                  py-2
                  text-[11px]
                  text-white
                "
              >
                <MapPinned size={14} />
                Use Live Location
              </button>
            </div>

            <div className="mt-6 grid gap-5">
              <input
                required
                name="house"
                value={formData.house}
                onChange={handleChange}
                placeholder="House / Flat / Building *"
                className="h-14 w-full rounded-2xl border border-[#134B42]/10 bg-[#f8f6f1] px-5 text-[14px] outline-none"
              />

              <div className="grid gap-5 md:grid-cols-2">
                <input
                  required
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Locality / Area *"
                  className="h-14 w-full rounded-2xl border border-[#134B42]/10 bg-[#f8f6f1] px-5 text-[14px] outline-none"
                />

                <input
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  placeholder="Landmark"
                  className="h-14 w-full rounded-2xl border border-[#134B42]/10 bg-[#f8f6f1] px-5 text-[14px] outline-none"
                />

                <input
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City *"
                  className="h-14 w-full rounded-2xl border border-[#134B42]/10 bg-[#f8f6f1] px-5 text-[14px] outline-none"
                />

                <input
                  required
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State *"
                  className="h-14 w-full rounded-2xl border border-[#134B42]/10 bg-[#f8f6f1] px-5 text-[14px] outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.20em] text-[#134B42]/60">
                  Full Address
                </label>

                <textarea
                  value={autoAddress}
                  readOnly
                  className="
                    min-h-[140px]
                    w-full
                    rounded-3xl
                    border border-[#134B42]/10
                    bg-[#f8f6f1]
                    p-5
                    text-[14px]
                    leading-7
                    outline-none
                  "
                />

                <div className="mt-4 flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={rememberAddress}
                    onChange={(e) =>
                      setRememberAddress(
                        e.target.checked,
                      )
                    }
                    className="h-4 w-4 accent-[#134B42]"
                  />

                  <p className="text-[12px] text-[#134B42]/70">
                    Remember this address for
                    future orders
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="md:sticky md:top-6 md:h-fit">
          <div className="overflow-hidden rounded-[34px] bg-[#134B42] p-5 text-white md:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#AEBA8A]">
                  Your Cart
                </p>

                <h2 className="mt-2 text-[24px] font-black leading-none tracking-[-0.04em] text-[#EEA83B]">
                  ORDER
                  <br />
                  SUMMARY
                </h2>
              </div>

              <div className="rounded-full bg-white/10 px-4 py-2 text-[12px] font-semibold">
                {cart.length} Items
              </div>
            </div>

            {/* PRODUCTS */}

            <div className="mt-8 space-y-4">
              {cartProducts.map((item: any) => (
                <div
                  key={item.id}
                  className="rounded-[28px] border border-white/10 bg-white/[0.05] p-4"
                >
                  <div className="flex gap-4">
                    <Link
                      href={`/product/${item.id}`}
                    >
                      <div className="relative h-[110px] w-[90px] cursor-pointer overflow-hidden rounded-[22px] bg-white/10 transition hover:scale-[1.03]">
                        <Image
                          src={item.images?.[0]}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    <div className="flex-1">
                      <h3 className="text-[16px] font-semibold">
                        {item.name}
                      </h3>

                      <div className="mt-3 flex items-center gap-3">
                        <span className="text-[14px] text-white/40 line-through">
                          ₹999
                        </span>

                        <span className="text-[26px] font-black text-[#EEA83B]">
                          ₹{item.price}
                        </span>
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex overflow-hidden rounded-full border border-white/10">
                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item.id,
                              )
                            }
                            className="grid h-10 w-10 place-items-center bg-black/20"
                          >
                            <Minus size={16} />
                          </button>

                          <div className="grid h-10 w-10 place-items-center bg-white/10 text-[14px] font-semibold">
                            {item.quantity}
                          </div>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.id,
                              )
                            }
                            className="grid h-10 w-10 place-items-center bg-black/20"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            removeFromCart(
                              item.id,
                            )
                          }
                          className="text-[#EEA83B]"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* COUPON */}

            <div className="mt-8">
              <div className="mb-3 flex items-center gap-2">
                <Tag
                  size={16}
                  className="text-[#EEA83B]"
                />

                <p className="text-[11px] uppercase tracking-[0.25em] text-[#AEBA8A]">
                  Apply Coupon
                </p>
              </div>

              <div className="flex gap-3">
                <input
                  value={coupon}
                  onChange={(e) =>
                    setCoupon(
                      e.target.value,
                    )
                  }
                  placeholder="Example: WHATIF10"
                  className="h-12 flex-1 rounded-full border border-white/10 bg-white/10 px-5 text-[13px] outline-none"
                />

                <button
                  onClick={applyCoupon}
                  className="rounded-full bg-[#EEA83B] px-5 text-[12px] font-semibold text-[#134B42]"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* PRICE */}

            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="space-y-4">
                <div className="flex justify-between text-[13px] text-white/70">
                  <span>Subtotal</span>

                  <span>
                    ₹{cartTotal}
                  </span>
                </div>

                <div className="flex justify-between text-[13px] text-white/70">
                  <span>Shipping</span>

                  <span>
                    {shippingFee === 0
                      ? "FREE"
                      : `₹${shippingFee}`}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[13px] text-[#EEA83B]">
                    <span>
                      Coupon Discount
                    </span>

                    <span>
                      - ₹{discount}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#AEBA8A]">
                      Final Payment
                    </p>

                    <h3 className="mt-2 text-[18px] font-semibold">
                      Total
                    </h3>
                  </div>

                  <p className="text-[32px] font-black text-[#EEA83B]">
                    ₹{finalTotal}
                  </p>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="
                  mt-7
                  w-full
                  rounded-[18px]
                  bg-[#EEA83B]
                  px-5
                  py-4
                  text-center
                  text-[13px]
                  font-bold
                  tracking-[0.08em]
                  text-[#134B42]
                  transition
                  hover:scale-[1.02]
                "
              >
                {loading
                  ? "Processing..."
                  : `Proceed To Secure Payment • ₹${finalTotal}`}
              </button>

              <p className="mt-4 text-center text-[11px] text-white/60">
                GST included • 100% secure
                checkout
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}