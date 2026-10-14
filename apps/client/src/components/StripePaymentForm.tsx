"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  CheckoutElementsProvider,
  PaymentElement,
  useCheckoutElements,
} from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "@clerk/nextjs";
import type { ShippingFormInputs } from "@repo/types";

const stripe = loadStripe(
  "pk_test_51UPbKZLHDT2yyAXkCdpS6VlAicDcRR3qZjifxQt6cukJqPJ4NwFjmkVblQkbVso6aR0VJOr0qgwhx2HcTZnmlby000W0vfWOhf",
);

const CheckoutPaymentForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const result = useCheckoutElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (result.type !== "success") {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const confirmResult = await result.checkout.confirm({
        email: shippingForm.email,
        phoneNumber: shippingForm.phone,
        shippingAddress: {
          name: shippingForm.name,
          address: {
            line1: shippingForm.address,
            city: shippingForm.city,
            country: "LK",
          },
        },
      });

      if (confirmResult.type === "error") {
        setErrorMessage(confirmResult.error.message);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while confirming payment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result.type === "loading") {
    return <p>Loading payment form...</p>;
  }

  if (result.type === "error") {
    return <p role="alert">{result.error.message}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <PaymentElement
        options={{ layout: "accordion", paymentMethodOrder: ["card"] }}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center rounded-lg bg-(--brand) p-2 text-(--on-brand) transition-colors hover:bg-(--brand-dark) disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Processing..." : "Pay"}
      </button>
      {errorMessage && (
        <p role="alert" className="text-sm text-red-600">
          {errorMessage}
        </p>
      )}
    </form>
  );
};

const fetchClientSecret = async (token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  );

  const contentType = response.headers.get("content-type") ?? "";
  const body: unknown = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof body.message === "string"
        ? body.message
        : typeof body === "string" && body
          ? body
          : `Unable to create checkout session (${response.status}).`;
    throw new Error(message);
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("clientSecret" in body) ||
    typeof body.clientSecret !== "string"
  ) {
    throw new Error("The payment service returned an invalid checkout session.");
  }

  return body.clientSecret;
};

const StripePaymentForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    let cancelled = false;

    const loadClientSecret = async () => {
      try {
        const token = await getToken();

        if (!token) {
          throw new Error("Sign in to continue to payment.");
        }

        const secret = await fetchClientSecret(token);
        if (!cancelled) {
          setClientSecret(secret);
        }
      } catch (checkoutError) {
        if (!cancelled) {
          setError(
            checkoutError instanceof Error
              ? checkoutError.message
              : "Unable to initialize checkout.",
          );
        }
      }
    };

    void loadClientSecret();

    return () => {
      cancelled = true;
    };
  }, [getToken]);

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (!clientSecret) {
    return <div className="">Loading...</div>;
  }

  return (
    <CheckoutElementsProvider stripe={stripe} options={{ clientSecret }}>
      <CheckoutPaymentForm shippingForm={shippingForm} />
    </CheckoutElementsProvider>
  );
};

export default StripePaymentForm;
