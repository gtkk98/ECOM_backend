"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { shippingFormSchema, type ShippingFormInputs } from "@/types";

const ShippingForm = ({
    onSubmit,
}: {
    onSubmit: (values: ShippingFormInputs) => void;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShippingFormInputs>({
        resolver: zodResolver(shippingFormSchema),
    });

    const fieldClassName =
        "w-full rounded-md border border-(--line) bg-(--surface) px-3 py-2 text-foreground outline-none focus:border-(--brand) focus:ring-2 focus:ring-(--focus)";

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
            <h2 className="text-lg font-semibold">Shipping Address</h2>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                    <label htmlFor="shipping-name" className="text-sm font-medium">Full name</label>
                    <input id="shipping-name" autoComplete="name" {...register("name")} className={fieldClassName} />
                    {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="shipping-email" className="text-sm font-medium">Email</label>
                    <input id="shipping-email" type="email" autoComplete="email" {...register("email")} className={fieldClassName} />
                    {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="shipping-phone" className="text-sm font-medium">Phone</label>
                    <input id="shipping-phone" type="tel" inputMode="numeric" autoComplete="tel" {...register("phone")} className={fieldClassName} />
                    {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="shipping-city" className="text-sm font-medium">City</label>
                    <input id="shipping-city" autoComplete="address-level2" {...register("city")} className={fieldClassName} />
                    {errors.city && <p className="text-sm text-red-600">{errors.city.message}</p>}
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                    <label htmlFor="shipping-address" className="text-sm font-medium">Street address</label>
                    <textarea id="shipping-address" autoComplete="street-address" rows={3} {...register("address")} className={fieldClassName} />
                    {errors.address && <p className="text-sm text-red-600">{errors.address.message}</p>}
                </div>
            </div>

            <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-(--brand) p-2 text-(--on-brand) transition-colors hover:bg-(--brand-dark)"
            >
                Continue to payment
            </button>
        </form>
    );
};

export default ShippingForm