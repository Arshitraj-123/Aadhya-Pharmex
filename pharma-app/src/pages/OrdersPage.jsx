import { useState } from 'react';
import { B } from '../theme.js';
import { PageHeader, KPICard, Card, SearchInput, FilterChips, DataTable, StatusBadge } from '../components/ui.jsx';
import { ORDERS } from '../mockData.js';

export function OrdersPage({ showModal }) {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const statuses = ["All", "Pending", "Confirmed", "Dispatched", "Delivered", "Cancelled"];
    const filtered = ORDERS.filter(o =>
        (filter === "All" || o.status === filter) &&
        (o.retailer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()))
    );
    return (
        <div>
            <PageHeader title="Order management" subtitle="Manage and track all retailer orders" action="New order" onAction={showModal} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginBottom: 14 }}>
                <KPICard icon="ti-shopping-cart" label="Orders today" value="38" sub="₹1.24L value" accent={B.navy} />
                <KPICard icon="ti-clock" label="Pending" value="12" sub="4 urgent" accent={B.amber} subColor={B.amber} />
                <KPICard icon="ti-check" label="Delivered today" value="21" sub="98% on-time" accent={B.green} subColor={B.green} />
                <KPICard icon="ti-x" label="Cancelled" value="3" sub="₹9,120 lost" accent={B.red} subColor={B.red} />
            </div>
            <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 10, flexWrap: "wrap" }}>
                    <SearchInput value={search} onChange={setSearch} placeholder="Search by order ID or retailer…" />
                    <button onClick={showModal} style={{ padding: "6px 12px", border: `1px solid ${B.border}`, borderRadius: 8, background: B.white, fontSize: 11, color: B.textSecondary, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
                        <i className="ti ti-download" style={{ fontSize: 12 }} aria-hidden="true" /> Export
                    </button>
                </div>
                <FilterChips options={statuses} active={filter} onChange={setFilter} />
                <DataTable
                    headers={["Order ID", "Retailer", "City", "Items", "Value", "Payment", "Status", "Date", "Actions"]}
                    emptyText="No orders match the current filter"
                    rows={filtered.map((o, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${B.border}`, background: i % 2 === 0 ? B.white : B.surface }}>
                            <td style={{ padding: "9px 10px", color: B.navyMid, fontWeight: 500 }}>{o.id}</td>
                            <td style={{ padding: "9px 10px", fontWeight: 500 }}>{o.retailer}</td>
                            <td style={{ padding: "9px 10px", color: B.textSecondary }}>{o.city}</td>
                            <td style={{ padding: "9px 10px", color: B.textSecondary }}>{o.items}</td>
                            <td style={{ padding: "9px 10px", fontWeight: 500 }}>{o.value}</td>
                            <td style={{ padding: "9px 10px", color: B.textSecondary }}>{o.payment}</td>
                            <td style={{ padding: "9px 10px" }}><StatusBadge status={o.status} /></td>
                            <td style={{ padding: "9px 10px", color: B.textSecondary }}>{o.date}</td>
                            <td style={{ padding: "9px 10px" }}>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <i className="ti ti-eye" style={{ fontSize: 15, color: B.navyMid, cursor: "pointer" }} aria-label="View" />
                                    <i className="ti ti-edit" style={{ fontSize: 15, color: B.textSecondary, cursor: "pointer" }} aria-label="Edit" />
                                    <i className="ti ti-printer" style={{ fontSize: 15, color: B.textSecondary, cursor: "pointer" }} aria-label="Print" />
                                </div>
                            </td>
                        </tr>
                    ))}
                />
            </Card>
        </div>
    );
}
