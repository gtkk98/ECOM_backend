"use client";

import { useCheckout } from "@clerk/nextjs/experimental";
import { ShippingFormInputs } from "@repo/types";
import { PaymentElement } from "@stripe/react-stripe-js";
import { ConfirmError } from "@stripe/stripe-js";
import { useState } from "react";

type ClerkCheckout = {
  updateEmail?: (email: string) => Promise<unknown>;
  updateShippingAddress?: (payload: {
    name: string;
    address: {
      line1: string;
      city: string;
      country: string;
    };
  }) => Promise<unknown>;
  confirm: () => Promise<{ type: string; error?: ConfirmError | null }>;
};

const CheckoutForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const checkout = useCheckout() as unknown as ClerkCheckout;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ConfirmError | null>(null);

  const handleClick = async () => {
    setLoading(true);

    await checkout.updateEmail?.(shippingForm.email);
    await checkout.updateShippingAddress?.({
      name: "shipping_address",
      address: {
        line1: shippingForm.address,
        city: shippingForm.city,
        country: "LK",
      },
    });

    const res = await checkout.confirm();
    if (res.type === "error") {
      setError(res.error ?? null);
    }

    setLoading(false);
  };

  return (
    <form>
      <PaymentElement options={{ layout: "accordion" }} />
      <button disabled={loading} onClick={handleClick}>
        {loading ? "Loading..." : "Pay"}
      </button>
      {error && <div className="">{error.message}</div>}
    </form>
  );
};

export default CheckoutForm;
