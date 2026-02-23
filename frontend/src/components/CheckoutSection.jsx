import React, { useMemo, useState, useEffect } from "react";
import { api } from "../api/axios";
import Section from "./Section";
import { Button } from "./ui/button";
import { useCart, useCheckout } from "../context/CartContext";



export default function CheckoutSection() {
  const { cart, clearCart } = useCart();
  const { setFulfillment, customer, setCustomer } = useCheckout();

  const [settings, setSettings] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successOrderNumber, setSuccessOrderNumber] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Get restaurant settings (tax rate, delivery fee, enabled flags)
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await api.get(`/api/restaurant/settings`);
        
        setSettings(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const verifyCheckout = async () => {
      const params = new URLSearchParams(window.location.search);
      const checkout = params.get("checkout");
      const sessionId = params.get("session_id");

      if (checkout === "cancelled") {
        setError("Payment was cancelled. Your order is still saved, but not paid.");
        window.history.replaceState({}, "", window.location.pathname);
        return;
      }

      if (checkout !== "success" || !sessionId) return;

      setStatusMessage("Finalizing payment...");
      try {
        const res = await api.get(`/api/payment/status/${sessionId}`);
        if (cancelled) return;

        if (res.data?.paid) {
          setSuccessOrderNumber(res.data?.order_number || "Paid order");
          clearCart();
          setStatusMessage("");
        } else {
          setError("Payment verification is pending. Please refresh in a moment.");
          setStatusMessage("");
        }
      } catch (e) {
        if (cancelled) return;
        setError(e?.response?.data?.detail || "Could not verify payment status.");
        setStatusMessage("");
      } finally {
        window.history.replaceState({}, "", window.location.pathname);
      }
    };

    verifyCheckout();
    return () => {
      cancelled = true;
    };
  }, [clearCart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.subtotal || 0), 0);
  }, [cart]);

  const taxRate = settings?.tax_rate ?? 0.08;
  const deliveryFee = 0;

  const tax = useMemo(() => subtotal * taxRate, [subtotal, taxRate]);
  const total = useMemo(() => subtotal + tax + deliveryFee, [subtotal, tax, deliveryFee]);

  useEffect(() => {
    setFulfillment("pickup");
  }, [setFulfillment]);

  const isValid = useMemo(() => {
    if (cart.length === 0) return false;
    if (!customer.name.trim()) return false;
    if (!customer.phone.trim()) return false;
    return true;
  }, [cart, customer]);

  const placeOrder = async (paymentMode = "online") => {
    setSubmitting(true);
    setError("");
    setSuccessOrderNumber("");
    setStatusMessage("");

    try {
      console.log("PLACE ORDER CLICKED");

      // Backend expects OrderCreate shape
      const payload = {
        order_type: "pickup",
        customer_info: {
          name: customer.name,
          phone: customer.phone,
          email: customer.email || undefined,
        },
        items: cart.map((ci) => ({
          item_id: ci.item_id || ci.id,
          name: ci.name,
          price: ci.price,
          quantity: ci.quantity,
          modifiers: (ci.modifiers || []).map((m) => ({
            id: m.id,
            name: m.name,
            price: m.price,
          })),
          subtotal: ci.subtotal,
        })),
        delivery_info: null,
        pickup_info: {
          pickup_time: "ASAP",
          instructions: customer.instructions || undefined,
        },
        payment_method: paymentMode === "online" ? "stripe" : "pay_on_pickup",
        subtotal,
        tax,
        delivery_fee: deliveryFee,
        total,
        special_instructions: customer.instructions || undefined,
      };
      console.log("SENDING PAYLOAD:", payload);


      const res = await api.post(`/api/orders`, payload);
      console.log("ORDER RESPONSE:", res.data);

      if (paymentMode === "online") {
        setStatusMessage("Redirecting to secure checkout...");
        const checkoutRes = await api.post(`/api/payment/checkout`, {
          order_id: res.data?.id,
          origin_url: window.location.origin,
        });

        const checkoutUrl = checkoutRes?.data?.checkout_url;
        if (!checkoutUrl) {
          throw new Error("Checkout URL was not returned by the server.");
        }

        window.location.assign(checkoutUrl);
        return;
      }

      setSuccessOrderNumber(res.data?.order_number || "Order placed!");
      clearCart();
    } catch (e) {
      console.error("ORDER ERROR:", e);

      if (e.code === "ECONNABORTED") {
        setError("Order request timed out. Please retry in a moment.");
      } else {
        const msg =
          e?.response?.data?.detail ||
          e?.message ||
          "Order failed. Please check your info and try again.";
        setError(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
  
      <Section id="order" className="bg-black" innerClassName="relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-sans font-semibold uppercase tracking-[0.12em] text-gray-400">
              Checkout
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-white tracking-[0.01em]">
              Order Through Our Website
            </h2>
            <p className="text-gray-400 mt-3">
              Pickup only. Confirm your info and place your order.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Name"
                value={customer.name}
                onChange={(v) => setCustomer({ ...customer, name: v })}
              />
              <Input
                label="Phone"
                value={customer.phone}
                onChange={(v) => setCustomer({ ...customer, phone: v })}
              />
            </div>

            <Input
              label="Email (optional)"
              value={customer.email || ""}
              onChange={(v) => setCustomer({ ...customer, email: v })}
            />

            <Textarea
              label="Order instructions (optional)"
              value={customer.instructions}
              onChange={(v) => setCustomer({ ...customer, instructions: v })}
            />

            {/* Totals */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row label={`Tax (${Math.round(taxRate * 100)}%)`} value={`$${tax.toFixed(2)}`} />
              <div className="flex justify-between items-center pt-3">
                <span className="text-gray-200 text-sm font-sans uppercase tracking-[0.12em]">
                  Total
                </span>
                <span className="text-white text-2xl sm:text-3xl font-sans font-bold tracking-tight">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
            {!isValid && (
               <div className="text-yellow-300 text-sm space-y-1 mb-4">
                  {cart.length === 0 && <div>• Add at least 1 item to your cart.</div>}
                  {!customer.name.trim() && <div>• Enter your name.</div>}
                  {!customer.phone.trim() && <div>• Enter your phone number.</div>}
                </div>
              )} 
            <Button
              onClick={() => placeOrder("online")}
              disabled={!isValid || submitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 sm:py-6 text-base sm:text-lg font-sans uppercase tracking-[0.14em] disabled:opacity-40"
            >
              {submitting ? "Placing..." : "Pay With Card / Apple Pay"}
            </Button>
            <Button
              onClick={() => placeOrder("pickup")}
              disabled={!isValid || submitting}
              variant="outline"
              className="w-full border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold py-5 sm:py-6 text-base sm:text-lg font-sans uppercase tracking-[0.14em] disabled:opacity-40"
            >
              {submitting ? "Placing..." : "Pay On Pickup"}
            </Button>

            {error && <p className="text-red-400">{error}</p>}
            {statusMessage && <p className="text-gray-300">{statusMessage}</p>}
            {successOrderNumber && (
              <p className="text-green-400">
                Order placed! Confirmation: <span className="font-bold">{successOrderNumber}</span>
              </p>
            )}

            {cart.length === 0 && (
              <p className="text-gray-400">
                Your cart is empty — add items from the menu first.
              </p>
            )}
          </div>
        </div>
      </Section>
    </>
  );

}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-gray-300">
      <span className="text-sm">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="block text-xs text-gray-400 font-sans font-semibold uppercase tracking-[0.12em] mb-2">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg bg-black/60 border border-white/10 text-white px-4 py-3 outline-none focus:border-white/30"
      />
    </label>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="block text-xs text-gray-400 font-sans font-semibold uppercase tracking-[0.12em] mb-2">
        {label}
      </span>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg bg-black/60 border border-white/10 text-white px-4 py-3 outline-none focus:border-white/30 resize-none"
      />
    </label>
  );
}
