"use client";

import { useMemo, useState } from "react";
import AddCategory from "./AddCategory";
import AddOrder from "./AddOrder";
import AddProduct from "./AddProduct";
import AddUser from "./AddUser";
import AppAreaChart from "./AppAreaChart";
import AppBarChart from "./AppBarChart";
import AppLineChart from "./AppLineChart";
import AppPieChart from "./AppPieChart";
import AppSidebar from "./AppSidebar";
import CardList from "./CardList";
import EditUser from "./EditUser";
import Icon from "./Icon";
import Navbar from "./Navbar";
import Panel from "./Panel";
import TablePagination from "./TablePagination";
import TodoList from "./TodoList";
import { Button } from "./ui/button";
import type { Customer, DialogKind, FormValues, Order, Product, Section, Todo } from "./adminTypes";

const initialOrders: Order[] = [
  { id: "#CU-1048", customer: "Olivia Rhye", email: "olivia.rhye@gmail.com", date: "Oct 24, 2024", amount: 124, status: "Delivered" },
  { id: "#CU-1047", customer: "Phoenix Baker", email: "phoenix.baker@gmail.com", date: "Oct 24, 2024", amount: 78.5, status: "Processing" },
  { id: "#CU-1046", customer: "Lana Steiner", email: "lana.steiner@gmail.com", date: "Oct 23, 2024", amount: 56, status: "Delivered" },
  { id: "#CU-1045", customer: "Demi Wilkinson", email: "demi.wilkinson@gmail.com", date: "Oct 23, 2024", amount: 212, status: "Cancelled" },
  { id: "#CU-1044", customer: "Candice Wu", email: "candice.wu@gmail.com", date: "Oct 22, 2024", amount: 95.25, status: "Delivered" },
  { id: "#CU-1043", customer: "Natali Craig", email: "natali.craig@gmail.com", date: "Oct 22, 2024", amount: 43, status: "Processing" },
  { id: "#CU-1042", customer: "Drew Cano", email: "drew.cano@gmail.com", date: "Oct 21, 2024", amount: 165, status: "Delivered" },
  { id: "#CU-1041", customer: "Orlando Diggs", email: "orlando.diggs@gmail.com", date: "Oct 20, 2024", amount: 87.5, status: "Delivered" },
];
const initialProducts: Product[] = [
  { name: "Classic Smash Burger", category: "Burgers", price: 14.5, stock: 42, status: "In stock", image: "🍔" },
  { name: "Margherita Pizza", category: "Pizza", price: 18, stock: 6, status: "Low stock", image: "🍕" },
  { name: "Truffle Parmesan Fries", category: "Sides", price: 8.5, stock: 28, status: "In stock", image: "🍟" },
  { name: "Chocolate Lava Cake", category: "Desserts", price: 9, stock: 0, status: "Out of stock", image: "🍰" },
  { name: "Garden Pesto Pasta", category: "Pasta", price: 16, stock: 19, status: "In stock", image: "🍝" },
  { name: "Iced Matcha Latte", category: "Drinks", price: 6.5, stock: 11, status: "In stock", image: "🍵" },
];
const initialCustomers: Customer[] = [
  { name: "Olivia Rhye", email: "olivia.rhye@gmail.com", joined: "Oct 12, 2024", orders: 12, spent: 840, initials: "OR", color: "lilac" },
  { name: "Phoenix Baker", email: "phoenix.baker@gmail.com", joined: "Oct 09, 2024", orders: 8, spent: 612, initials: "PB", color: "peach" },
  { name: "Lana Steiner", email: "lana.steiner@gmail.com", joined: "Oct 04, 2024", orders: 6, spent: 458, initials: "LS", color: "mint" },
  { name: "Demi Wilkinson", email: "demi.wilkinson@gmail.com", joined: "Sep 29, 2024", orders: 15, spent: 1250, initials: "DW", color: "blue" },
  { name: "Candice Wu", email: "candice.wu@gmail.com", joined: "Sep 22, 2024", orders: 4, spent: 276, initials: "CW", color: "pink" },
  { name: "Natali Craig", email: "natali.craig@gmail.com", joined: "Sep 15, 2024", orders: 9, spent: 720, initials: "NC", color: "yellow" },
];
const initialTodos: Todo[] = [
  { text: "Review new catering inquiry", done: false },
  { text: "Restock Margherita pizza ingredients", done: false },
  { text: "Update weekend opening hours", done: true },
  { text: "Approve supplier invoice", done: false },
];
const initialCategories = ["Burgers", "Pizza", "Pasta", "Sides", "Desserts", "Drinks"];
const money = (value: number) => `$${value.toFixed(2)}`;

function Status({ value }: { value: Order["status"] | Product["status"] }) {
  return <span className={`status-badge status-${value.toLowerCase().replaceAll(" ", "-")}`}><i />{value}</span>;
}

function PageHeading({ title, description, action, onAction }: { title: string; description: string; action: string; onAction: () => void }) {
  return <div className="page-heading"><div><span className="eyebrow">CHOWUP / {title.toUpperCase()}</span><h1>{title}</h1><p>{description}</p></div>
    <Button className="button-primary" onClick={onAction}><Icon name="plus" size={16} />{action}</Button>
  </div>;
}

function OrdersTable({ orders, search, onStatus }: { orders: Order[]; search: string; onStatus: (id: string, status: Order["status"]) => void }) {
  const [page, setPage] = useState(1);
  const rows = orders.filter((order) => `${order.id} ${order.customer} ${order.email} ${order.status}`.toLowerCase().includes(search.toLowerCase()));
  const pages = Math.max(1, Math.ceil(rows.length / 5));
  const activePage = Math.min(page, pages);
  const visible = rows.slice((activePage - 1) * 5, activePage * 5);
  return <Panel className="orders-panel"><div className="panel-heading"><div><h2>Recent orders</h2><p>Keep track of your latest transactions.</p></div><button className="text-button">View all <Icon name="arrow" size={14} /></button></div>
    <div className="table-scroll"><table><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>DATE</th><th>AMOUNT</th><th>STATUS</th></tr></thead><tbody>
      {visible.map((order) => <tr key={order.id}><td className="order-id">{order.id}</td><td><div className="customer-cell"><span className="avatar avatar-lilac">{order.customer.split(" ").map((part) => part[0]).join("")}</span><span><strong>{order.customer}</strong><small>{order.email}</small></span></div></td><td>{order.date}</td><td className="amount-cell">{money(order.amount)}</td><td><select aria-label={`Status for ${order.id}`} className={`status-select status-${order.status.toLowerCase()}`} value={order.status} onChange={(event) => onStatus(order.id, event.target.value as Order["status"])}><option>Delivered</option><option>Processing</option><option>Cancelled</option></select></td></tr>)}
      {!visible.length && <tr><td colSpan={5} className="empty-state">No orders match your search.</td></tr>}
    </tbody></table></div><TablePagination page={activePage} totalPages={pages} onPage={setPage} />
  </Panel>;
}

function EntityDialog({ kind, onClose, onSave, customers, customer }: {
  kind: Exclude<DialogKind, null>;
  onClose: () => void;
  onSave: (values: FormValues) => void;
  customers: Customer[];
  customer?: Customer;
}) {
  const titles: Record<Exclude<DialogKind, null>, string> = { product: "Add a product", order: "Create an order", user: "Add a customer", category: "Add a category", "edit-user": "Edit customer" };
  const forms = {
    product: <AddProduct onSave={onSave} onCancel={onClose} />,
    order: <AddOrder onSave={onSave} onCancel={onClose} customers={customers} />,
    user: <AddUser onSave={onSave} onCancel={onClose} />,
    category: <AddCategory onSave={onSave} onCancel={onClose} />,
  };
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-header"><div><span className="modal-eyebrow">CHOWUP STORE</span><h2 id="modal-title">{titles[kind]}</h2></div><button className="icon-button" aria-label="Close dialog" onClick={onClose}><Icon name="close" /></button></div>
      {kind === "edit-user" ? customer && <EditUser customer={customer} onSave={onSave} onCancel={onClose} /> : forms[kind]}
    </section>
  </div>;
}

export default function AdminDashboard({ initialSection = "Overview" }: { initialSection?: Section }) {
  const [active, setActive] = useState<Section>(initialSection);
  const [dialog, setDialog] = useState<DialogKind>(null);
  const [customers, setCustomers] = useState(initialCustomers);
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [categories, setCategories] = useState(initialCategories);
  const [todos, setTodos] = useState(initialTodos);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer>();
  const orderTotals = useMemo(() => orders.reduce((counts, order) => ({ ...counts, [order.status]: counts[order.status] + 1 }), { Delivered: 0, Processing: 0, Cancelled: 0 }), [orders]);

  function saveEntity(values: FormValues) {
    if (dialog === "product") {
      const stock = Number(values.stock);
      const productName = String(values.name ?? "").trim() || "New product";
      const categoryName = String(values.category ?? "").trim() || "General";
      setProducts((items) => [{ name: productName, category: categoryName, price: Number(values.price), stock, status: stock === 0 ? "Out of stock" : stock < 10 ? "Low stock" : "In stock", image: values.image || "🍽️" }, ...items]);
      setActive("Products");
    } else if (dialog === "order") {
      const customer = customers.find((item) => item.name === values.customer);
      if (!customer) return;
      setOrders((items) => [{ id: `#CU-${1041 + items.length}`, customer: customer.name, email: customer.email, date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }), amount: Number(values.amount), status: values.status as Order["status"] }, ...items]);
      setActive("Orders");
    } else if (dialog === "category") {
      const categoryName = String(values.name ?? "").trim();
      if (!categoryName) return;
      setCategories((items) => items.includes(categoryName) ? items : [...items, categoryName]);
      setActive("Categories");
    } else if (dialog === "user") {
      const firstName = String(values.firstName ?? "").trim();
      const lastName = String(values.lastName ?? "").trim();
      const name = `${firstName} ${lastName}`.trim() || "New customer";
      const email = String(values.email ?? "").trim();
      setCustomers((items) => [{ name, email, joined: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }), orders: 0, spent: 0, initials: `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "NC", color: "lilac" }, ...items]);
      setActive("Customers");
    } else if (dialog === "edit-user" && editingCustomer) {
      const firstName = String(values.firstName ?? "").trim();
      const lastName = String(values.lastName ?? "").trim();
      const name = `${firstName} ${lastName}`.trim() || editingCustomer.name;
      const email = String(values.email ?? editingCustomer.email).trim();
      setCustomers((items) => items.map((item) => item.email === editingCustomer.email ? { ...item, name, email, initials: `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || item.initials } : item));
    }
    setDialog(null);
    setEditingCustomer(undefined);
  }

  function updateOrder(id: string, status: Order["status"]) {
    setOrders((items) => items.map((order) => order.id === id ? { ...order, status } : order));
  }

  function toggleTodo(index: number) {
    setTodos((items) => items.map((todo, i) => i === index ? { ...todo, done: !todo.done } : todo));
  }

  function showPage() {
    if (active === "Overview") return <>
      <div className="page-heading"><div><span className="eyebrow">TUESDAY, OCTOBER 29, 2024</span><h1>Good morning, Jamie <span className="greeting-wave">✳</span></h1><p>Here&apos;s what&apos;s happening with your store today.</p></div><button className="button-secondary date-button"><Icon name="calendar" size={16} />Oct 23 – Oct 29, 2024</button></div>
      <CardList /><div className="charts-grid"><AppAreaChart /><AppBarChart /></div>
      <div className="lower-grid"><OrdersTable orders={orders} search={search} onStatus={updateOrder} /><TodoList todos={todos} onToggle={toggleTodo} onAdd={(text) => setTodos((items) => [...items, { text, done: false }])} /></div>
      <div className="insight-strip"><span className="insight-icon">✦</span><div><strong>Your best day this week was Sunday!</strong><p>You earned 24% more than your daily average. Keep the momentum going.</p></div><button onClick={() => setActive("Analytics")}>View insights <Icon name="arrow" size={14} /></button></div>
    </>;
    if (active === "Products") return <>
      <PageHeading title="Products" description="Manage your menu, prices, and inventory." action="Add product" onAction={() => setDialog("product")} />
      <Panel className="data-panel"><div className="panel-heading"><div><h2>All products <span className="count-pill">{products.length}</span></h2><p>Manage your menu and inventory.</p></div></div><div className="table-scroll"><table><thead><tr><th>PRODUCT</th><th>CATEGORY</th><th>PRICE</th><th>STOCK</th><th>STATUS</th></tr></thead><tbody>
        {products.filter((item) => `${item.name} ${item.category} ${item.status}`.toLowerCase().includes(search.toLowerCase())).map((product) => <tr key={product.name}><td><div className="customer-cell"><span className="product-image img-lilac">{product.image}</span><strong>{product.name}</strong></div></td><td>{product.category}</td><td className="amount-cell">{money(product.price)}</td><td>{product.stock} units</td><td><Status value={product.status} /></td></tr>)}
      </tbody></table></div></Panel>
    </>;
    if (active === "Orders") return <>
      <PageHeading title="Orders" description="See what&apos;s cooking and keep every order moving." action="Create order" onAction={() => setDialog("order")} />
      <div className="stats-grid compact-stats">{(["Delivered", "Processing", "Cancelled"] as const).map((status) => <article className="stat-card" key={status}><span className="stat-title">{status}</span><strong className="stat-value">{orderTotals[status]}</strong><span className="stat-foot">Current orders</span></article>)}</div>
      <OrdersTable orders={orders} search={search} onStatus={updateOrder} />
    </>;
    if (active === "Customers") return <>
      <PageHeading title="Customers" description="Build lasting relationships with your regulars." action="Add customer" onAction={() => setDialog("user")} />
      <Panel className="data-panel"><div className="panel-heading"><div><h2>All customers <span className="count-pill">{customers.length}</span></h2><p>People who love your food.</p></div></div><div className="table-scroll"><table><thead><tr><th>CUSTOMER</th><th>DATE JOINED</th><th>ORDERS</th><th>TOTAL SPENT</th><th /></tr></thead><tbody>
        {customers.filter((item) => `${item.name} ${item.email}`.toLowerCase().includes(search.toLowerCase())).map((customer) => <tr key={customer.email}><td><div className="customer-cell"><span className={`avatar avatar-${customer.color}`}>{customer.initials}</span><span><strong>{customer.name}</strong><small>{customer.email}</small></span></div></td><td>{customer.joined}</td><td>{customer.orders}</td><td className="amount-cell">{money(customer.spent)}</td><td><button className="icon-button" aria-label={`Edit ${customer.name}`} onClick={() => { setEditingCustomer(customer); setDialog("edit-user"); }}><Icon name="dots" /></button></td></tr>)}
      </tbody></table></div></Panel>
    </>;
    if (active === "Categories") return <>
      <PageHeading title="Categories" description="Organize the menu so everyone finds their favorite." action="Add category" onAction={() => setDialog("category")} />
      <div className="category-grid">{categories.map((category, i) => <Panel className="category-card" key={category}><div className="category-card-top"><span className={`category-emoji ${["img-peach", "img-pink", "img-mint", "img-yellow", "img-lilac", "img-blue"][i % 6]}`}>{["🍔", "🍕", "🍝", "🍟", "🍰", "🥤"][i % 6]}</span></div><h2>{category}</h2><p>{products.filter((product) => product.category === category).length} products</p><span className="category-visible"><i />Active</span></Panel>)}</div>
    </>;
    if (active === "Analytics") return <>
      <PageHeading title="Analytics" description="A closer look at how your store is performing." action="Export report" onAction={() => window.alert("Your analytics report is ready to export.")} />
      <div className="charts-grid"><AppAreaChart /><AppBarChart /><AppLineChart /><AppPieChart /></div>
    </>;
    return <>
      <PageHeading title="Tasks" description="A little organization goes a long way." action="Add task" onAction={() => document.querySelector<HTMLInputElement>(".todo-add input")?.focus()} />
      <div className="task-page-grid"><TodoList todos={todos} onToggle={toggleTodo} onAdd={(text) => setTodos((items) => [...items, { text, done: false }])} />
        <Panel className="task-summary"><span className="task-summary-icon">✓</span><h2>You&apos;re making great progress</h2><p>{todos.filter((todo) => todo.done).length} of {todos.length} tasks completed. Keep it up!</p><div className="progress-track"><i style={{ width: `${todos.length ? todos.filter((todo) => todo.done).length / todos.length * 100 : 0}%` }} /></div></Panel>
      </div>
    </>;
  }

  return <div className="dashboard-shell">
    <AppSidebar active={active} onNavigate={setActive} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    <div className="main-column"><Navbar active={active} onMenu={() => setMobileOpen(true)} search={search} onSearch={setSearch} /><main className="main-content">{showPage()}
      <footer className="page-footer"><span>© 2024 ChowUp, Inc.</span><span>Made with <b>♥</b> for good food</span><button>Help &amp; support</button></footer>
    </main></div>
    {dialog && <EntityDialog kind={dialog} onClose={() => { setDialog(null); setEditingCustomer(undefined); }} onSave={saveEntity} customers={customers} customer={editingCustomer} />}
  </div>;
}
