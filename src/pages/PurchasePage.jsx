import { useState } from 'react';
import { B } from '../theme.js';
import { PageHeader, KPICard, Card, FilterChips, DataTable, StatusBadge } from '../components/ui.jsx';
import { PURCHASES } from '../mockData.js';

export function PurchasePage() {
    const [filter, setFilter] = useState("All");
    const statuses = ["All", "Pending", "In Transit", "GRN Done"];
    const filtered = filter === "All" ? PURCHASES : PURCHASES.filter(p => p.status === filter);
    return (
        <div>
            <PageHeader title="Purchase / GRN" subtitle="Supplier orders · goods receipt · ITC register" action="New purchase order" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginBottom: 14 }}>
                <KPICard icon="ti-clipboard-list" label="Open POs" value="3" sub="₹1.63L pending GRN" accent={B.amber} subColor={B.amber} />
                <KPICard icon="ti-currency-rupee" label="Payable this month" value="₹2.49L" sub="To 4 suppliers" accent={B.navy} />
                <KPICard icon="ti-check" label="GRN completed" value="3" sub="This month" accent={B.green} subColor={B.green} />
                <KPICard icon="ti-file-invoice" label="ITC claimed (MTD)" value="₹18,200" sub="Input Tax Credit" accent={B.purple} />
            </div>
            <Card>
                <FilterChips options={statuses} active={filter} onChange={setFilter} />
                <DataTable
                    headers={["PO no.", "Company", "Date", "Items", "PO value", "Status", "Payment", "Actions"]}
                    rows={filtered.map((p, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${B.border}`, background: i % 2 === 0 ? B.white : B.surface }}>
                            <td style={{ padding: "9px 10px", color: B.navyMid, fontWeight: 500 }}>{p.id}</td>
                            <td style={{ padding: "9px 10px", fontWeight: 500 }}>{p.company}</td>
                            <td style={{ padding: "9px 10px", color: B.textSecondary }}>{p.date}</td>
                            <td style={{ padding: "9px 10px", color: B.textSecondary }}>{p.items}</td>
                            <td style={{ padding: "9px 10px", fontWeight: 500 }}>{p.value}</td>
                            <td style={{ padding: "9px 10px" }}><StatusBadge status={p.status} /></td>
                            <td style={{ padding: "9px 10px", color: p.payment === "Paid" ? B.green : B.textSecondary, fontWeight: p.payment === "Paid" ? 500 : 400 }}>{p.payment}</td>
                            <td style={{ padding: "9px 10px" }}>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <i className="ti ti-eye" style={{ fontSize: 15, color: B.navyMid, cursor: "pointer" }} aria-label="View" />
                                    <i className="ti ti-edit" style={{ fontSize: 15, color: B.textSecondary, cursor: "pointer" }} aria-label="GRN" />
                                    <i className="ti ti-download" style={{ fontSize: 15, color: B.textSecondary, cursor: "pointer" }} aria-label="Download" />
                                </div>
                            </td>
                        </tr>
                    ))}
                />
            </Card>
        </div>
    );
}
