import { useState } from 'react';
import { B } from '../theme.js';
import { PageHeader, Card, EmptyState, DataTable, StatusBadge } from '../components/ui.jsx';

export function SettingsPage() {
    const [activeTab, setActiveTab] = useState("company");
    const tabs = [
        { id: "company", label: "Company info", icon: "ti-building" },
        { id: "users", label: "Users & roles", icon: "ti-users" },
        { id: "gst", label: "GST / Tax", icon: "ti-file-invoice" },
        { id: "notif", label: "Notifications", icon: "ti-bell" },
        { id: "security", label: "Security", icon: "ti-shield" },
    ];
    return (
        <div>
            <PageHeader title="Settings" subtitle="System configuration · users · GST setup · security" />
            <div style={{ display: "flex", gap: 0, marginBottom: 14, borderBottom: `1px solid ${B.border}` }}>
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                        padding: "8px 14px", border: "none", background: "none", cursor: "pointer", fontFamily: "inherit",
                        fontSize: 12, fontWeight: 500, color: activeTab === t.id ? B.navy : B.textSecondary,
                        borderBottom: activeTab === t.id ? `2px solid ${B.navy}` : "2px solid transparent",
                        display: "flex", alignItems: "center", gap: 6, marginBottom: -1
                    }}>
                        <i className={`ti ${t.icon}`} style={{ fontSize: 14 }} aria-hidden="true" />{t.label}
                    </button>
                ))}
            </div>
            <Card>
                {activeTab === "company" && (
                    <div className="grid-responsive grid-2-col" style={{ marginBottom: 0 }}>
                        {[["Company name", "Aadhya Pharmex Pvt. Ltd."], ["GSTIN", "22AABCA1234Z1Z5"], ["Drug License no.", "BR/DL/DIST/2022/00001"], ["Drug License expiry", "31 Dec 2027"], ["PAN", "AABCA1234Z"], ["State", "Bihar"], ["Head office", "Patna, Bihar — 800001"], ["Phone", "+91 98765 43210"]].map(([l, v], i) => (
                            <div key={i}>
                                <label style={{ fontSize: 11, fontWeight: 500, color: B.textSecondary, display: "block", marginBottom: 4 }}>{l}</label>
                                <input defaultValue={v} style={{ width: "100%", height: 34, border: `1px solid ${B.border}`, borderRadius: 8, fontSize: 12, padding: "0 10px", background: B.surface, color: B.textPrimary, fontFamily: "inherit", boxSizing: "border-box" }} />
                            </div>
                        ))}
                        <div style={{ gridColumn: "span 2", display: "flex", justifyContent: "flex-end", gap: 10 }}>
                            <button style={{ padding: "8px 16px", border: `1px solid ${B.border}`, borderRadius: 8, background: B.white, fontSize: 12, color: B.textSecondary, cursor: "pointer", fontFamily: "inherit" }}>Discard</button>
                            <button style={{ padding: "8px 16px", border: "none", borderRadius: 8, background: B.navy, color: B.white, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Save changes</button>
                        </div>
                    </div>
                )}
                {activeTab === "users" && (
                    <div>
                        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
                            <button style={{ padding: "7px 12px", border: "none", borderRadius: 8, background: B.navy, color: B.white, fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
                                <i className="ti ti-plus" style={{ fontSize: 12 }} aria-hidden="true" /> Add user
                            </button>
                        </div>
                        <DataTable
                            headers={["Name", "Email", "Role", "Branch", "Status", "Actions"]}
                            rows={[
                                ["Rajesh Kumar", "rajesh@aadhyapharma.in", "Operations Manager", "Head Office", "Active"],
                                ["Priya Sharma", "priya@aadhyapharma.in", "Accounts Executive", "Head Office", "Active"],
                                ["Sunil Yadav", "sunil@aadhyapharma.in", "Warehouse Incharge", "Head Office", "Active"],
                                ["Rajan Kumar", "rajan@aadhyapharma.in", "Delivery Staff", "Head Office", "Active"],
                                ["Amit Singh", "amit@aadhyapharma.in", "Delivery Staff", "Muzaffarpur", "Active"],
                            ].map(([name, email, role, branch, st], i) => (
                                <tr key={i} style={{ borderBottom: `1px solid ${B.border}`, background: i % 2 === 0 ? B.white : B.surface }}>
                                    <td style={{ padding: "9px 10px", fontWeight: 500 }}>{name}</td>
                                    <td style={{ padding: "9px 10px", color: B.textSecondary, fontSize: 11 }}>{email}</td>
                                    <td style={{ padding: "9px 10px" }}><span style={{ background: B.navyLight, color: B.navy, fontSize: 11, padding: "2px 7px", borderRadius: 20, fontWeight: 500 }}>{role}</span></td>
                                    <td style={{ padding: "9px 10px", color: B.textSecondary }}>{branch}</td>
                                    <td style={{ padding: "9px 10px" }}><StatusBadge status={st} /></td>
                                    <td style={{ padding: "9px 10px" }}>
                                        <div style={{ display: "flex", gap: 8 }}>
                                            <i className="ti ti-edit" style={{ fontSize: 15, color: B.navyMid, cursor: "pointer" }} aria-label="Edit" />
                                            <i className="ti ti-trash" style={{ fontSize: 15, color: B.red, cursor: "pointer" }} aria-label="Delete" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        />
                    </div>
                )}
                {(activeTab === "gst" || activeTab === "notif" || activeTab === "security") && (
                    <EmptyState icon="ti-settings" title={`${tabs.find(t => t.id === activeTab)?.label} settings`} sub="Configure this section based on your operational requirements." />
                )}
            </Card>
        </div>
    );
}
