
export function renderNavbar() {
  return `
    <header
      class="h-[76px] bg-white/95 backdrop-blur-xl
             border-b border-slate-200/80
             flex items-center justify-between
             px-5 lg:px-8 sticky top-0 z-30"
    >

      <!-- Left Section -->
      <div class="flex items-center gap-5">

        <button
          id="sidebar-toggle"
          type="button"
          aria-label="Toggle sidebar"
          aria-controls="dashboard-sidebar"
          aria-expanded="true"
          class="w-10 h-10 flex items-center justify-center
                 rounded-xl text-slate-600
                 hover:bg-slate-100 hover:text-blue-600
                 transition-all"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24"
               fill="none" stroke="currentColor"
               stroke-width="1.8" stroke-linecap="round">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        <!-- Search -->
        <div class="relative hidden sm:block">

          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2
                   w-4 h-4 text-slate-400"
            viewBox="0 0 24 24"
            fill="none" stroke="currentColor"
            stroke-width="1.8"
          >
            <circle cx="11" cy="11" r="7"/>
            <path d="m16 16 4 4"/>
          </svg>

          <input
            type="search"
            id="dashboard-search"
            placeholder="Search anything..."
            aria-label="Search dashboard"
            class="w-64 lg:w-80 h-11
                   pl-11 pr-16 rounded-xl
                   bg-slate-50 border border-slate-200
                   text-sm text-slate-700
                   placeholder:text-slate-400
                   outline-none
                   focus:bg-white focus:border-blue-400
                   focus:ring-4 focus:ring-blue-50
                   transition-all"
          />

          <span
            class="absolute right-3 top-1/2
                   -translate-y-1/2
                   text-[10px] font-semibold
                   text-slate-400 bg-white
                   border border-slate-200
                   rounded-md px-2 py-1"
          >
            Ctrl K
          </span>

        </div>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-3 lg:gap-5">

        <!-- Wallet Balance -->
        <button
          type="button"
          id="wallet-balance"
          class="h-10 flex items-center gap-2
                 px-4 rounded-xl
                 bg-blue-50 border border-blue-100
                 text-blue-700 hover:bg-blue-100
                 transition-all"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24"
               fill="none" stroke="currentColor"
               stroke-width="1.8">
            <rect x="3" y="5" width="18" height="15" rx="3"/>
            <path d="M3 9h18M16 15h2"/>
          </svg>

          <span class="text-xs font-medium">Wallet</span>
          <span class="font-bold text-sm">₹ —</span>
        </button>

        <!-- Notifications -->
        <button
          type="button"
          id="notification-button"
          aria-label="Notifications"
          class="relative w-10 h-10
                 flex items-center justify-center
                 rounded-xl text-slate-500
                 hover:bg-slate-100 hover:text-blue-600
                 transition-all"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24"
               fill="none" stroke="currentColor"
               stroke-width="1.7" stroke-linecap="round"
               stroke-linejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>
            <path d="M10 21h4"/>
          </svg>

          <span
            class="absolute top-1 right-1
                   w-2.5 h-2.5 rounded-full
                   bg-red-500 border-2 border-white"
          ></span>
        </button>

        <!-- Profile -->
        <button
          type="button"
          id="profile-button"
          aria-label="User profile"
          class="flex items-center gap-2
                 pl-1 pr-2 py-1 rounded-xl
                 hover:bg-slate-50 transition-all"
        >
          <span
            class="w-9 h-9 rounded-xl
                   bg-gradient-to-br from-blue-600 to-indigo-600
                   text-white flex items-center justify-center
                   font-semibold text-sm shadow-sm"
          >
            A
          </span>

          <span class="hidden md:block text-left">
            <span class="block text-xs font-semibold text-slate-800">
              Admin
            </span>
            <span class="block text-[10px] text-slate-400">
              Administrator
            </span>
          </span>

          <svg class="hidden md:block w-4 h-4 text-slate-400"
               viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2">
            <path d="m7 10 5 5 5-5"/>
          </svg>
        </button>

      </div>
    </header>
  `;
}
