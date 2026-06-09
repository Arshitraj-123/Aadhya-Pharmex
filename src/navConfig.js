export const NAV_SECTIONS = [
    {
        label: "Operations",
        items: [
            { id: "dashboard", label: "Dashboard", icon: "ti-layout-dashboard" },
            { id: "orders", label: "Orders", icon: "ti-shopping-cart", badge: 12 },
            { id: "inventory", label: "Inventory", icon: "ti-package", badge: 4 },
            { id: "delivery", label: "Delivery", icon: "ti-truck-delivery", badge: 3 },
        ]
    },
    {
        label: "Partners",
        items: [
            { id: "retailers", label: "Retailers", icon: "ti-building-store" },
            { id: "purchase", label: "Purchase / GRN", icon: "ti-clipboard-list" },
            { id: "schemes", label: "Schemes", icon: "ti-tag" },
        ]
    },
    {
        label: "Finance & Compliance",
        items: [
            { id: "billing", label: "Billing & GST", icon: "ti-file-invoice", badge: 7 },
            { id: "compliance", label: "Compliance", icon: "ti-shield-check", badge: 3 },
            { id: "reports", label: "Reports & MIS", icon: "ti-chart-bar" },
        ]
    },
    {
        label: "System",
        items: [
            { id: "settings", label: "Settings", icon: "ti-settings" },
        ]
    }
];
