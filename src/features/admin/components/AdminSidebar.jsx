import React from 'react';
import {
  LayoutDashboard,
  Users,
  ChevronDown,
  X,
  LogOut,
  UserCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { adminLogout } from '../services/adminApi';

export function AdminSidebar({
  activeTab,
  setActiveTab,
  sidebarCollapsed,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  openNavCategory,
  toggleCategory
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    toast.info("Logged out from Admin Console");
    navigate("/admin/login", { replace: true });
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      } ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
    >
      {/* AQUAPAY Brand Header */}
      <div className="h-16 px-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <img
            src="/aquapay-logo.jpeg"
            alt="AquaPay Logo"
            className="h-20 w-auto object-contain select-none"
          />
          {/* {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-sm text-slate-900 tracking-tight leading-none">
                AquaPay
              </span>
              <span className="text-[9px] font-semibold tracking-wider text-blue-600 uppercase mt-0.5">
                Admin Console
              </span>
            </div>
          )} */}
        </div>
        <button
          onClick={() => setMobileSidebarOpen(false)}
          className="md:hidden text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Tree - Pure Backend-Backed Functionality */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 text-sm custom-scrollbar">
        {/* Dashboard Overview */}
        <button
          onClick={() => {
            setActiveTab('dashboard');
            setMobileSidebarOpen(false);
          }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'dashboard'
              ? 'bg-blue-50 text-blue-600 font-semibold border-r-4 border-blue-600'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 shrink-0" />
          {!sidebarCollapsed && <span>Dashboard Overview</span>}
        </button>

        {/* Member Directory - Backed by /api/users */}
        <NavGroup
          title="User Directory"
          icon={<Users className="w-5 h-5 shrink-0" />}
          isOpen={openNavCategory['Member']}
          onToggle={() => toggleCategory('Member')}
          collapsed={sidebarCollapsed}
        >
          <NavItem
            label="All Users"
            active={activeTab === 'all-users'}
            onClick={() => { setActiveTab('all-users'); setMobileSidebarOpen(false); }}
          />
          <NavItem
            label="Retailers"
            active={activeTab === 'retailer'}
            onClick={() => { setActiveTab('retailer'); setMobileSidebarOpen(false); }}
          />
          <NavItem
            label="Distributors"
            active={activeTab === 'distributor'}
            onClick={() => { setActiveTab('distributor'); setMobileSidebarOpen(false); }}
          />
          <NavItem
            label="Master Distributors"
            active={activeTab === 'master-distributor'}
            onClick={() => { setActiveTab('master-distributor'); setMobileSidebarOpen(false); }}
          />
          <NavItem
            label="CNF / ASM"
            active={activeTab === 'cnf-asm'}
            onClick={() => { setActiveTab('cnf-asm'); setMobileSidebarOpen(false); }}
          />
          <NavItem
            label="State Head (SH)"
            active={activeTab === 'sh'}
            onClick={() => { setActiveTab('sh'); setMobileSidebarOpen(false); }}
          />
          <NavItem
            label="NSM / ZSH"
            active={activeTab === 'nsm-zsh'}
            onClick={() => { setActiveTab('nsm-zsh'); setMobileSidebarOpen(false); }}
          />
          <NavItem
            label="Sub Admins"
            active={activeTab === 'sub-admin'}
            onClick={() => { setActiveTab('sub-admin'); setMobileSidebarOpen(false); }}
          />
        </NavGroup>
      </div>

      {/* Sidebar Footer with Sign Out */}
      <div className="p-3 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between shrink-0">
        {!sidebarCollapsed && (
          <span className="flex items-center gap-1.5 font-medium text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Backend Online
          </span>
        )}
        <button
          onClick={handleLogout}
          title="Sign Out"
          className="flex items-center gap-1.5 text-slate-500 hover:text-rose-600 font-medium transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          {!sidebarCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}

function NavGroup({ title, icon, isOpen, onToggle, children, collapsed }) {
  return (
    <div className="py-0.5">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          {icon}
          {!collapsed && <span className="font-medium text-slate-700 text-xs">{title}</span>}
        </div>
        {!collapsed && (
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>

      {isOpen && !collapsed && <div className="pl-9 pr-1 py-1 space-y-1">{children}</div>}
    </div>
  );
}

function NavItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors block cursor-pointer ${
        active
          ? 'bg-blue-50 text-blue-600 font-bold'
          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
      }`}
    >
      {label}
    </button>
  );
}

export default AdminSidebar;
