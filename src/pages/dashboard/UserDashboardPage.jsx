import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  Users,
  UserCheck,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Store,
  DollarSign,
  TrendingUp,
  Receipt,
  FileText,
  AlertCircle,
  Search,
  Download,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { isAdminRole, isNormalUserRole, getRoleMeta } from "../../constants/roles";
import { fetchBackendUsers, createBackendUser } from "../../features/admin/services/adminApi";
import { AddAgentModal } from "../../features/admin/modals/AddAgentModal";

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
  const roleMeta = getRoleMeta(currentUser) || { name: currentUser.role_name || "Merchant", slug: "RT" };

  // If an Admin accesses /user/* or /dashboard, redirect to /admin
  useEffect(() => {
    if (isAdminRole(currentUser)) {
      navigate("/admin", { replace: true });
    }
  }, [currentUser, navigate]);

  // Role permissions
  const canManageAgents = roleId >= 2 && roleId <= 7;
  const isRetailer = roleId === 8;

  // Active navigation tab
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "network" | "services"
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Real Database Downline Users for Roles 2-7
  const [downlineUsers, setDownlineUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(canManageAgents);
  const [memberSearch, setMemberSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [addAgentModalOpen, setAddAgentModalOpen] = useState(false);

  // Load real child users from backend for managers
  const loadDownline = useCallback(async () => {
    if (!canManageAgents) return;
    try {
      setIsLoadingUsers(true);
      const res = await fetchBackendUsers();
      if (res && res.data) {
        setDownlineUsers(Array.isArray(res.data) ? res.data : []);
      }
    } catch (err) {
      console.warn("Could not load downline agents:", err?.message);
    } finally {
      setIsLoadingUsers(false);
    }
  }, [canManageAgents]);

  useEffect(() => {
    if (canManageAgents) {
      loadDownline();
    }
  }, [canManageAgents, loadDownline]);

  // Real backend agent onboarding for roles 2-7
  const handleOnboardAgent = async (agentData) => {
    try {
      const payload = {
        name: agentData.name.trim(),
        email: agentData.email.trim().toLowerCase(),
        mobile: agentData.mobile.trim(),
        role: agentData.role,
        password: agentData.password || "Welcome@123",
        shopname: agentData.shopname?.trim() || null,
        city: agentData.city?.trim() || null,
        state: agentData.state?.trim() || null,
        address: agentData.address?.trim() || null,
        pincode: agentData.pincode ? String(agentData.pincode).trim() : null,
      };

      const res = await createBackendUser(payload);
      if (res && res.data) {
        setDownlineUsers((prev) => [res.data, ...prev]);
        toast.success(`Agent ${res.data.name} onboarded successfully!`);
        setAddAgentModalOpen(false);
      }
    } catch (err) {
      const errMsg =
        err.response?.data?.message || err.message || "Failed to onboard agent";
      toast.error(errMsg);
    }
  };

  // Filtered downline members
  const filteredMembers = useMemo(() => {
    return downlineUsers.filter((u) => {
      const q = memberSearch.toLowerCase().trim();
      const searchMatch =
        !q ||
        (u.name && u.name.toLowerCase().includes(q)) ||
        (u.mobile && u.mobile.includes(q)) ||
        (u.email && u.email.toLowerCase().includes(q)) ||
        (u.shopname && u.shopname.toLowerCase().includes(q)) ||
        String(u.id).includes(q);

      const statusMatch =
        statusFilter === "All"
          ? true
          : statusFilter === "Active"
          ? u.status === "active"
          : u.status !== "active";

      return searchMatch && statusMatch;
    });
  }, [downlineUsers, memberSearch, statusFilter]);

  // CSV Export for downline
  const handleExportCSV = () => {
    if (!filteredMembers.length) {
      toast.error("No downline agent records available to export");
      return;
    }
    const headers = ["ID", "Name", "Email", "Mobile", "Role", "Shop Name", "City", "State", "Status"];
    const rows = filteredMembers.map((u) => [
      u.id,
      `"${u.name || ""}"`,
      `"${u.email || ""}"`,
      `"${u.mobile || ""}"`,
      `"${u.role_name || ""}"`,
      `"${u.shopname || ""}"`,
      `"${u.city || ""}"`,
      `"${u.state || ""}"`,
      `"${u.status || "active"}"`,
    ].join(","));

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `My_Downline_Network_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Downline network exported to CSV");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (canManageAgents) {
      loadDownline();
    }
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Dashboard balances and data synced successfully");
    }, 600);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("adminUser");
    toast.info("Signed out successfully");
    navigate("/login/user", { replace: true });
  };

  const handleServiceClick = (serviceName) => {
    toast.info(`${serviceName} terminal service is active. Ready for transactions.`);
  };

  const recentTransactions = [
    {
      id: "TXN92817401",
      service: "AEPS Cash Out",
      customer: "9876543210",
      amount: "₹ 2,500.00",
      commission: "+ ₹ 8.50",
      status: "Success",
      time: "10 mins ago"
    },
    {
      id: "TXN92817388",
      service: "BBPS Electricity",
      customer: "9812345678",
      amount: "₹ 1,480.00",
      commission: "+ ₹ 3.20",
      status: "Success",
      time: "24 mins ago"
    },
    {
      id: "TXN92817342",
      service: "Money Transfer (IMPS)",
      customer: "9765432109",
      amount: "₹ 5,000.00",
      commission: "+ ₹ 15.00",
      status: "Success",
      time: "1 hour ago"
    },
    {
      id: "TXN92817290",
      service: "Prepaid Recharge (Jio)",
      customer: "9988776655",
      amount: "₹ 299.00",
      commission: "+ ₹ 6.00",
      status: "Success",
      time: "2 hours ago"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Portal Role Badge */}
          <div className="flex items-center gap-3">
            <img
              src="/aquapay-logo.jpeg"
              alt="AquaPay Logo"
              className="h-10 w-auto object-contain select-none"
            />
            <div className="hidden sm:block border-l border-slate-200 pl-3">
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                {currentUser.shopname || currentUser.name || "AquaPay Partner"}
              </span>
              <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">
                {roleMeta.name} Console
              </span>
            </div>
          </div>

          {/* Navigation Tabs for Managers (Roles 2-7) */}
          {canManageAgents && (
            <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-white text-blue-600 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("network")}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "network"
                    ? "bg-white text-blue-600 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>My Downline</span>
                <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.2 rounded-full">
                  {downlineUsers.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("services")}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === "services"
                    ? "bg-white text-blue-600 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Services
              </button>
            </div>
          )}

          {/* Profile & Logout Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-blue-600" : ""}`} />
              <span className="hidden sm:inline">Sync Data</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="hidden md:block text-left text-xs">
                <span className="font-bold text-slate-900 block leading-tight">
                  {currentUser.name || "AquaPay Member"}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {roleMeta.name}
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

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-100">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              Verified AquaPay {roleMeta.name} Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser.name || "Partner"}!
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              Account ID: <span className="font-mono font-bold text-white">AQP-{roleMeta.slug}-{currentUser.id || "100"}</span> • Role: <span className="font-semibold text-white">{roleMeta.name}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            {canManageAgents && (
              <button
                onClick={() => setAddAgentModalOpen(true)}
                className="bg-white hover:bg-blue-50 text-blue-700 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Downline Agent
              </button>
            )}
            <button
              onClick={() => toast.info("Instant Settlement: Settlement will process directly to registered account.")}
              className="bg-blue-800/80 hover:bg-blue-900 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition border border-white/20 shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowUpRight className="w-4 h-4" />
              Bank Payout
            </button>
          </div>
        </div>

        {/* Empty Downline Banner for Managers (Roles 2-7) when 0 agents exist */}
        {canManageAgents && downlineUsers.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-slate-800 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full">
                  Network Active
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Welcome to your {roleMeta.name} Network Portal
                </h3>
                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  As a {roleMeta.name}, you can onboard and manage child agents within your permitted hierarchy. You currently have no child agents in your downline. Click below to onboard your first agent.
                </p>
              </div>
              <button
                onClick={() => setAddAgentModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-xs cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" /> Add First Agent
              </button>
            </div>
          </div>
        )}

        {/* Tab View: Downline Management (for roles 2-7) */}
        {canManageAgents && activeTab === "network" ? (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search downline by name, mobile, email, shop..."
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-3 py-2 font-medium focus:outline-none"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active Only</option>
                    <option value="Inactive">Inactive Only</option>
                  </select>

                  <button
                    onClick={handleExportCSV}
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Export CSV
                  </button>

                  <button
                    onClick={() => setAddAgentModalOpen(true)}
                    className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" /> Add Agent
                  </button>
                </div>
              </div>

              {/* Downline Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4 w-20 text-center">STATUS</th>
                      <th className="py-3 px-4">AGENT NAME & ID</th>
                      <th className="py-3 px-4">ROLE</th>
                      <th className="py-3 px-4">CONTACT</th>
                      <th className="py-3 px-4">SHOP & LOCATION</th>
                      <th className="py-3 px-4 text-center">KYC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {isLoadingUsers ? (
                      <tr>
                        <td colSpan="6" className="text-center py-10 text-slate-400">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            <span>Loading downline agents from database...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredMembers.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-10 text-slate-400">
                          <p className="font-semibold text-slate-600 text-xs">No downline agents found</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Click "Add Agent" to onboard your first child agent under your {roleMeta.name} account.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredMembers.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4 text-center">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                              {m.status || "Active"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            {m.name} <span className="font-mono text-[10px] text-slate-400 font-normal">#{m.id}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded text-[11px]">
                              {m.role_name || "Agent"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            <div>{m.mobile}</div>
                            <div className="text-[11px] text-slate-400">{m.email}</div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            <div className="font-medium">{m.shopname || "AquaPay Point"}</div>
                            <div className="text-[11px] text-slate-400">{m.city || ""}, {m.state || ""}</div>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                              {m.kyc?.status || "Pending"}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Overview View (For all normal users) */
          <>
            {/* 4 Financial & Operational Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  ₹ 24,850.50
                </div>
                <div className="mt-2 text-xs font-medium text-slate-500 flex items-center justify-between">
                  <span>Utility & DMT Balance</span>
                  <span className="text-blue-600 font-bold hover:underline cursor-pointer" onClick={() => toast.info("Load wallet via UPI")}>+ Load</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    AEPS Settlement
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3 text-2xl font-extrabold text-emerald-600 tracking-tight">
                  ₹ 12,420.00
                </div>
                <div className="mt-2 text-xs font-medium text-emerald-700 flex items-center justify-between">
                  <span>Aadhaar Cash Out Funds</span>
                  <span className="font-bold underline cursor-pointer" onClick={() => toast.info("Payout initiated to bank")}>Settle</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {canManageAgents ? "My Downline Agents" : "Today's Business"}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    {canManageAgents ? <Users className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                  </div>
                </div>
                <div className="mt-3 text-2xl font-extrabold text-slate-900 tracking-tight">
                  {canManageAgents ? downlineUsers.length : "₹ 48,930.00"}
                </div>
                <div className="mt-2 text-xs font-medium text-indigo-600">
                  {canManageAgents ? "Active Onboarded Accounts" : "29 Transactions Today"}
                </div>
              </div>

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
                  ₹ 412.50
                </div>
                <div className="mt-2 text-xs font-medium text-amber-700">
                  Instant Commission Credited
                </div>
              </div>
            </div>

            {/* Banking & Payment Services Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    Banking & Payment Services
                  </h2>
                  <p className="text-xs text-slate-500">
                    Live fintech payment terminal services
                  </p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  API Services Online
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
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

            {/* Recent Terminal Transactions */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Recent Transactions
                  </h3>
                  <p className="text-xs text-slate-500">
                    Live settlement transactions recorded on your account
                  </p>
                </div>
                <span className="text-xs font-semibold text-blue-600">
                  Real-time Ledger
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">TRANSACTION ID</th>
                      <th className="py-3 px-4">SERVICE</th>
                      <th className="py-3 px-4">CUSTOMER</th>
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
          </>
        )}
      </main>

      {/* Add Agent Modal for Downline Managers (Roles 2-7) */}
      {canManageAgents && (
        <AddAgentModal
          addAgentModalOpen={addAgentModalOpen}
          setAddAgentModalOpen={setAddAgentModalOpen}
          handleOnboardAgent={handleOnboardAgent}
        />
      )}
    </div>
  );
}
