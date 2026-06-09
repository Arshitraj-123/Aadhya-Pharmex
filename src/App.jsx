import { useState } from "react";
import { B } from "./theme.js";

import { Sidebar, Header } from "./components/layout.jsx";
import { PageHeader, EmptyState } from "./components/ui.jsx";
import { NewOrderModal, NotifPanel } from "./components/modals.jsx";

import { DashboardPage } from "./pages/DashboardPage.jsx";
import { OrdersPage } from "./pages/OrdersPage.jsx";
import { InventoryPage } from "./pages/InventoryPage.jsx";
import { DeliveryPage } from "./pages/DeliveryPage.jsx";
import { RetailersPage } from "./pages/RetailersPage.jsx";
import { PurchasePage } from "./pages/PurchasePage.jsx";
import { SchemesPage } from "./pages/SchemesPage.jsx";
import { BillingPage } from "./pages/BillingPage.jsx";
import { CompliancePage } from "./pages/CompliancePage.jsx";
import { ReportsPage } from "./pages/ReportsPage.jsx";
import { SettingsPage } from "./pages/SettingsPage.jsx";
import { PharmaAuth } from "./pages/PharmaAuth.jsx";

export default function App() {
    const [page, setPage] = useState("dashboard");
    const [collapsed, setCollapsed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showNotif, setShowNotif] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const PAGES = {
        dashboard: <DashboardPage setPage={setPage} showModal={() => setShowModal(true)} />,
        orders: <OrdersPage showModal={() => setShowModal(true)} />,
        inventory: <InventoryPage />,
        delivery: <DeliveryPage />,
        retailers: <RetailersPage />,
        purchase: <PurchasePage />,
        schemes: <SchemesPage />,
        billing: <BillingPage />,
        compliance: <CompliancePage />,
        reports: <ReportsPage />,
        settings: <SettingsPage />,
    };

    if (!isAuthenticated) {
        return <PharmaAuth onLogin={() => setIsAuthenticated(true)} />;
    }

    return (
        <div style={{ display: "flex", height: "100vh", background: B.surface, fontFamily: "Inter, system-ui, -apple-system, sans-serif", fontSize: 13 }}>
            <Sidebar active={page} setActive={p => { setPage(p); setShowNotif(false); setSidebarOpen(false); }} collapsed={collapsed} setCollapsed={setCollapsed} sidebarOpen={sidebarOpen} />
            <div className={`mobile-backdrop ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

            <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                <Header page={page} onBell={() => setShowNotif(!showNotif)} showBell={showNotif} onMenu={() => setSidebarOpen(true)} />
                {showNotif && <NotifPanel onClose={() => setShowNotif(false)} />}

                <main className="main-content" style={{ flex: 1, overflowY: "auto", padding: "18px 20px" }} onClick={() => setShowNotif(false)}>
                    {PAGES[page] || (
                        <div>
                            <PageHeader title="Page not found" />
                            <EmptyState icon="ti-compass-off" title="Page not found" sub="Navigate using the sidebar." />
                        </div>
                    )}
                </main>
            </div>

            {showModal && <NewOrderModal onClose={() => setShowModal(false)} />}
        </div>
    );
}
