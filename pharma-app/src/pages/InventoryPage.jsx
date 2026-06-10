import { useState } from 'react';
import { B } from '../theme.js';
import { PageHeader, KPICard, Card, SearchInput, FilterChips, DataTable, StatusBadge } from '../components/ui.jsx';
import { INVENTORY } from '../mockData.js';

export function InventoryPage({ showModal }) {
    const [search, setSearch] = useState("");
    const [schedFilter, setSchedFilter] = useState("All");
    const scheds = ["All", "OTC", "H", "H1", "X"];
    const filtered = INVENTORY.filter(p =>
        (schedFilter === "All" || p.schedule === schedFilter) &&
        (p.name.toLowerCase().includes(search.toLowerCase()) || p.company.toLowerCase().includes(search.toLowerCase()) || p.batch.toLowerCase().includes(search.toLowerCase()))
    );
    return (
        <div>
            <PageHeader title="Inventory" subtitle="Batch-level stock · FEFO allocation · expiry tracking" action="Add stock / GRN" onAction={showModal} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginBottom: 14 }}>
                <KPICard icon="ti-package" label="Total SKUs" value="8,247" sub="in active stock" accent={B.navy} />
                <KPICard icon="ti-alert-circle" label="Expiring < 30 days" value="4" sub="Immediate action" accent={B.red} subColor={B.red} />
                <KPICard icon="ti-clock" label="Expiring < 60 days" value="14" sub="Plan returns" accent={B.amber} subColor={B.amber} />
                <KPICard icon="ti-arrow-down" label="Below reorder level" value="12" sub="Auto-PO for 8" accent={B.amber} subColor={B.amber} />
            </div>
            <Card>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
                    <SearchInput value={search} onChange={setSearch} placeholder="Search product, company, or batch no…" />
                    <button style={{ padding: "6px 12px", border: `1px solid ${B.border}`, borderRadius: 8, background: B.white, fontSize: 11, color: B.textSecondary, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
                        <i className="ti ti-download" style={{ fontSize: 12 }} aria-hidden="true" /> Export
                    </button>
                </div>
                <FilterChips options={scheds} active={schedFilter} onChange={setSchedFilter} />
                <DataTable
                    headers={["SKU", "Product name", "Company", "Batch no.", "Stock", "Expiry", "Schedule", "Status", "Rack", "Actions"]}
                    rows={filtered.map((p, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${B.border}`, background: p.status === "Expiring" ? "#FFF8F8" : i % 2 === 0 ? B.white : B.surface }}>
                            <td style={{ padding: "8px 10px", color: B.textMuted, fontSize: 11 }}>{p.id}</td>
                            <td style={{ padding: "8px 10px", fontWeight: 500 }}>{p.name}</td>
                            <td style={{ padding: "8px 10px", color: B.textSecondary }}>{p.company}</td>
                            <td style={{ padding: "8px 10px", fontFamily: "monospace", fontSize: 11, color: B.textSecondary }}>{p.batch}</td>
                            <td style={{ padding: "8px 10px", fontWeight: 500, color: p.stock < 50 ? B.red : B.textPrimary }}>{p.stock.toLocaleString()}</td>
                            <td style={{ padding: "8px 10px", color: p.expiry.includes("Jun 2026") ? B.red : B.textSecondary }}>{p.expiry}</td>
                            <td style={{ padding: "8px 10px" }}><StatusBadge status={p.schedule} /></td>
                            <td style={{ padding: "8px 10px" }}><StatusBadge status={p.status} /></td>
                            <td style={{ padding: "8px 10px", color: B.textMuted, fontFamily: "monospace", fontSize: 11 }}>{p.rack}</td>
                            <td style={{ padding: "8px 10px" }}>
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
