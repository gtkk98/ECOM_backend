import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, PackageCheck, ReceiptText, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "My orders",
  description:
    "Track recent food orders, delivery status, and order details for your ChowUp account.",
};

type Order = {
  _id: string;
  amount: number;
  status: "success" | "failed";
  products: { name: string; quantity: number; price: number }[];
  createdAt: string;
};

const statusClasses: Record<Order["status"], string> = {
  success: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-600/20",
  failed: "bg-red-500/10 text-red-700 ring-1 ring-red-600/20",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

const OrdersPage = async () => {
  const { userId, getToken } = await auth();

  if (!userId) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-foreground">Sign in to view your orders</h1>
        <p className="mt-3 text-(--muted)">Your order history is available after you sign in.</p>
      </main>
    );
  }

  const token = await getToken();
  if (!token) {
    throw new Error("Unable to get an authentication token for the order service.");
  }

  const orderServiceUrl = (process.env.ORDER_SERVICE_URL ?? "http://localhost:8001").replace(
    /\/+$/,
    "",
  );
  let orders: Order[] = [];
  let loadError: string | null = null;

  try {
    const response = await fetch(`${orderServiceUrl}/user-orders`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      loadError = `Order service returned ${response.status}. Please try again later.`;
    } else {
      const result: unknown = await response.json();
      if (!Array.isArray(result)) {
        throw new Error("Order service returned an invalid order list.");
      }
      orders = result;
    }
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : "Unable to load orders from the order service.";
  }

  const successfulOrders = orders.filter((order) => order.status === "success");
  const totalSpent = successfulOrders.reduce((total, order) => total + order.amount, 0);
  const summary = [
    { label: "Total orders", value: String(orders.length), icon: ReceiptText },
    { label: "Successful", value: String(successfulOrders.length), icon: PackageCheck },
    { label: "Total spent", value: formatCurrency(totalSpent), icon: Truck },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-5 border-b border-(--line) pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand)">Account</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">My orders</h1>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 self-start rounded-md bg-(--brand) px-4 py-2.5 text-sm font-semibold text-(--on-brand) transition-colors hover:bg-(--brand-dark)"
        >
          Order again
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {loadError ? (
        <p role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-800">
          {loadError}
        </p>
      ) : (
        <>
          <section className="mb-8 grid gap-4 md:grid-cols-3">
            {summary.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl border border-(--line) bg-(--surface) p-5 shadow-[0_10px_30px_rgb(17_24_39/04)]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-(--surface-tint) text-(--brand)">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm text-(--muted)">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </section>

          <section className="rounded-2xl border border-(--line) bg-(--surface) p-4 shadow-[0_10px_30px_rgb(17_24_39/04)] sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Recent orders</h2>
                <p className="text-sm text-(--muted)">Your order history from ChowUp.</p>
              </div>
              <span className="rounded-full border border-(--line) bg-(--surface-muted) px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-(--muted)">
                {orders.length} orders
              </span>
            </div>

            {orders.length === 0 ? (
              <p className="rounded-xl bg-(--surface-muted) p-6 text-center text-(--muted)">
                You don&apos;t have any orders yet.
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <article
                    key={order._id}
                    className="rounded-xl border border-(--line) bg-(--surface-muted) p-4 md:p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <p className="text-lg font-semibold text-foreground">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </p>
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[order.status]}`}
                          >
                            {order.status === "success" ? "Successful" : "Failed"}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-(--muted)">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            dateStyle: "medium",
                          })}
                        </p>
                      </div>
                      <p className="text-xl font-semibold text-foreground">
                        {formatCurrency(order.amount)}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 border-t border-(--line) pt-4">
                      {order.products.map((product, index) => (
                        <span
                          key={`${order._id}-${product.name}-${index}`}
                          className="rounded-full border border-(--line) bg-white/50 px-2.5 py-1 text-xs font-medium text-(--brand-dark)"
                        >
                          {product.name} × {product.quantity}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default OrdersPage;
