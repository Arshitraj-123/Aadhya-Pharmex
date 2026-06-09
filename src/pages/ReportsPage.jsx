import { B } from '../theme.js';
import { PageHeader, Card, CardTitle } from '../components/ui.jsx';
import { BarChart, DonutChart, ProgressBar } from '../components/charts.jsx';
import { MONTHLY_SALES, MONTHS, COMPANY_SALES } from '../mockData.js';

export function ReportsPage() {
    return (
        <div>
            <PageHeader title="Reports & MIS" subtitle="Analytics · automated reports · business intelligence" />
            <div className="grid-responsive grid-2-col">
                {/* Annual trend */}
                <Card>
                    <CardTitle action={<span style={{ fontSize: 11, background: B.navyLight, color: B.navyMid, padding: "2px 8px", borderRadius: 20, fontWeight: 500 }}>FY 2025–26</span>}>
                        Annual revenue trend
                    </CardTitle>
                    <BarChart data={MONTHLY_SALES} labels={MONTHS} highlightIdx={11} height={130} color={B.navyLight} highlightColor={B.navy} />
                    <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                        {[["₹79.3L", "FY Revenue"], ["↑ 32%", "Growth YoY"], ["₹6.6L", "Avg/Month"]].map((x, i) => (
                            <div key={i} style={{ flex: 1, textAlign: "center", padding: "8px", background: B.surface, borderRadius: 8 }}>
                                <div style={{ fontSize: 15, fontWeight: 500, color: B.textPrimary }}>{x[0]}</div>
                                <div style={{ fontSize: 10, color: B.textSecondary }}>{x[1]}</div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Company breakdown */}
                <Card>
                    <CardTitle>Revenue by pharma company</CardTitle>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                        <DonutChart segments={COMPANY_SALES} size={120} />
                    </div>
                    {COMPANY_SALES.map((c, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderBottom: i < COMPANY_SALES.length - 1 ? `1px solid ${B.border}` : "none" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ width: 10, height: 10, borderRadius: 3, background: c.color }} />
                                <span style={{ fontSize: 12, color: B.textSecondary }}>{c.name}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <ProgressBar value={c.value * 2} color={c.color} height={5} />
                                <span style={{ fontSize: 12, fontWeight: 500, color: B.textPrimary, width: 32, textAlign: "right" }}>{c.value}%</span>
                            </div>
                        </div>
                    ))}
                </Card>
            </div>

            {/* Available reports */}
            <Card>
                <CardTitle>Standard MIS reports</CardTitle>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
                    {[
                        { name: "Daily sales summary", freq: "Daily auto-email", icon: "ti-chart-bar", color: B.navy },
                        { name: "Outstanding aging report", freq: "Weekly", icon: "ti-currency-rupee", color: B.red },
                        { name: "Near-expiry stock report", freq: "Weekly", icon: "ti-alert-circle", color: B.amber },
                        { name: "Company scheme utilisation", freq: "Monthly", icon: "ti-tag", color: B.purple },
                        { name: "GST monthly summary", freq: "Monthly", icon: "ti-file-invoice", color: B.green },
                        { name: "Profit & Loss statement", freq: "Monthly", icon: "ti-trending-up", color: B.navy },
                        { name: "Purchase register (ITC)", freq: "On-demand", icon: "ti-clipboard-list", color: B.navyMid },
                        { name: "Schedule X narcotic register", freq: "Monthly + Quarterly", icon: "ti-shield", color: B.red },
                    ].map((r, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", border: `1px solid ${B.border}`, borderRadius: 8, cursor: "pointer", background: B.white }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: r.color + "14", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <i className={`ti ${r.icon}`} style={{ fontSize: 16, color: r.color }} aria-hidden="true" />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 12, fontWeight: 500, color: B.textPrimary, marginBottom: 2 }}>{r.name}</div>
                                <div style={{ fontSize: 11, color: B.textMuted }}>{r.freq}</div>
                            </div>
                            <i className="ti ti-download" style={{ fontSize: 14, color: B.textMuted }} aria-label="Download" />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
