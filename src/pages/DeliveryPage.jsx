import { B } from '../theme.js';
import { PageHeader, KPICard, Card, CardTitle, DataTable, StatusBadge } from '../components/ui.jsx';
import { DELIVERIES } from '../mockData.js';

export function DeliveryPage({ showModal }) {
    return (
        <div>
            <PageHeader title="Delivery management" subtitle="Route tracking · proof of delivery · collection" action="New dispatch" onAction={showModal} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginBottom: 14 }}>
                <KPICard icon="ti-truck-delivery" label="Active deliveries" value="3" sub="2 routes in progress" accent={B.navyMid} />
                <KPICard icon="ti-check" label="Completed today" value="2" sub="21 orders delivered" accent={B.green} subColor={B.green} />
                <KPICard icon="ti-clock" label="Pending dispatch" value="3" sub="Ready to assign" accent={B.amber} subColor={B.amber} />
                <KPICard icon="ti-currency-rupee" label="Cash collected" value="₹4,900" sub="Today so far" accent={B.navy} />
            </div>

            <div className="grid-responsive grid-2-col">
                {/* Delivery map placeholder */}
                <Card>
                    <CardTitle>Live route overview</CardTitle>
                    <div style={{ height: 180, background: "linear-gradient(135deg,#EBF4FB 0%,#D9F2E6 100%)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8, border: `1px dashed ${B.border}` }}>
                        <i className="ti ti-map-pin" style={{ fontSize: 32, color: B.navyMid }} aria-hidden="true" />
                        <div style={{ fontSize: 12, color: B.textSecondary }}>Google Maps integration — Phase 2</div>
                        <div style={{ fontSize: 11, color: B.textMuted }}>3 active drivers · real-time GPS tracking</div>
                    </div>
                </Card>

                {/* Beat summary */}
                <Card>
                    <CardTitle>Beat performance today</CardTitle>
                    {[["Patna Central", "Rajan Kumar", 8, 5, "In Transit"], ["Patna South", "Sunil Yadav", 5, 5, "Completed"], ["Muzaffarpur", "Amit Singh", 12, 0, "In Transit"], ["Nalanda", "Rajan Kumar", 6, 6, "Completed"], ["Gaya", "Priya Kumari", 9, 0, "Pending"]].map((b, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 4 ? `1px solid ${B.border}` : "none" }}>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 500, color: B.textPrimary }}>{b[0]}</div>
                                <div style={{ fontSize: 11, color: B.textMuted }}>{b[1]}</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <span style={{ fontSize: 11, color: B.textSecondary }}>{b[3]}/{b[2]} orders</span>
                                <StatusBadge status={b[4]} />
                            </div>
                        </div>
                    ))}
                </Card>
            </div>

            <Card>
                <CardTitle>Delivery runs</CardTitle>
                <DataTable
                    headers={["Run ID", "Driver", "Beat", "Orders", "Status", "Dispatched", "ETA", "Cash collected", "Actions"]}
                    rows={DELIVERIES.map((d, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${B.border}`, background: i % 2 === 0 ? B.white : B.surface }}>
                            <td style={{ padding: "9px 10px", color: B.navyMid, fontWeight: 500 }}>{d.id}</td>
                            <td style={{ padding: "9px 10px", fontWeight: 500 }}>{d.driver}</td>
                            <td style={{ padding: "9px 10px", color: B.textSecondary }}>{d.beat}</td>
                            <td style={{ padding: "9px 10px", color: B.textSecondary }}>{d.orders}</td>
                            <td style={{ padding: "9px 10px" }}><StatusBadge status={d.status} /></td>
                            <td style={{ padding: "9px 10px", color: B.textSecondary }}>{d.dispatched}</td>
                            <td style={{ padding: "9px 10px", color: B.textSecondary }}>{d.eta}</td>
                            <td style={{ padding: "9px 10px", fontWeight: 500 }}>{d.collected}</td>
                            <td style={{ padding: "9px 10px" }}>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <i className="ti ti-eye" style={{ fontSize: 15, color: B.navyMid, cursor: "pointer" }} aria-label="View" />
                                    <i className="ti ti-map-pin" style={{ fontSize: 15, color: B.textSecondary, cursor: "pointer" }} aria-label="Track" />
                                </div>
                            </td>
                        </tr>
                    ))}
                />
            </Card>
        </div>
    );
}
