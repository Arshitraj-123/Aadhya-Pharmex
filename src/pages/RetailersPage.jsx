import { useState } from 'react';
import { B } from '../theme.js';
import { PageHeader, KPICard, Card, SearchInput, DataTable, StatusBadge } from '../components/ui.jsx';
import { RETAILERS } from '../mockData.js';

export function RetailersPage({ showModal }) {
    const [search, setSearch] = useState("");
    const filtered = RETAILERS.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) || r.city.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div>
            <PageHeader title="Retailer management" subtitle="KYC · credit limits · Drug License tracking · 400+ partners" action="Add retailer" onAction={showModal} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginBottom: 14 }}>
                <KPICard icon="ti-building-store" label="Active retailers" value="412" sub="14 districts" accent={B.navy} />
                <KPICard icon="ti-currency-rupee" label="Total outstanding" value="₹18.4L" sub="All accounts" accent={B.red} subColor={B.red} />
                <KPICard icon="ti-file-alert" label="License expiring" value="8" sub="Within 60 days" accent={B.amber} subColor={B.amber} />
                <KPICard icon="ti-ban" label="Credit hold" value="3" sub="Orders blocked" accent={B.red} subColor={B.red} />
            </div>
            <Card>
                <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                    <SearchInput value={search} onChange={setSearch} placeholder="Search by name or city…" />
                    <button style={{ padding: "6px 12px", border: `1px solid ${B.border}`, borderRadius: 8, background: B.white, fontSize: 11, color: B.textSecondary, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
                        <i className="ti ti-download" style={{ fontSize: 12 }} aria-hidden="true" /> Export
                    </button>
                </div>
                <DataTable
                    headers={["ID", "Retailer", "City", "Drug License", "Lic. expiry", "Outstanding", "Credit limit", "Tier", "Status", "Actions"]}
                    rows={filtered.map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${B.border}`, background: i % 2 === 0 ? B.white : B.surface }}>
                            <td style={{ padding: "9px 10px", color: B.textMuted, fontSize: 11 }}>{r.id}</td>
                            <td style={{ padding: "9px 10px", fontWeight: 500 }}>{r.name}</td>
                            <td style={{ padding: "9px 10px", color: B.textSecondary }}>{r.city}</td>
                            <td style={{ padding: "9px 10px", fontFamily: "monospace", fontSize: 11, color: B.textSecondary }}>{r.license}</td>
                            <td style={{ padding: "9px 10px", color: (r.licenseExpiry === "Jun 2026" || r.licenseExpiry === "Jul 2026") ? B.red : B.textSecondary }}>{r.licenseExpiry}</td>
                            <td style={{ padding: "9px 10px", fontWeight: 500, color: r.outstanding === "₹0" ? B.green : B.textPrimary }}>{r.outstanding}</td>
                            <td style={{ padding: "9px 10px", color: B.textSecondary }}>{r.credit}</td>
                            <td style={{ padding: "9px 10px" }}><StatusBadge status={r.tier} /></td>
                            <td style={{ padding: "9px 10px" }}><StatusBadge status={r.status} /></td>
                            <td style={{ padding: "9px 10px" }}>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <i className="ti ti-eye" style={{ fontSize: 15, color: B.navyMid, cursor: "pointer" }} aria-label="View" />
                                    <i className="ti-file-text" style={{ fontSize: 15, color: B.textSecondary, cursor: "pointer" }} aria-label="Statement" />
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
