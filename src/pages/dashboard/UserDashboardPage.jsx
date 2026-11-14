import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Smartphone,
  Zap,
  Building2,
  CreditCard,
  ShieldCheck,
  RefreshCw,
  LogOut,
  CheckCircle2,
  ChevronRight,
  User,
  Phone,
  MapPin,
  Store,
  DollarSign,
  TrendingUp,
  Receipt,
  FileText,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

export default function UserDashboardPage() {
  const navigate = useNavigate();

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  const roleId = Number(currentUser.role_id) || 8;

  // If an Admin or Hierarchy Manager accesses /dashboard, route them to /admin
  React.useEffect(() => {
    if (roleId >= 1 && roleId <= 7) {
      navigate("/admin", { replace: true });
    }
  }, [roleId, navigate]);

  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock balance and live stats for retailer terminal
  const [balances, setBalances] = useState({
    mainWallet: "24,850.50",
    aepsWallet: "12,420.00",
    todaySales: "48,930.00",
    todayCommission: "412.50",
    txnCount: 29
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Wallet balances and terminal transactions synced with bank");
    }, 600);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("adminUser");
    toast.info("Signed out successfully");
    navigate("/login", { replace: true });
  };

  const handleServiceClick = (serviceName) => {
    toast.info(`${serviceName} terminal service is active. Ready for transactions.`);
  };

  const recentTransactions = [
    {
      id: "TXN92817401",
      service: "AEPS Cash Out",
      type: "cash_out",
      customer: "9876543210",
      amount: "₹ 2,500.00",
      commission: "+ ₹ 8.50",
      status: "Success",
      time: "10 mins ago"
    },
    {
      id: "TXN92817388",
      service: "BBPS Electricity",
      type: "bill_pay",
      customer: "9812345678",
      amount: "₹ 1,480.00",
      commission: "+ ₹ 3.20",
      status: "Success",
      time: "24 mins ago"
    },
    {
      id: "TXN92817342",
      service: "Money Transfer (IMPS)",
      type: "dmt",
      customer: "9765432109",
      amount: "₹ 5,000.00",
      commission: "+ ₹ 15.00",
      status: "Success",
      time: "1 hour ago"
    },
    {
      id: "TXN92817290",
      service: "Prepaid Recharge (Jio)",
      type: "recharge",
      customer: "9988776655",
      amount: "₹ 299.00",
      commission: "+ ₹ 6.00",
      status: "Success",
      time: "2 hours ago"
    },
    {
      id: "TXN92817104",
      service: "AEPS Balance Enquiry",
      type: "enquiry",
      customer: "9123456780",
      amount: "₹ 0.00",
      commission: "+ ₹ 0.50",
      status: "Success",
      time: "3 hours ago"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Outlet */}
          <div className="flex items-center gap-3">
            <img
              src="/aquapay-logo.jpeg"
              alt="AquaPay Logo"
              className="h-10 w-auto object-contain select-none"
            />
            <div className="hidden sm:block border-l border-slate-200 pl-3">
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                {currentUser.shopname || "AquaPay Retail Outlet"}
              </span>
              <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">
                Retailer Terminal
              </span>
            </div>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-blue-600" : ""}`} />
              <span className="hidden sm:inline">Sync Wallet</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "R"}
              </div>
              <div className="hidden md:block text-left text-xs">
                <span className="font-bold text-slate-900 block leading-tight">
                  {currentUser.name || "Retailer Partner"}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> KYC Verified
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Welcome & Live Merchant Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-100">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              Verified Banking Correspondent Outlet
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser.name || "Merchant"}!
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              Terminal ID: <span className="font-mono font-bold text-white">AQP-RT-{currentUser.id || "1042"}</span> • Location: {currentUser.city || "Retail City"}, {currentUser.state || "India"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => toast.info("Instant Settlement: AEPS balance will settle to registered bank account within 2 hours.")}
              className="bg-white hover:bg-blue-50 text-blue-700 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowUpRight className="w-4 h-4" />
              Instant Bank Payout
            </button>
            <button
              onClick={() => toast.info("Load Wallet: Use UPI or NetBanking to add balance instantly.")}
              className="bg-blue-800/80 hover:bg-blue-900 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition border border-white/20 shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowDownLeft className="w-4 h-4" />
              Load Wallet
            </button>
          </div>
        </div>

        {/* 4 Financial Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Main Balance */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Main Wallet
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-extrabold text-slate-900 tracking-tight">
              ₹ {balances.mainWallet}
            </div>
            <div className="mt-2 text-xs font-medium text-slate-500 flex items-center justify-between">
              <span>Utility & Recharge Balance</span>
              <span className="text-blue-600 font-bold hover:underline cursor-pointer" onClick={() => toast.info("Top up via UPI/Netbanking")}>+ Topup</span>
            </div>
          </div>

          {/* Card 2: AEPS Settlement Balance */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                AEPS Balance
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-extrabold text-emerald-600 tracking-tight">
              ₹ {balances.aepsWallet}
            </div>
            <div className="mt-2 text-xs font-medium text-emerald-700 flex items-center justify-between">
              <span>Aadhaar Cash Out Funds</span>
              <span className="font-bold underline cursor-pointer" onClick={() => toast.info("Initiated bank transfer")}>Settle to Bank</span>
            </div>
          </div>

          {/* Card 3: Today's Volume */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Today's Business
              </span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-extrabold text-slate-900 tracking-tight">
              ₹ {balances.todaySales}
            </div>
            <div className="mt-2 text-xs font-medium text-indigo-600">
              {balances.txnCount} Transactions Today
            </div>
          </div>

          {/* Card 4: Today's Commission */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Today's Earnings
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-extrabold text-amber-600 tracking-tight">
              ₹ {balances.todayCommission}
            </div>
            <div className="mt-2 text-xs font-medium text-amber-700">
              Instant Commission Credited
            </div>
          </div>
        </div>

        {/* Banking Services Terminal Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Banking & Payment Services
              </h2>
              <p className="text-xs text-slate-500">
                Click any service to initiate banking transaction on this terminal
              </p>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              API Services Online
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Service 1: AEPS Cash Out */}
            <div
              onClick={() => handleServiceClick("AEPS Cash Withdrawal")}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-colors mb-3">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-900 text-xs">AEPS Cash Out</span>
              <span className="text-[10px] text-slate-400 mt-1">Aadhaar Cash</span>
            </div>

            {/* Service 2: AEPS Balance Enquiry */}
            <div
              onClick={() => handleServiceClick("AEPS Balance Enquiry")}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white flex items-center justify-center transition-colors mb-3">
                <Receipt className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-900 text-xs">Balance Check</span>
              <span className="text-[10px] text-slate-400 mt-1">Mini Statement</span>
            </div>

            {/* Service 3: Money Transfer (DMT) */}
            <div
              onClick={() => handleServiceClick("Domestic Money Transfer")}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-50 group-hover:bg-purple-600 text-purple-600 group-hover:text-white flex items-center justify-center transition-colors mb-3">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-900 text-xs">Money Transfer</span>
              <span className="text-[10px] text-slate-400 mt-1">Instant IMPS/NEFT</span>
            </div>

            {/* Service 4: BBPS Electricity */}
            <div
              onClick={() => handleServiceClick("BBPS Utility Bill Payments")}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-600 text-amber-600 group-hover:text-white flex items-center justify-center transition-colors mb-3">
                <Zap className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-900 text-xs">BBPS Bills</span>
              <span className="text-[10px] text-slate-400 mt-1">Power, Gas, Water</span>
            </div>

            {/* Service 5: Mobile & DTH Recharge */}
            <div
              onClick={() => handleServiceClick("Prepaid Mobile Recharge")}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-50 group-hover:bg-rose-600 text-rose-600 group-hover:text-white flex items-center justify-center transition-colors mb-3">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-900 text-xs">Recharges</span>
              <span className="text-[10px] text-slate-400 mt-1">Prepaid & DTH</span>
            </div>

            {/* Service 6: Micro-ATM */}
            <div
              onClick={() => handleServiceClick("Micro-ATM Swipes")}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-teal-600 text-teal-600 group-hover:text-white flex items-center justify-center transition-colors mb-3">
                <CreditCard className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-900 text-xs">Micro-ATM</span>
              <span className="text-[10px] text-slate-400 mt-1">Card Cash Out</span>
            </div>
          </div>
        </div>

        {/* Live Terminal Transactions Ledger */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Recent Terminal Transactions
              </h3>
              <p className="text-xs text-slate-500">
                Live ledger of settlements and customer services executed on your terminal
              </p>
            </div>
            <button
              onClick={() => toast.info("Full transaction report exported")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition cursor-pointer"
            >
              View Full Passbook &rarr;
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">TRANSACTION ID</th>
                  <th className="py-3 px-4">SERVICE</th>
                  <th className="py-3 px-4">CUSTOMER MOBILE</th>
                  <th className="py-3 px-4">AMOUNT</th>
                  <th className="py-3 px-4">COMMISSION</th>
                  <th className="py-3 px-4 text-center">STATUS</th>
                  <th className="py-3 px-4 text-right">TIME</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                      {tx.id}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      {tx.service}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {tx.customer}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {tx.amount}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-600">
                      {tx.commission}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-400">
                      {tx.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Outlet Details & Support Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
              <Store className="w-4 h-4 text-blue-600" />
              Outlet Profile Information
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Registered Outlet</span>
                <span className="font-semibold text-slate-800">{currentUser.shopname || "AquaPay Retail Point"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Merchant Contact</span>
                <span className="font-semibold text-slate-800">{currentUser.mobile || "N/A"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Primary Email</span>
                <span className="font-semibold text-slate-800">{currentUser.email || "N/A"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Location Address</span>
                <span className="font-semibold text-slate-800">{currentUser.address || currentUser.city || "India"}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                RBI Banking & Support Desk
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                For settlement inquiries, chargebacks, or device pairing assistance, contact our 24/7 dedicated banking partner desk.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="text-slate-500">Toll-Free Desk: <strong className="text-slate-800">1800-AQUAPAY</strong></span>
              <span className="text-slate-500">Support: <strong className="text-blue-600">support@aquapay.in</strong></span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
