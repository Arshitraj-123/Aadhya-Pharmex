import { useState } from 'react';
import { B } from '../theme.js';
import { PageHeader, KPICard, Card, FilterChips, DataTable, StatusBadge } from '../components/ui.jsx';
import { ProgressBar } from '../components/charts.jsx';
import { SCHEMES } from '../mockData.js';

export function SchemesPage({ showModal }) {
    const [filter, setFilter] = useState("All");
    const statuses = ["All", "Active", "Expiring", "Expired"];
    const filtered = filter === "All" ? SCHEMES : SCHEMES.filter(s => s.status === filter);
    return (
        <div>
            <PageHeader title="Scheme management" subtitle="Company promotions · free goods · margin tracking" action="Add scheme" onAction={showModal} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginBottom: 14 }}>
                <KPICard icon="ti-tag" label="Active schemes" value="5" sub="From 5 companies" accent={B.navy} />
                <KPICard icon="ti-alert-circle" label="Expiring < 30 days" value="2" sub="Take action" accent={B.amber} subColor={B.amber} />
                <KPICard icon="ti-currency-rupee" label="Scheme benefit MTD" value="₹24,800" sub="Passed on to retailers" accent={B.green} subColor={B.green} />
                <KPICard icon="ti-x" label="Expired schemes" value="1" sub="Last 30 days" accent={B.red} subColor={B.red} />
            </div>
            <Card>
                <FilterChips options={statuses} active={filter} onChange={setFilter} />
                <DataTable
                    headers={["Scheme ID", "Company", "Product / Range", "Scheme type", "Valid until", "Utilised", "Status", "Actions"]}
                    rows={filtered.map((s, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${B.border}`, background: i % 2 === 0 ? B.white : B.surface }}>
                            <td style={{ padding: "9px 10px", color: B.navyMid, fontWeight: 500 }}>{s.id}</td>
                            <td style={{ padding: "9px 10px", fontWeight: 500 }}>{s.company}</td>
                            <td style={{ padding: "9px 10px", color: B.textSecondary }}>{s.product}</td>
                            <td style={{ padding: "9px 10px" }}>
                                <span style={{ background: B.navyLight, color: B.navy, fontSize: 11, padding: "2px 7px", borderRadius: 20, fontWeight: 500 }}>{s.type}</span>
                            </td>
                            <td style={{ padding: "9px 10px", color: s.status === "Expired" ? B.red : s.status === "Expiring" ? B.amber : B.textSecondary }}>{s.valid}</td>
                            <td style={{ padding: "9px 10px", minWidth: 100 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <ProgressBar value={parseInt(s.utilised)} />
                                    <span style={{ fontSize: 11, color: B.textSecondary, whiteSpace: "nowrap" }}>{s.utilised}</span>
                                </div>
                            </td>
                            <td style={{ padding: "9px 10px" }}><StatusBadge status={s.status} /></td>
                            <td style={{ padding: "9px 10px" }}>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <i className="ti ti-eye" style={{ fontSize: 15, color: B.navyMid, cursor: "pointer" }} aria-label="View" />
                                    <i className="ti ti-edit" style={{ fontSize: 15, color: B.textSecondary, cursor: "pointer" }} aria-label="Edit" />
                                </div>
                            </td>
                        </tr>
                    ))}
                />
            </Card>
        </div>
    );
}
