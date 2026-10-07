"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import PaymentMethodIcons from "@/components/PaymentMethodIcons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const paymentSchema = z.object({
    cardholderName: z.string().trim().min(1, "Name on card is required"),
    cardNumber: z
        .string()
        .refine(
            (value) => /^\d{13,19}$/.test(value.replace(/\s/g, "")),
            "Enter 13 to 19 digits",
        ),
    expiration: z
        .string()
        .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format")
        .refine((value) => {
            const [month, year] = value.split("/").map(Number);
            const now = new Date();
            return new Date(2000 + year, month) > new Date(now.getFullYear(), now.getMonth());
        }, "Card has expired"),
    securityCode: z.string().regex(/^\d{3,4}$/, "Enter a 3 or 4 digit security code"),
});

type PaymentFormInputs = z.infer<typeof paymentSchema>;

const PaymentForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PaymentFormInputs>({ resolver: zodResolver(paymentSchema) });

    const fieldClassName =
        "w-full rounded-md border border-(--line) bg-(--surface) px-3 py-2 text-foreground outline-none focus:border-(--brand) focus:ring-2 focus:ring-(--focus)";

    if (submitted) {
        return (
            <div role="status" className="rounded-md border border-(--accent) bg-(--surface-tint) p-4 text-sm text-foreground">
                Demo payment details validated. No payment was processed. Connect a payment provider before accepting orders.
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(() => {
                reset();
                setSubmitted(true);
            })}
            noValidate
            className="flex flex-col gap-5"
        >
            <div>
                <h2 className="text-lg font-semibold">Payment Method</h2>
                <p className="mt-1 text-sm text-(--muted)">Pay by credit or debit card</p>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="cardholder-name" className="text-sm font-medium">Name on card</label>
                    <input
                        id="cardholder-name"
                        autoComplete="cc-name"
                        {...register("cardholderName")}
                        className={fieldClassName}
                    />
                    {errors.cardholderName && <p className="text-sm text-red-600">{errors.cardholderName.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="card-number" className="text-sm font-medium">Card number</label>
                    <input
                        id="card-number"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        {...register("cardNumber")}
                        className={fieldClassName}
                    />
                    {errors.cardNumber && <p className="text-sm text-red-600">{errors.cardNumber.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="card-expiration" className="text-sm font-medium">Expiration (MM/YY)</label>
                        <input
                            id="card-expiration"
                            placeholder="MM/YY"
                            inputMode="numeric"
                            autoComplete="cc-exp"
                            {...register("expiration")}
                            className={fieldClassName}
                        />
                        {errors.expiration && <p className="text-sm text-red-600">{errors.expiration.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="card-security-code" className="text-sm font-medium">Security code</label>
                        <input
                            id="card-security-code"
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            {...register("securityCode")}
                            className={fieldClassName}
                        />
                        {errors.securityCode && <p className="text-sm text-red-600">{errors.securityCode.message}</p>}
                    </div>
                </div>
            </div>

            <PaymentMethodIcons />

            <button
                type="submit"
                className="w-full rounded-lg bg-(--brand) p-2 text-(--on-brand) transition-colors hover:bg-(--brand-dark)"
            >
                Checkout
            </button>
            <p className="text-xs text-(--muted)">
                Demo only. Card details are not saved and no payment is taken.
            </p>
        </form>
    );
};

export default PaymentForm