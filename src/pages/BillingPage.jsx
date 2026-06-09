import { B } from '../theme.js';
import { PageHeader, AlertBar, KPICard, Card, CardTitle, DataTable, StatusBadge } from '../components/ui.jsx';

export function BillingPage() {
    const invoices = [
        { inv: "INV/26-27/0284", retailer: "Shree Medicals", date: "09 Jun", taxable: "₹4,591", gst: "₹229", total: "₹4,820", irn: "Generated" },
        { inv: "INV/26-27/0283", retailer: "Apollo Pharma Retail", date: "09 Jun", taxable: "₹1,276", gst: "₹64", total: "₹1,340", irn: "Generated" },
        { inv: "INV/26-27/0282", retailer: "Medplus – Patna", date: "08 Jun", taxable: "₹3,133", gst: "₹157", total: "₹3,290", irn: "Pending IRN" },
        { inv: "INV/26-27/0281", retailer: "Jan Aushadhi Store #4", date: "08 Jun", taxable: "₹8,200", gst: "₹410", total: "₹8,610", irn: "Pending IRN" },
        { inv: "INV/26-27/0280", retailer: "Sahil Medical Store", date: "07 Jun", taxable: "₹933", gst: "₹47", total: "₹980", irn: "Generated" },
        { inv: "INV/26-27/0279", retailer: "Mahavir Medicos", date: "07 Jun", taxable: "₹2,610", gst: "₹130", total: "₹2,740", irn: "Generated" },
    ];
    return (
        <div>
            <PageHeader title="Billing & GST" subtitle="e-Invoice (IRP) · GSTR-1 · GSTR-3B · credit notes" action="Generate invoice" />
            <AlertBar type="warn"><strong>GSTR-1 due in 5 days (14 Jun 2026).</strong> &nbsp;7 invoices pending IRP submission. <span style={{ textDecoration: "underline", cursor: "pointer" }}>Submit now →</span></AlertBar>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginBottom: 14 }}>
                <KPICard icon="ti-file-invoice" label="Invoices this month" value="284" sub="₹12.8L total value" accent={B.navy} />
                <KPICard icon="ti-clock" label="Pending IRP" value="7" sub="Submit within 30 days" accent={B.red} subColor={B.red} />
                <KPICard icon="ti-receipt-refund" label="Credit notes pending" value="3" sub="₹18,400 value" accent={B.amber} subColor={B.amber} />
                <KPICard icon="ti-currency-rupee" label="GST collected (MTD)" value="₹64,200" sub="5% slab: ₹59k · 18%: ₹5.2k" accent={B.green} subColor={B.green} />
            </div>

            {/* GST rate callout */}
            <AlertBar type="info">
                <strong>Corrected GST rates (56th GST Council, Sep 2025):</strong> &nbsp;Life-saving drugs (HIV/TB/cancer/vaccines/insulin) = <strong>Nil (0%)</strong> · Most medicines = <strong>5%</strong> · APIs/chemicals = <strong>18%</strong>. The 12% slab no longer applies to finished medicines.
            </AlertBar>

            <Card>
                <CardTitle>Recent invoices</CardTitle>
                <DataTable
                    headers={["Invoice no.", "Retailer", "Date", "Taxable amt.", "GST", "Total", "IRN status", "Actions"]}
                    rows={invoices.map((inv, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${B.border}`, background: i % 2 === 0 ? B.white : B.surface }}>
                            <td style={{ padding: "9px 10px", fontFamily: "monospace", fontSize: 11, color: B.navyMid, fontWeight: 500 }}>{inv.inv}</td>
                            <td style={{ padding: "9px 10px" }}>{inv.retailer}</td>
                            <td style={{ padding: "9px 10px", color: B.textSecondary }}>{inv.date}</td>
                            <td style={{ padding: "9px 10px" }}>{inv.taxable}</td>
                            <td style={{ padding: "9px 10px", color: B.textSecondary }}>{inv.gst}</td>
                            <td style={{ padding: "9px 10px", fontWeight: 500 }}>{inv.total}</td>
                            <td style={{ padding: "9px 10px" }}><StatusBadge status={inv.irn} /></td>
                            <td style={{ padding: "9px 10px" }}>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <i className="ti ti-download" style={{ fontSize: 15, color: B.navyMid, cursor: "pointer" }} aria-label="Download PDF" />
                                    <i className="ti ti-brand-whatsapp" style={{ fontSize: 15, color: B.green, cursor: "pointer" }} aria-label="WhatsApp" />
                                    <i className="ti ti-send" style={{ fontSize: 15, color: B.textSecondary, cursor: "pointer" }} aria-label="Email" />
                                </div>
                            </td>
                        </tr>
                    ))}
                />
            </Card>
        </div>
    );
}
