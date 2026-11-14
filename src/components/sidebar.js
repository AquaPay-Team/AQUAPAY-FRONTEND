const icons = {
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="5" rx="2"/><rect x="13" y="10" width="8" height="11" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/></svg>`,

  fund: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M15 8.5c-.7-.7-1.7-1-3-1-1.6 0-2.5.8-2.5 1.8 0 2.7 5.5 1.2 5.5 4.2 0 1.2-1.1 2-3 2-1.3 0-2.4-.4-3.2-1.2M12 5.5v13"/></svg>`,

  services: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/><circle cx="12" cy="12" r="8.5"/></svg>`,

  report: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 3h14v18H5zM8 8h8M8 12h8M8 16h5"/></svg>`,

  statement: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 10h18M5 10V20M9 10V20M15 10V20M19 10V20M3 20h18M12 3 2 8h20z"/></svg>`,

  "arrow-left-right": `
  <svg viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="1.8"
       stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 3l4 4-4 4"/>
    <path d="M3 7h18"/>
    <path d="M7 21l-4-4 4-4"/>
    <path d="M21 17H3"/>
  </svg>
`,

  "file-chart": `
  <svg viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="1.8"
       stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <path d="M14 2v6h6"/>
    <path d="M8 17v-3"/>
    <path d="M12 17v-5"/>
    <path d="M16 17v-2"/>
  </svg>
`,

  "add-money": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M7 12h10"/></svg>`,

  "credit-card": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></svg>`,

  payout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12h15M13 5l7 7-7 7"/></svg>`,

  upi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>`,

  "transaction-list": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>`,

  "payment-report": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>`,

  "main-ledger": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h16v15H4zM8 9h8M8 13h8M8 17h5"/></svg>`,

  "settlement-ledger": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M7 12h10M13 8l4 4-4 4"/></svg>`,

  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m7 10 5 5 5-5"/></svg>`,
};

const navigationGroups = [
  {
    id: "fund",
    title: "Fund",
    icon: "fund",
   items: [
  {
    title: "Transfer/Return",
    icon: "arrow-left-right",
    slug: "transfer-return"
  },
  {
    title: "Transfer Report",
    icon: "file-chart",
    slug: "transfer-report"
  },
  {
    title: "Return Report",
    icon: "file-chart",
    slug: "return-report"
  },
  {
    title: "Transfer Return Report",
    icon: "file-chart",
    slug: "transfer-return-report"
  }
],
  },
  {
    id: "services",
    title: "Services",
    icon: "services",
    items: [
      { title: "Add Money", icon: "add-money" },
      { title: "Credit Card Bill 2", icon: "credit-card" },
      { title: "Payout", icon: "payout" },
      { title: "Rupay UPI", icon: "upi" },
    ],
  },
  {
    id: "transaction-report",
    title: "Transaction Report",
    icon: "report",
    items: [
      { title: "All Transaction Report", icon: "transaction-list" },
      { title: "Payout Report", icon: "payment-report" },
      { title: "Creditcard Offline Report", icon: "credit-card" },
      { title: "Creditcard Payment Report", icon: "credit-card" },
      { title: "Payment Gateway Report", icon: "payment-report" },
      { title: "POS Report", icon: "transaction-list" },
      { title: "POS Request Report", icon: "payment-report" },
      { title: "Rupay UPI Report", icon: "upi" },
    ],
  },
  {
    id: "account-statement",
    title: "Account Statement",
    icon: "statement",
    items: [
      { title: "Main Ledger", icon: "main-ledger" },
      { title: "Settlement Ledger", icon: "settlement-ledger" },
    ],
  },
];

export function renderSidebar() {
  return `
    <aside
      id="dashboard-sidebar"
     class="sticky top-0 z-40
       w-64 shrink-0 bg-white
       border-r border-slate-200
       h-screen overflow-y-auto
       transition-all duration-300 ease-in-out"
    >

      <!-- Brand -->
      <div
        class="h-20 flex items-center justify-center
               border-b border-slate-100 px-5
               sticky top-0 bg-white z-10"
      >
        <div class="h-20 flex items-center justify-center px-6 border-b border-slate-100">

      <img
       src="/asset/logos/aquapay-logo.png"
       alt="Aquapay"
       class="w-36 h-12 object-contain"
      />

</div>
      </div>

      <!-- Navigation -->
      <nav
        class="px-3 py-5 space-y-2"
        aria-label="Main navigation"
      >

        <!-- Dashboard -->
        <a
          href="#/dashboard"
          aria-current="page"
          class="group relative flex items-center gap-3
                 px-4 py-3 rounded-xl
                 bg-blue-50 text-blue-700
                 font-semibold text-sm"
        >
          <span
            class="absolute left-0 top-2 bottom-2
                   w-1 rounded-r-full bg-blue-600"
          ></span>

          <span class="w-5 h-5 shrink-0">
            ${icons.dashboard}
          </span>

          <span>Dashboard</span>
        </a>

        <!-- Navigation Groups -->
        <div class="pt-3 space-y-2">

          ${navigationGroups
            .map(
              (group) => `
            <section>

              <button
                type="button"
                data-menu-toggle="${group.id}"
                aria-expanded="false"
                aria-controls="submenu-${group.id}"
                class="w-full flex items-center
                       justify-between gap-3
                       px-4 py-3 rounded-xl
                       text-slate-600
                       hover:bg-slate-50
                       hover:text-blue-700
                       transition-colors duration-200
                       text-sm font-medium"
              >

                <span class="flex items-center gap-3 min-w-0">

                  <span class="w-5 h-5 shrink-0">
                    ${icons[group.icon]}
                  </span>

                  <span class="truncate">
                    ${group.title}
                  </span>

                </span>

                <span
                  data-chevron="${group.id}"
                  class="w-4 h-4 shrink-0
                         transition-transform duration-200"
                >
                  ${icons.chevron}
                </span>

              </button>

              <div
                id="submenu-${group.id}"
                class="hidden mt-1 ml-6 pl-4
                       border-l border-slate-200
                       space-y-1"
              >
${group.items
                  .map(
                    (item) => `
  <a
    href="#/${group.id}/${item.slug || ''}"
    class="group flex items-center gap-3
           px-3 py-2.5 rounded-lg
           text-sm text-slate-500
           hover:bg-blue-50
           hover:text-blue-700
           transition-colors duration-200"
  >

<span class="w-5 h-5 shrink-0
             text-slate-400
             group-hover:text-blue-600
             transition-colors duration-200">
  ${item.icon ? icons[item.icon] || "" : ""}
</span>

    <span class="leading-5">
      ${item.title}
    </span>

  </a>
`,
                  )
                  .join("")}


              </div>

            </section>
          `,
            )
      .join("")}

        </div>

      </nav>

      <!-- Sidebar Footer -->
      <div class="px-5 py-4 mt-5 border-t border-slate-100">
        <p class="text-xs text-slate-400">
          Aquapay Admin Portal
        </p>
        <p class="text-xs text-slate-400 mt-1">
          Smart Payments. Seamless Future.
        </p>
      </div>

    </aside>
  `;
}
