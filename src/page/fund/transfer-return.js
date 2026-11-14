
export function renderTransferReturnPage() {
  return `
    <section class="space-y-6">

      <!-- Page Header -->
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div class="mb-2 flex items-center gap-2 text-xs text-slate-400">
            <span>Fund Management</span>
            <span>/</span>
            <span class="font-medium text-blue-600">Transfer & Return</span>
          </div>

          <h1 class="text-2xl font-bold tracking-tight text-slate-900">
            Transfer & Return
          </h1>

          <p class="mt-1 text-sm text-slate-500">
            Manage and review user fund transactions.
          </p>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">

        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-500">
                Total Transfers
              </p>
              <h2 class="mt-2 text-2xl font-bold text-slate-900">
                —
              </h2>
              <p class="mt-1 text-xs text-slate-400">
                Transaction records
              </p>
            </div>

            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.8"
                   stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 3l4 4-4 4"/>
                <path d="M3 7h18"/>
                <path d="M7 21l-4-4 4-4"/>
                <path d="M21 17H3"/>
              </svg>
            </div>
          </div>
        </article>

        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-500">
                Total Returns
              </p>
              <h2 class="mt-2 text-2xl font-bold text-slate-900">
                —
              </h2>
              <p class="mt-1 text-xs text-slate-400">
                Return records
              </p>
            </div>

            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.8"
                   stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 14 4 9l5-5"/>
                <path d="M4 9h11a5 5 0 0 1 0 10h-2"/>
              </svg>
            </div>
          </div>
        </article>

      </div>

      <!-- Transaction Management -->
      <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div class="border-b border-slate-100 p-5">
          <h2 class="text-base font-semibold text-slate-900">
            Transaction Management
          </h2>
          <p class="mt-1 text-xs text-slate-500">
            Review transfer and return transaction records.
          </p>
        </div>

        <!-- Tabs -->
        <div class="flex gap-6 border-b border-slate-100 px-5">
          <button
            type="button"
            data-fund-tab="transfer"
            aria-selected="true"
            class="border-b-2 border-blue-600 py-4 text-sm font-semibold text-blue-600"
          >
            Transfer Details
          </button>

          <button
            type="button"
            data-fund-tab="return"
            aria-selected="false"
            class="border-b-2 border-transparent py-4 text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            Return Details
          </button>
        </div>

        <!-- Toolbar -->
        <div class="flex flex-wrap items-center justify-between gap-3 p-5">

          <div class="relative w-full sm:max-w-sm">
            <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                 viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.8">
              <circle cx="11" cy="11" r="7"/>
              <path d="m16 16 4 4"/>
            </svg>

            <input
              type="search"
              id="fund-transaction-search"
              placeholder="Search user, transaction ID..."
              aria-label="Search fund transactions"
              class="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div class="flex flex-wrap items-center gap-2">

            <select
              id="fund-status-filter"
              class="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-blue-400"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <input
              type="date"
              id="fund-date-filter"
              aria-label="Filter by date"
              class="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-blue-400"
            />

          </div>
        </div>

        <!-- Transfer Table -->
        <div data-fund-panel="transfer" class="overflow-x-auto">

          <table class="w-full min-w-[1050px] text-left">
            <thead class="bg-slate-50">
              <tr class="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th class="px-5 py-4">Date & Time</th>
                <th class="px-5 py-4">Transaction ID</th>
                <th class="px-5 py-4">Sender Details</th>
                <th class="px-5 py-4">Receiver Details</th>
                <th class="px-5 py-4">Amount</th>
                <th class="px-5 py-4">Status</th>
                <th class="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colspan="7" class="px-5 py-16 text-center">
                  <div class="mx-auto flex max-w-sm flex-col items-center">
                    <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <svg class="h-6 w-6" viewBox="0 0 24 24"
                           fill="none" stroke="currentColor" stroke-width="1.7"
                           stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 3l4 4-4 4"/>
                        <path d="M3 7h18"/>
                        <path d="M7 21l-4-4 4-4"/>
                        <path d="M21 17H3"/>
                      </svg>
                    </div>

                    <h3 class="text-sm font-semibold text-slate-700">
                      No transfer records available
                    </h3>

                    <p class="mt-1 text-xs text-slate-400">
                      Transfer transactions will appear here when records are available.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

        </div>

        <!-- Return Table -->
        <div data-fund-panel="return" class="hidden overflow-x-auto">

          <table class="w-full min-w-[1050px] text-left">
            <thead class="bg-slate-50">
              <tr class="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th class="px-5 py-4">Date & Time</th>
                <th class="px-5 py-4">Transaction ID</th>
                <th class="px-5 py-4">User Details</th>
                <th class="px-5 py-4">Parent Details</th>
                <th class="px-5 py-4">Return Amount</th>
                <th class="px-5 py-4">Status</th>
                <th class="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colspan="7" class="px-5 py-16 text-center">
                  <div class="mx-auto flex max-w-sm flex-col items-center">
                    <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                      <svg class="h-6 w-6" viewBox="0 0 24 24"
                           fill="none" stroke="currentColor" stroke-width="1.7"
                           stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 14 4 9l5-5"/>
                        <path d="M4 9h11a5 5 0 0 1 0 10h-2"/>
                      </svg>
                    </div>

                    <h3 class="text-sm font-semibold text-slate-700">
                      No return records available
                    </h3>

                    <p class="mt-1 text-xs text-slate-400">
                      Return transactions will appear here when records are available.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

        </div>

        <!-- Pagination -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 p-5">
          <p class="text-xs text-slate-500">
            Showing 0–0 of 0 records
          </p>

          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-500">Rows per page</span>

            <select disabled class="h-9 rounded-lg border border-slate-200 bg-slate-50 px-2 text-sm">
              <option>25</option>
            </select>

            <button disabled aria-label="Previous page"
              class="h-9 w-9 rounded-lg border border-slate-200 text-slate-400">
              ‹
            </button>

            <button disabled aria-label="Next page"
              class="h-9 w-9 rounded-lg border border-slate-200 text-slate-400">
              ›
            </button>
          </div>
        </div>

      </section>
    </section>
  `;
}

export function initializeTransferReturnPage() {
  const tabButtons = document.querySelectorAll('[data-fund-tab]');
  const panels = document.querySelectorAll('[data-fund-panel]');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedTab = button.dataset.fundTab;

      tabButtons.forEach(tab => {
        const isActive = tab === button;

        tab.setAttribute('aria-selected', String(isActive));

        tab.classList.toggle('border-blue-600', isActive);
        tab.classList.toggle('text-blue-600', isActive);
        tab.classList.toggle('font-semibold', isActive);

        tab.classList.toggle('border-transparent', !isActive);
        tab.classList.toggle('text-slate-500', !isActive);
        tab.classList.toggle('font-medium', !isActive);
      });

      panels.forEach(panel => {
        panel.classList.toggle(
          'hidden',
          panel.dataset.fundPanel !== selectedTab
        );
      });
    });
  });
}
