import { B } from './theme.js';

export const ORDERS = [
    { id: "ORD-2841", retailer: "Shree Medicals", city: "Patna", items: 14, value: "₹4,820", status: "Dispatched", date: "09 Jun 2026", payment: "Credit" },
    { id: "ORD-2840", retailer: "Apollo Pharma Retail", city: "Muzaffarpur", items: 6, value: "₹1,340", status: "Delivered", date: "09 Jun 2026", payment: "UPI" },
    { id: "ORD-2839", retailer: "Jan Aushadhi Store #4", city: "Gaya", items: 22, value: "₹8,610", status: "Pending", date: "08 Jun 2026", payment: "Credit" },
    { id: "ORD-2838", retailer: "Medplus – Patna", city: "Patna", items: 9, value: "₹3,290", status: "Confirmed", date: "08 Jun 2026", payment: "NEFT" },
    { id: "ORD-2837", retailer: "Sahil Medical Store", city: "Patna", items: 3, value: "₹980", status: "Delivered", date: "07 Jun 2026", payment: "Cash" },
    { id: "ORD-2836", retailer: "Rani Medical Hall", city: "Nalanda", items: 17, value: "₹6,150", status: "Cancelled", date: "07 Jun 2026", payment: "Credit" },
    { id: "ORD-2835", retailer: "Mahavir Medicos", city: "Bhagalpur", items: 8, value: "₹2,740", status: "Dispatched", date: "07 Jun 2026", payment: "NEFT" },
    { id: "ORD-2834", retailer: "Shree Medicals", city: "Patna", items: 5, value: "₹1,890", status: "Delivered", date: "06 Jun 2026", payment: "UPI" },
];

export const INVENTORY = [
    { id: "SKU-001", name: "Paracetamol 500mg", company: "Cipla", batch: "CP2503A", stock: 1200, expiry: "Mar 2027", schedule: "OTC", status: "OK", rack: "A-01-03" },
    { id: "SKU-002", name: "Amoxicillin 250mg", company: "Dr. Reddy's", batch: "DR2411B", stock: 340, expiry: "Nov 2026", schedule: "H", status: "OK", rack: "B-02-01" },
    { id: "SKU-003", name: "Metformin 500mg", company: "Sun Pharma", batch: "SP2502C", stock: 88, expiry: "Jul 2026", schedule: "H", status: "Low", rack: "B-03-02" },
    { id: "SKU-004", name: "Alprazolam 0.5mg", company: "Mankind", batch: "MK2412A", stock: 45, expiry: "Jun 2026", schedule: "X", status: "Expiring", rack: "C-01-01" },
    { id: "SKU-005", name: "Azithromycin 500mg", company: "Torrent", batch: "TR2501D", stock: 620, expiry: "Jan 2027", schedule: "H1", status: "OK", rack: "B-04-03" },
    { id: "SKU-006", name: "Vitamin C 500mg", company: "Abbott", batch: "AB2504E", stock: 2100, expiry: "Dec 2027", schedule: "OTC", status: "OK", rack: "A-02-01" },
    { id: "SKU-007", name: "Omeprazole 20mg", company: "Glenmark", batch: "GL2410B", stock: 22, expiry: "Aug 2026", schedule: "H", status: "Low", rack: "B-05-02" },
    { id: "SKU-008", name: "Atorvastatin 10mg", company: "Cipla", batch: "CP2501B", stock: 480, expiry: "Feb 2027", schedule: "H", status: "OK", rack: "B-01-04" },
    { id: "SKU-009", name: "Cefixime 200mg", company: "Mankind", batch: "MK2503C", stock: 165, expiry: "Sep 2026", schedule: "H", status: "OK", rack: "B-02-03" },
];

export const RETAILERS = [
    { id: "RET-101", name: "Shree Medicals", city: "Patna", license: "BR/DL/2021/00441", licenseExpiry: "Dec 2026", outstanding: "₹12,400", credit: "₹50,000", tier: "A", status: "Active" },
    { id: "RET-102", name: "Apollo Pharma Retail", city: "Muzaffarpur", license: "BR/DL/2020/00219", licenseExpiry: "Oct 2026", outstanding: "₹3,800", credit: "₹30,000", tier: "B", status: "Active" },
    { id: "RET-103", name: "Jan Aushadhi Store #4", city: "Gaya", license: "BR/DL/2019/00088", licenseExpiry: "Jul 2026", outstanding: "₹28,900", credit: "₹25,000", tier: "A", status: "Credit Hold" },
    { id: "RET-104", name: "Sahil Medical Store", city: "Patna", license: "BR/DL/2022/00612", licenseExpiry: "Mar 2027", outstanding: "₹0", credit: "₹15,000", tier: "C", status: "Active" },
    { id: "RET-105", name: "Rani Medical Hall", city: "Nalanda", license: "BR/DL/2018/00034", licenseExpiry: "Jun 2026", outstanding: "₹7,200", credit: "₹20,000", tier: "B", status: "License Expiring" },
    { id: "RET-106", name: "Mahavir Medicos", city: "Bhagalpur", license: "BR/DL/2022/00788", licenseExpiry: "Feb 2027", outstanding: "₹4,500", credit: "₹20,000", tier: "B", status: "Active" },
];

export const DELIVERIES = [
    { id: "DEL-441", driver: "Rajan Kumar", beat: "Patna Central", orders: 8, status: "In Transit", dispatched: "08:30 AM", eta: "12:00 PM", collected: "₹2,400" },
    { id: "DEL-440", driver: "Sunil Yadav", beat: "Patna South", orders: 5, status: "Completed", dispatched: "08:15 AM", eta: "Completed", collected: "₹1,800" },
    { id: "DEL-439", driver: "Amit Singh", beat: "Muzaffarpur", orders: 12, status: "In Transit", dispatched: "09:00 AM", eta: "02:00 PM", collected: "₹0" },
    { id: "DEL-438", driver: "Rajan Kumar", beat: "Nalanda", orders: 6, status: "Completed", dispatched: "07:45 AM", eta: "Completed", collected: "₹3,100" },
    { id: "DEL-437", driver: "Priya Kumari", beat: "Gaya", orders: 9, status: "Pending", dispatched: "—", eta: "Afternoon", collected: "₹0" },
];

export const PURCHASES = [
    { id: "PO-1084", company: "Cipla Ltd.", date: "06 Jun 2026", items: 18, value: "₹84,200", status: "GRN Done", payment: "Due 06 Jul" },
    { id: "PO-1083", company: "Dr. Reddy's", date: "04 Jun 2026", items: 12, value: "₹52,800", status: "GRN Done", payment: "Due 04 Jul" },
    { id: "PO-1082", company: "Sun Pharma", date: "02 Jun 2026", items: 9, value: "₹38,400", status: "Pending", payment: "Due 02 Jul" },
    { id: "PO-1081", company: "Abbott India", date: "01 Jun 2026", items: 22, value: "₹1,12,600", status: "GRN Done", payment: "Paid" },
    { id: "PO-1080", company: "Torrent Pharma", date: "30 May 2026", items: 15, value: "₹67,500", status: "In Transit", payment: "Due 29 Jun" },
    { id: "PO-1079", company: "Glenmark", date: "28 May 2026", items: 7, value: "₹28,900", status: "GRN Done", payment: "Paid" },
];

export const SCHEMES = [
    { id: "SCH-21", company: "Cipla", product: "Paracetamol 500mg", type: "Buy 10 Get 1", valid: "30 Jun 2026", utilised: "68%", status: "Active" },
    { id: "SCH-22", company: "Dr. Reddy's", product: "All Cardiac range", type: "12% extra disc.", valid: "15 Jul 2026", utilised: "45%", status: "Active" },
    { id: "SCH-23", company: "Abbott", product: "Vitamin C range", type: "₹5/strip bonus", valid: "31 Jul 2026", utilised: "22%", status: "Active" },
    { id: "SCH-24", company: "Mankind", product: "Dolo 650mg", type: "Buy 5 Get 1", valid: "20 Jun 2026", utilised: "91%", status: "Expiring" },
    { id: "SCH-25", company: "Torrent", product: "Azithromycin 500mg", type: "10% flat disc.", valid: "31 Aug 2026", utilised: "18%", status: "Active" },
    { id: "SCH-26", company: "Sun Pharma", product: "Diabetic range", type: "PTR -3%", valid: "31 May 2026", utilised: "100%", status: "Expired" },
];

export const NOTIFICATIONS = [
    { icon: "ti-alert-circle", color: B.red, title: "Alprazolam 0.5mg expiring in 18 days", time: "Just now", read: false },
    { icon: "ti-file-invoice", color: B.red, title: "7 invoices pending IRP submission", time: "2 hrs ago", read: false },
    { icon: "ti-calendar", color: B.amber, title: "GSTR-1 due in 5 days — 14 Jun 2026", time: "Today", read: false },
    { icon: "ti-ban", color: B.amber, title: "Rani Medical Hall license expires Jun 2026", time: "Today", read: true },
    { icon: "ti-truck-delivery", color: B.green, title: "DEL-440 completed — ₹1,800 collected", time: "10:42 AM", read: true },
    { icon: "ti-tag", color: B.purple, title: "Scheme SCH-24 (Mankind) 91% utilised", time: "Yesterday", read: true },
];

export const WEEKLY_SALES = [38000, 52000, 44000, 67000, 71000, 58000, 49000];
export const MONTHLY_SALES = [420000, 380000, 510000, 490000, 620000, 580000, 710000, 680000, 750000, 820000, 790000, 940000];
export const MONTHS = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const COMPANY_SALES = [
    { name: "Cipla", value: 28, color: "#1B3A6B" },
    { name: "Abbott", value: 18, color: "#2E75B6" },
    { name: "Dr. Reddy's", value: 16, color: "#1E7E4E" },
    { name: "Sun Pharma", value: 14, color: "#BA7517" },
    { name: "Torrent", value: 12, color: "#5B21B6" },
    { name: "Others", value: 12, color: "#94A3B8" },
];
