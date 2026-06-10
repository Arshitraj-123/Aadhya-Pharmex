import { B } from '../theme.js';
import { PageHeader, AlertBar, Card, CardTitle } from '../components/ui.jsx';

export function CompliancePage() {
    return (
        <div>
            <PageHeader title="Compliance & regulatory" subtitle="Schedule H/H1/X · Drug License · CDSCO · DPDP Rules 2025" />
            <AlertBar type="warn"><strong>1 urgent:</strong> &nbsp;Alprazolam 0.5mg (Schedule X) batch MK2412A expiring in 18 days. Initiate return to Mankind or disposal per CDSCO guidelines.</AlertBar>
            <div className="grid-responsive grid-2-col">
                <Card>
                    <CardTitle>Schedule register summary — today</CardTitle>
                    {[
                        ["ti-clipboard-list", "Schedule H transactions", "38 records", B.amber],
                        ["ti-clipboard-check", "Schedule H1 register", "7 entries (with patient phone + Rx)", B.red],
                        ["ti-shield", "Schedule X dispensing", "2 units (Alprazolam 0.5mg)", B.red],
                        ["ti-check", "Narcotic register status", "✓ Up to date", B.green],
                        ["ti-eye", "Next Drug Inspector visit", "Scheduled 15 Jul 2026", B.navyMid],
                    ].map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: i < 4 ? `1px solid ${B.border}` : "none" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                <i className={`ti ${item[0]}`} style={{ fontSize: 15, color: item[3] }} aria-hidden="true" />
                                <span style={{ fontSize: 12, color: B.textSecondary }}>{item[1]}</span>
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 500, color: item[3] }}>{item[2]}</span>
                        </div>
                    ))}
                </Card>

                <Card>
                    <CardTitle>Retailer Drug License status</CardTitle>
                    {[
                        ["Valid (> 90 days remaining)", 388, B.green, B.greenLight],
                        ["Expiring — 30 to 90 days", 16, B.amber, B.amberLight],
                        ["Expiring — less than 30 days", 6, B.red, B.redLight],
                        ["Expired — orders auto-blocked", 2, B.red, B.redLight],
                    ].map((x, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", borderRadius: 8, background: x[3], marginBottom: 6 }}>
                            <span style={{ fontSize: 12, color: x[2], fontWeight: 500 }}>{x[0]}</span>
                            <span style={{ fontSize: 16, fontWeight: 500, color: x[2] }}>{x[1]}</span>
                        </div>
                    ))}
                </Card>
            </div>

            <Card>
                <CardTitle>GST & e-Invoice compliance tracker</CardTitle>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10 }}>
                    {[
                        ["GSTR-1 (May 2026)", "Filed ✓", "Filed 11 May", true],
                        ["GSTR-3B (May 2026)", "Filed ✓", "Filed 20 May", true],
                        ["GSTR-1 (Jun 2026)", "Due 14 Jun", "5 days remaining", false],
                        ["e-Invoice pending IRN", "7 invoices", "30-day window applies", false],
                        ["e-Way Bills active", "4 active", "All within validity period", true],
                        ["DPDP Rules 2025", "Tracking", "Compliance deadline 13 May 2027", true],
                        ["Schedule X register", "✓ Current", "Last updated today", true],
                        ["CDSCO product recall", "0 active recalls", "No active alerts", true],
                    ].map((x, i) => (
                        <div key={i} style={{ padding: 12, borderRadius: 8, border: `1px solid ${x[3] ? "#D9F2E6" : "#FEE2E2"}`, background: x[3] ? "#F0FDF4" : "#FFF8F8" }}>
                            <div style={{ fontSize: 11, color: B.textSecondary, marginBottom: 3 }}>{x[0]}</div>
                            <div style={{ fontSize: 13, fontWeight: 500, color: x[3] ? B.green : B.red }}>{x[1]}</div>
                            <div style={{ fontSize: 11, color: B.textMuted, marginTop: 2 }}>{x[2]}</div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
