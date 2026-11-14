
export function renderTransactionTable() {
  return `
    <section
      aria-labelledby="transaction-heading"
      class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
    >
      <!-- Header -->
      <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-5">
        <div>
          <h2 id="transaction-heading" class="text-base font-semibold tracking-tight text-slate-900">
            All Transaction Report
          </h2>
          <p class="mt-1 text-xs text-slate-500">
            View and manage your transaction records
          </p>
        </div>

        <span class="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
          Total Records: 0
        </span>
      </div>

      <!-- Date Filters -->
      <div class="flex flex-wrap items-end gap-3 border-b border-slate-100 p-5">
        <label class="flex flex-col gap-1.5 text-xs font-medium text-slate-600">
          From Date
          <input
            type="date"
            id="transaction-from-date"
            disabled
            class="h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none disabled:cursor-not-allowed"
          />
        </label>

        <label class="flex flex-col gap-1.5 text-xs font-medium text-slate-600">
          To Date
          <input
            type="date"
            id="transaction-to-date"
            disabled
            class="h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none disabled:cursor-not-allowed"
          />
        </label>

        <button
          type="button"
          disabled
          class="h-10 rounded-lg bg-blue-600 px-5 text-sm font-medium text-white opacity-50"
        >
          Fetch Records
        </button>
      </div>

      <!-- Toolbar -->
      <div class="flex flex-wrap items-center justify-between gap-3 p-5">
        <div class="relative w-full sm:w-72">
          <svg
            class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <circle cx="11" cy="11" r="7"/>
            <path d="m20 20-4-4"/>
          </svg>

          <input
            type="search"
            id="transaction-search"
            placeholder="Search transactions..."
            aria-label="Search transactions"
            disabled
            class="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
          />
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled
            class="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 opacity-50"
          >
            ₹ —
          </button>

          <button
            type="button"
            disabled
            class="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 opacity-50"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3v12m-5-5 5 5 5-5"/>
              <path d="M5 17v3h14v-3"/>
            </svg>
            Export
          </button>

          <button
            type="button"
            disabled
            class="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 opacity-50"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 7v5h-5"/>
              <path d="M4 17v-5h5"/>
              <path d="M5.6 9a7 7 0 0 1 11.8-2L20 12M4 12l2.6 5a7 7 0 0 0 11.8-2"/>
            </svg>
            Refresh
          </button>

          <button
            type="button"
            disabled
            class="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 opacity-50"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 7h16M7 12h10m-7 5h4"/>
            </svg>
            Filters
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto border-y border-slate-100">
        <table class="w-full min-w-[950px] text-left">
          <thead class="bg-slate-50">
            <tr class="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <th scope="col" class="px-5 py-4">Date</th>
              <th scope="col" class="px-5 py-4">User Details</th>
              <th scope="col" class="px-5 py-4">Transaction Details</th>
              <th scope="col" class="px-5 py-4">Reference Details</th>
              <th scope="col" class="px-5 py-4">Amount</th>
              <th scope="col" class="px-5 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colspan="6" class="px-5 py-16 text-center">
                <div class="mx-auto flex max-w-xs flex-col items-center">
                  <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="16" rx="2"/>
                      <path d="M8 9h8M8 13h5"/>
                    </svg>
                  </div>
                  <p class="text-sm font-semibold text-slate-700">
                    No transactions found
                  </p>
                  <p class="mt-1 text-xs text-slate-400">
                    Transaction records will appear here when data is available.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex flex-wrap items-center justify-between gap-3 p-5">
        <p class="text-xs text-slate-500">
          Showing 0–0 of 0 records
        </p>

        <div class="flex items-center gap-3">
          <label class="flex items-center gap-2 text-xs text-slate-500">
            Rows per page
            <select disabled class="h-9 rounded-lg border border-slate-200 bg-slate-50 px-2 text-sm text-slate-600">
              <option>50</option>
            </select>
          </label>

          <button
            type="button"
            disabled
            aria-label="Previous page"
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 opacity-50"
          >
            ‹
          </button>

          <button
            type="button"
            disabled
            aria-label="Next page"
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 opacity-50"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  `;
}
