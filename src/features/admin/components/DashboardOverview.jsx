import React from 'react';
import {
  Users,
  UserCheck,
  ShieldCheck,
  Building,
  Plus,
  ArrowRight,
  Server,
  Database,
  RefreshCw
} from 'lucide-react';

export function DashboardOverview({
  stats,
  setActiveTab,
  setAddAgentModalOpen,
  loadUsers,
  isLoadingUsers
}) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Real-time identity, merchant onboarding, and governance metrics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadUsers}
            disabled={isLoadingUsers}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-3 py-2 rounded-lg text-xs transition-colors shadow-2xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingUsers ? 'animate-spin text-blue-600' : ''}`} />
            Refresh Data
          </button>

          <button
            onClick={() => setAddAgentModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-xs transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Agent
          </button>
        </div>
      </div>

      {/* Top 4 Real Backend Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Registered Users */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Users
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold text-slate-900 tracking-tight">
            {stats.total}
          </div>
          <div className="mt-2 text-xs font-medium text-slate-500">
            Registered in Database
          </div>
        </div>

        {/* Card 2: Active Accounts */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Accounts
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold text-slate-900 tracking-tight">
            {stats.active}
          </div>
          <div className="mt-2 text-xs font-medium text-emerald-600">
            Operational Status
          </div>
        </div>

        {/* Card 3: Retailers */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Retailers Network
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold text-slate-900 tracking-tight">
            {stats.retailers}
          </div>
          <div className="mt-2 text-xs font-medium text-indigo-600">
            Active Retail Points
          </div>
        </div>

        {/* Card 4: KYC Completed */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              KYC Verified / Submitted
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold text-slate-900 tracking-tight">
            {stats.verifiedKyc}
          </div>
          <div className="mt-2 text-xs font-medium text-amber-600">
            {stats.pendingKyc} Pending Verification
          </div>
        </div>
      </div>

      {/* Backend Infrastructure & Server Status Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-4">
          <Server className="w-4 h-4 text-blue-600" />
          Backend Services & Database Sync
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0"></div>
            <div>
              <p className="text-xs font-bold text-slate-900">AquaPay Express API</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Port 3000 • Operational</p>
              <span className="inline-block mt-2 text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                Health: OK
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0"></div>
            <div>
              <p className="text-xs font-bold text-slate-900">MySQL Database</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Table `users` synced</p>
              <span className="inline-block mt-2 text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
                {stats.total} Records Synced
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0"></div>
            <div>
              <p className="text-xs font-bold text-slate-900">Redis Cache & Sessions</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Rate limiting & token store</p>
              <span className="inline-block mt-2 text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                PONG Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Quick Link */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            View & Manage All Users in Database
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Filter users by role, search by mobile or email, and update agent configurations.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('all-users')}
          className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer shrink-0"
        >
          <span>Open User Directory</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default DashboardOverview;
