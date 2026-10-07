import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  PackageCheck,
  ReceiptText,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "My orders",
  description: "Track recent food orders, delivery status, and order details for your ChowUp account.",
};

const orders = [
  {
    id: "#1042",
    date: "May 18, 2026",
    total: 52.38,
    status: "Delivered",
    eta: "Delivered at 7:42 PM",
    location: "Downtown, Seattle",
    items: ["Pepperoni Pizza", "Crispy Fries", "House Soda"],
  },
  {
    id: "#1038",
    date: "May 12, 2026",
    total: 26.95,
    status: "In transit",
    eta: "Arrives by 6:20 PM",
    location: "Capitol Hill, Seattle",
    items: ["Mushroom Fettuccine", "Garlic Bread"],
  },
  {
    id: "#1031",
    date: "May 08, 2026",
    total: 41.79,
    status: "Preparing",
    eta: "Kitchen is finishing your order",
    location: "Queen Anne, Seattle",
    items: ["Double Cheeseburger", "Coke", "Brownie"],
  },
];

const summary = [
  { label: "Total spent", value: "$418.24", icon: ReceiptText },
  { label: "Waiting on", value: "1 order", icon: Truck },
  { label: "Delivered", value: "8 this month", icon: PackageCheck },
];

const statusClasses: Record<string, string> = {
  Delivered: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-600/20",
  "In transit": "bg-amber-500/10 text-amber-700 ring-1 ring-amber-600/20",
  Preparing: "bg-blue-500/10 text-blue-700 ring-1 ring-blue-600/20",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

const OrdersPage = () => {
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
            <p className="text-sm text-(--muted)">Track what you ordered and when it was delivered.</p>
          </div>
          <span className="rounded-full border border-(--line) bg-(--surface-muted) px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-(--muted)">
            {orders.length} orders
          </span>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-xl border border-(--line) bg-(--surface-muted) p-4 md:p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-semibold text-foreground">{order.id}</p>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-(--muted)">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4" />
                      {order.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {order.location}
                    </span>
                  </div>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-sm text-(--muted)">{order.eta}</p>
                  <p className="mt-1 text-xl font-semibold text-foreground">{formatCurrency(order.total)}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-4 border-t border-(--line) pt-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item) => (
                    <span
                      key={`${order.id}-${item}`}
                      className="rounded-full border border-(--line) bg-white/50 px-2.5 py-1 text-xs font-medium text-(--brand-dark)"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-(--line) px-3.5 py-2 text-sm font-medium text-(--brand-dark) transition-colors hover:bg-(--surface-tint)"
                >
                  View details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default OrdersPage;
