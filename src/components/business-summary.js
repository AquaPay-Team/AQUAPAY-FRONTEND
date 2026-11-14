const businessMetrics = [
  {
    id: 'today',
    title: 'Today Business',
    description: "Today's Collection",
    amount: '₹ —',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h6M7 17h3"/></svg>`,
    iconStyle: 'bg-emerald-50 text-emerald-600',
    amountStyle: 'text-emerald-600'
  },
  {
    id: 'this-month',
    title: 'This Month',
    description: 'Current Month Business',
    amount: '₹ —',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h3M8 17h6"/></svg>`,
    iconStyle: 'bg-blue-50 text-blue-600',
    amountStyle: 'text-blue-600'
  },
  {
    id: 'last-month',
    title: 'Last Month',
    description: 'Previous Month Business',
    amount: '₹ —',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 6-7"/><path d="M16 6h4v4"/></svg>`,
    iconStyle: 'bg-amber-50 text-amber-600',
    amountStyle: 'text-amber-600'
  },
  {
    id: 'this-year',
    title: 'This Year',
    description: 'Yearly Business Growth',
    amount: '₹ —',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17 9 11l4 4 8-9"/><path d="M15 6h6v6"/></svg>`,
    iconStyle: 'bg-violet-50 text-violet-600',
    amountStyle: 'text-violet-600'
  }
];

export function renderBusinessSummary() {
  return `
    <section
      aria-labelledby="business-summary-heading"
      class="h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
    >
      <div class="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2
            id="business-summary-heading"
            class="text-base font-semibold tracking-tight text-slate-900"
          >
            Business Summary
          </h2>
          <p class="mt-1 text-xs text-slate-500">
            Overview of your business performance
          </p>
        </div>

        <span class="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-500">
          Overview
        </span>
      </div>

      <div class="divide-y divide-slate-100">
        ${businessMetrics.map(metric => `
          <article
            data-metric="${metric.id}"
            class="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
          >
            <div class="flex min-w-0 items-center gap-3">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${metric.iconStyle}"
                aria-hidden="true"
              >
                <span class="h-5 w-5">${metric.icon}</span>
              </div>

              <div class="min-w-0">
                <h3 class="text-sm font-semibold text-slate-800">
                  ${metric.title}
                </h3>
                <p class="mt-1 text-xs text-slate-500">
                  ${metric.description}
                </p>
              </div>
            </div>

            <strong class="shrink-0 text-sm font-semibold tabular-nums ${metric.amountStyle}">
              ${metric.amount}
            </strong>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}
